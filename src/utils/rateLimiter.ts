import { adminStore } from '../data/adminStore';

const STORAGE_KEYS = {
  SUBMISSIONS: 'indy_client_submissions_v1',
  BANNED_CLIENTS: 'indy_banned_ips_v1',
  DEVICE_FP: 'indy_client_device_fp_v1',
};

export interface SubmissionRecord {
  id: string;
  ip: string;
  deviceFp: string;
  formType: string;
  timestamp: number;
}

export interface BannedClientRecord {
  ip: string;
  deviceFp: string;
  bannedAt: number;
  bannedUntil: number;
  reason: string;
  attemptCount: number;
}

// 24 Hours in milliseconds
export const BAN_DURATION_MS = 24 * 60 * 60 * 1000;
// Max allowed submissions within 24 hours
export const MAX_DAILY_SUBMISSIONS = 2;

// Generate or retrieve persistent browser device fingerprint
export function getDeviceFingerprint(): string {
  try {
    let fp = localStorage.getItem(STORAGE_KEYS.DEVICE_FP);
    if (!fp) {
      fp = 'client-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEYS.DEVICE_FP, fp);
    }
    return fp;
  } catch {
    return 'fallback-client-' + Date.now();
  }
}

// Cached IP memory
let cachedClientIp: string | null = null;

// Fetch Client IP with fast timeout and fallback
export async function getClientIp(): Promise<string> {
  if (cachedClientIp) return cachedClientIp;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.ip) {
        cachedClientIp = data.ip;
        return data.ip;
      }
    }
  } catch {
    // Offline or network restriction
  }

  // Fallback to local subnet / device fingerprint identifier
  const fp = getDeviceFingerprint();
  cachedClientIp = `local-${fp.slice(-8)}`;
  return cachedClientIp;
}

// Get all stored submissions
function getStoredSubmissions(): SubmissionRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [];
}

// Save stored submissions
function saveStoredSubmissions(records: SubmissionRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(records));
  } catch (e) {
    console.error(e);
  }
}

// Get all active banned client records
export function getBannedClients(): BannedClientRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BANNED_CLIENTS);
    if (data) {
      const records: BannedClientRecord[] = JSON.parse(data);
      const now = Date.now();
      // Filter out bans that naturally expired
      const active = records.filter((r) => r.bannedUntil > now);
      if (active.length !== records.length) {
        localStorage.setItem(STORAGE_KEYS.BANNED_CLIENTS, JSON.stringify(active));
      }
      return active;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

// Save banned records
function saveBannedClients(records: BannedClientRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.BANNED_CLIENTS, JSON.stringify(records));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('indy_admin_data_changed'));
    }
  } catch (e) {
    console.error(e);
  }
}

// Ban a client IP/device for 24 hours
export function banClient(ip: string, deviceFp: string, reason: string, attempts: number): BannedClientRecord {
  const bans = getBannedClients();
  const existingIdx = bans.findIndex((b) => b.ip === ip || b.deviceFp === deviceFp);
  const now = Date.now();

  const record: BannedClientRecord = {
    ip,
    deviceFp,
    bannedAt: now,
    bannedUntil: now + BAN_DURATION_MS,
    reason,
    attemptCount: attempts,
  };

  if (existingIdx !== -1) {
    bans[existingIdx] = record;
  } else {
    bans.unshift(record);
  }

  saveBannedClients(bans);

  // Add event to Super Admin Security Audit Vault
  adminStore.addAuditLog({
    action: 'Client IP Banned (24 Hours)',
    user: 'Security Firewall',
    category: 'system',
    details: `IP ${ip} banned for 24 hours: Exceeded daily limit (${attempts} form attempts).`,
  });

  return record;
}

// Check eligibility before rendering form or submitting
export async function checkSubmissionEligibility(formType: string = 'inquiry'): Promise<{
  allowed: boolean;
  remaining: number;
  isBanned: boolean;
  bannedUntil?: number;
  hoursRemaining?: number;
  minutesRemaining?: number;
  ip: string;
}> {
  const ip = await getClientIp();
  const deviceFp = getDeviceFingerprint();
  const now = Date.now();

  // 1. Check if currently banned
  const bans = getBannedClients();
  const activeBan = bans.find((b) => (b.ip === ip || b.deviceFp === deviceFp) && b.bannedUntil > now);

  if (activeBan) {
    const diffMs = activeBan.bannedUntil - now;
    const hoursRemaining = Math.max(1, Math.ceil(diffMs / (60 * 60 * 1000)));
    const minutesRemaining = Math.max(1, Math.ceil(diffMs / (60 * 1000)));
    return {
      allowed: false,
      remaining: 0,
      isBanned: true,
      bannedUntil: activeBan.bannedUntil,
      hoursRemaining,
      minutesRemaining,
      ip,
    };
  }

  // 2. Count submissions in the last 24 hours
  const windowStart = now - BAN_DURATION_MS;
  const submissions = getStoredSubmissions().filter(
    (s) => (s.ip === ip || s.deviceFp === deviceFp) && s.timestamp > windowStart
  );

  if (submissions.length >= MAX_DAILY_SUBMISSIONS) {
    // Exceeded 2 per 24h -> Immediately trigger 24-hour ban!
    const ban = banClient(
      ip,
      deviceFp,
      `Exceeded max ${MAX_DAILY_SUBMISSIONS} form submissions within 24 hours.`,
      submissions.length + 1
    );
    const diffMs = ban.bannedUntil - now;
    return {
      allowed: false,
      remaining: 0,
      isBanned: true,
      bannedUntil: ban.bannedUntil,
      hoursRemaining: Math.ceil(diffMs / (60 * 60 * 1000)),
      minutesRemaining: Math.ceil(diffMs / (60 * 1000)),
      ip,
    };
  }

  return {
    allowed: true,
    remaining: MAX_DAILY_SUBMISSIONS - submissions.length,
    isBanned: false,
    ip,
  };
}

// Record a new form submission and enforce ban if limit exceeded
export async function recordFormSubmission(formType: string): Promise<{
  success: boolean;
  banned: boolean;
  remaining: number;
  errorMessage?: string;
  hoursRemaining?: number;
}> {
  const eligibility = await checkSubmissionEligibility(formType);

  if (!eligibility.allowed || eligibility.isBanned) {
    return {
      success: false,
      banned: true,
      remaining: 0,
      hoursRemaining: eligibility.hoursRemaining || 24,
      errorMessage: `ਤੁਸੀਂ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਵੱਧ ਤੋਂ ਵੱਧ ${MAX_DAILY_SUBMISSIONS} ਵਾਰ ਫਾਰਮ ਭਰ ਸਕਦੇ ਹੋ। ਸੁਰੱਖਿਆ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਇਹ IP ਅਗਲੇ ${eligibility.hoursRemaining || 24} ਘੰਟਿਆਂ ਲਈ ਬੈਨ (ਰੋਕ) ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ। ਤੁਰੰਤ ਸਹਾਇਤਾ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਸਿੱਧਾ (317) 408-9532 'ਤੇ ਕਾਲ ਕਰੋ। (Submission limit of ${MAX_DAILY_SUBMISSIONS} forms per 24 hours exceeded. This IP has been restricted for 24 hours.)`,
    };
  }

  const ip = await getClientIp();
  const deviceFp = getDeviceFingerprint();
  const allSubmissions = getStoredSubmissions();

  const newRecord: SubmissionRecord = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ip,
    deviceFp,
    formType,
    timestamp: Date.now(),
  };

  allSubmissions.push(newRecord);
  saveStoredSubmissions(allSubmissions);

  const remaining = eligibility.remaining - 1;

  return {
    success: true,
    banned: false,
    remaining,
  };
}

// Super Admin Action: Unban an IP address
export function unbanClient(targetIpOrFp: string): void {
  const bans = getBannedClients();
  const filtered = bans.filter((b) => b.ip !== targetIpOrFp && b.deviceFp !== targetIpOrFp);
  saveBannedClients(filtered);

  // Clear submission timestamps for this IP so they can submit immediately
  const subs = getStoredSubmissions().filter((s) => s.ip !== targetIpOrFp && s.deviceFp !== targetIpOrFp);
  saveStoredSubmissions(subs);

  adminStore.addAuditLog({
    action: 'IP Ban Manually Lifted',
    user: 'Super Admin',
    category: 'system',
    details: `Super Admin manually unbanned IP ${targetIpOrFp}.`,
  });
}

// Super Admin Action: Clear all banned clients
export function clearAllBans(): void {
  localStorage.removeItem(STORAGE_KEYS.BANNED_CLIENTS);
  localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('indy_admin_data_changed'));
  }

  adminStore.addAuditLog({
    action: 'All IP Bans Cleared',
    user: 'Super Admin',
    category: 'system',
    details: 'Super Admin purged all active IP ban and submission rate limit records.',
  });
}

