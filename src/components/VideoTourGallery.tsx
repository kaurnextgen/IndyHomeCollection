import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Calendar,
  Phone,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imagesMap';
import { useLanguage } from '../context/LanguageContext';

export interface VideoTour {
  id: string;
  title: string;
  city: string;
  county: string;
  category: 'luxury' | 'single-family' | 'small' | 'new-build';
  categoryLabel: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  durationSeconds: number;
  durationLabel: string;
  resolution: string;
  posterImage: string;
  videoUrl: string;
  summary: string;
  chapters: { time: number; label: string; description: string }[];
}

interface VideoTourGalleryProps {
  onScheduleTour: (propertyTitle: string) => void;
  onCallClick: () => void;
}

export const VideoTourGallery: React.FC<VideoTourGalleryProps> = ({
  onScheduleTour,
  onCallClick,
}) => {
  const { t } = useLanguage();
  const videoTours: VideoTour[] = [
    {
      id: 'tour-zionsville-estate',
      title: 'The Stonegate Woods Architectural Estate',
      city: 'Zionsville',
      county: 'Boone County',
      category: 'luxury',
      categoryLabel: 'Luxury Big Homes & Estates',
      price: '$1,875,000',
      beds: 6,
      baths: 7.5,
      sqft: 7850,
      durationSeconds: 225, // 3:45
      durationLabel: '3:45',
      resolution: '4K Ultra HD',
      posterImage: ASSET_IMAGES.luxuryEstateLarge,
      videoUrl: 'https://assets.mixkit.co/videos/47286/47286-720.mp4',
      summary:
        'Full cinematic drone aerial and interior walkthrough of an expansive 6-bedroom European stone manor on 2.4 wooded acres in Zionsville, featuring circular cobblestone motor court, soaring timber trusses, and a resort veranda.',
      chapters: [
        { time: 0, label: '0:00 Aerial Drone & Forest Grounds', description: 'Surrounding old-growth hardwoods and grand circular approach' },
        { time: 35, label: '0:35 Soaring Timber Great Hall', description: 'Double-height cathedral ceiling and carved limestone hearth' },
        { time: 85, label: '1:25 Culinary Scullery & Island', description: 'Custom inset cabinetry, dual Wolf ranges, and quartz prep area' },
        { time: 140, label: '2:20 Primary Sanctuary & Spa Bath', description: 'Dual marble vanities, freestanding soaking tub, and boutique dressing room' },
        { time: 195, label: '3:15 Covered Veranda & Stone Fireplace', description: 'Screened outdoor living area overlooking private nature reserve' },
      ],
    },
    {
      id: 'tour-carmel-craftsman',
      title: 'The Monon District Luxury Craftsman',
      city: 'Carmel',
      county: 'Hamilton County',
      category: 'luxury',
      categoryLabel: 'Luxury Big Homes & Estates',
      price: '$895,000',
      beds: 5,
      baths: 5,
      sqft: 5100,
      durationSeconds: 180, // 3:00
      durationLabel: '3:00',
      resolution: '4K Ultra HD',
      posterImage: ASSET_IMAGES.suburbanCarmel,
      videoUrl: 'https://assets.mixkit.co/videos/36087/36087-720.mp4',
      summary:
        'Walkable to the Carmel Arts & Design District, this bespoke transitional residence highlights warm cedar accents, finished entertaining basement, and custom chef kitchen.',
      chapters: [
        { time: 0, label: '0:00 Streetscape & Monon Trail Proximity', description: 'Walkable neighborhood rhythm and artisan stonework' },
        { time: 40, label: '0:40 Open-Concept Great Room', description: 'Wide-plank white oak flooring and expansive picture windows' },
        { time: 80, label: '1:20 Designer Kitchen & Beverage Bar', description: 'Sub-Zero refrigeration and walk-in pantry storage' },
        { time: 130, label: '2:10 Main-Floor Executive Study & Suite', description: 'Ideal for remote executive work and guest privacy' },
        { time: 160, label: '2:40 Private Courtyard Patio', description: 'Low-maintenance outdoor dining with built-in gas grill' },
      ],
    },
    {
      id: 'tour-fishers-brick',
      title: 'The Geist Reserve Stately Brick Colonial',
      city: 'Fishers',
      county: 'Hamilton County',
      category: 'single-family',
      categoryLabel: 'Executive Single-Family Homes',
      price: '$685,000',
      beds: 5,
      baths: 4.5,
      sqft: 4320,
      durationSeconds: 210, // 3:30
      durationLabel: '3:30',
      resolution: '1080p 60fps',
      posterImage: ASSET_IMAGES.largeFamilyBrick,
      videoUrl: 'https://assets.mixkit.co/videos/29526/29526-720.mp4',
      summary:
        'Complete family walkthrough of a four-sided brick residence near Geist Reservoir with 3-car side garage, daylight basement theater, and spacious tree-lined backyard.',
      chapters: [
        { time: 0, label: '0:00 Brick Façade & 3-Car Garage', description: 'Mature shade trees and expansive front lawn' },
        { time: 45, label: '0:45 Sweeping Foyer & Formal Dining', description: 'Arched entryways and heavy crown molding' },
        { time: 90, label: '1:30 Family Kitchen & Hearth Sunroom', description: 'Center breakfast bar and sunlit morning room' },
        { time: 145, label: '2:25 Finished Basement & Media Room', description: 'Custom entertainment center and wet bar' },
        { time: 185, label: '3:05 Expansive Deck & Yard', description: 'Spacious recreation space for children and pets' },
      ],
    },
    {
      id: 'tour-westfield-farmhouse',
      title: 'The Grand Junction Modern Farmhouse',
      city: 'Westfield',
      county: 'Hamilton County',
      category: 'new-build',
      categoryLabel: 'New Construction Modern Builds',
      price: '$645,000',
      beds: 4,
      baths: 3.5,
      sqft: 3450,
      durationSeconds: 195, // 3:15
      durationLabel: '3:15',
      resolution: '4K Ultra HD',
      posterImage: ASSET_IMAGES.modernNewConstruction,
      videoUrl: 'https://assets.mixkit.co/videos/25991/25991-720.mp4',
      summary:
        'Tour a brand-new 2026 build in Westfield showcasing crisp board-and-batten siding, black architectural windows, 10-foot ceilings, and high-performance energy features.',
      chapters: [
        { time: 0, label: '0:00 Modern Board-and-Batten Façade', description: 'Contemporary farmhouse aesthetic and covered front porch' },
        { time: 35, label: '0:35 10-Foot Ceiling Great Room', description: 'Modern linear fireplace and custom built-in floating shelving' },
        { time: 75, label: '1:15 Quartz Waterfall Island', description: 'Commercial range, brass hardware, and scullery pantry' },
        { time: 130, label: '2:10 Upper Retreat & Bedrooms', description: 'Dedicated playroom and ensuite luxury baths' },
        { time: 170, label: '2:50 Covered Patio & Yard', description: 'Seamless indoor-outdoor entertainment layout' },
      ],
    },
    {
      id: 'tour-avon-bungalow',
      title: 'The Prairie View Garden Craftsman',
      city: 'Avon',
      county: 'Hendricks County',
      category: 'small',
      categoryLabel: 'Charming Small Homes & Cottages',
      price: '$289,500',
      beds: 3,
      baths: 2,
      sqft: 1680,
      durationSeconds: 145, // 2:25
      durationLabel: '2:25',
      resolution: '1080p 60fps',
      posterImage: ASSET_IMAGES.cozySmallHome,
      videoUrl: 'https://assets.mixkit.co/videos/5717/5717-720.mp4',
      summary:
        'Charming, low-maintenance single-story home tour with rocking-chair front porch, updated butcher-block kitchen, and landscaped perennial flowerbeds in Hendricks County.',
      chapters: [
        { time: 0, label: '0:00 Rocking-Chair Front Porch', description: 'Charming cottage curb appeal and flowerbeds' },
        { time: 30, label: '0:30 Sunlit Open Living Room', description: 'Oak hardwood floors and cozy craftsman accents' },
        { time: 65, label: '1:05 Modern Kitchen & Dining Nook', description: 'Updated appliances and sunny breakfast area' },
        { time: 105, label: '1:45 Primary Bedroom & Bath', description: 'Spacious closet and renovated walk-in shower' },
        { time: 130, label: '2:10 Fenced Backyard & Firepit', description: 'Private patio and tranquil garden setting' },
      ],
    },
    {
      id: 'tour-carmel-interior-estate',
      title: 'The Hazel Dell Contemporary Living Showcase',
      city: 'Carmel',
      county: 'Hamilton County',
      category: 'single-family',
      categoryLabel: 'Executive Single-Family Homes',
      price: '$725,000',
      beds: 4,
      baths: 4,
      sqft: 3950,
      durationSeconds: 170, // 2:50
      durationLabel: '2:50',
      resolution: '4K Ultra HD',
      posterImage: ASSET_IMAGES.modernInterior,
      videoUrl: 'https://assets.mixkit.co/videos/36087/36087-720.mp4',
      summary:
        'Interior architectural tour showcasing open-concept living, floor-to-ceiling windows, natural linen aesthetics, and designer kitchen near top Carmel schools.',
      chapters: [
        { time: 0, label: '0:00 Architectural Living Room', description: 'Floor-to-ceiling natural illumination and clean stone hearth' },
        { time: 45, label: '0:45 Designer Kitchen & Breakfast Bar', description: 'Handcrafted cabinetry and integrated wine fridge' },
        { time: 90, label: '1:30 Upper Bedroom Wing', description: 'Generous room proportions and hardwood upstairs hallway' },
        { time: 140, label: '2:20 Screened Back Porch', description: 'Tranquil views of neighborhood conservation preserve' },
      ],
    },
    {
      id: 'tour-brownsburg-estate',
      title: 'The Thornburg Manor & Woodland Grounds',
      city: 'Brownsburg',
      county: 'Hendricks County',
      category: 'single-family',
      categoryLabel: 'Executive Brick Residences',
      price: '$765,000',
      beds: 5,
      baths: 4.5,
      sqft: 4850,
      durationSeconds: 200, // 3:20
      durationLabel: '3:20',
      resolution: '4K Ultra HD',
      posterImage: ASSET_IMAGES.brownsburgHome,
      videoUrl: 'https://assets.mixkit.co/videos/12878/12878-720.mp4',
      summary:
        'Stately Hendricks County custom brick residence featuring two-story limestone entry, soaring vaulted hearth room, luxury kitchen, and mature woodland perimeter.',
      chapters: [
        { time: 0, label: '0:00 Limestone Arched Portico & Frontage', description: 'Curved driveway and blooming dogwood landscaping' },
        { time: 50, label: '0:50 Soaring Two-Story Brick Hearth Room', description: 'Cathedral timber ceiling and gas limestone fireplace' },
        { time: 90, label: '1:30 Chef’s Island Kitchen & Butler Pantry', description: 'Granite countertops, double ovens, and morning room' },
        { time: 135, label: '2:15 Main Floor Owner’s Retreat', description: 'Dual walk-in closets and frameless glass spa shower' },
        { time: 175, label: '2:55 Private Wooded Backyard & Fire Pit', description: 'Quiet wooded boundary in top Brownsburg school district' },
      ],
    },
    {
      id: 'tour-greenwood-waterfront',
      title: 'The Center Grove Lakeside Modern Villa',
      city: 'Greenwood',
      county: 'Johnson County',
      category: 'luxury',
      categoryLabel: 'Luxury Waterfront Villas',
      price: '$1,295,000',
      beds: 5,
      baths: 5.5,
      sqft: 5600,
      durationSeconds: 245, // 4:05
      durationLabel: '4:05',
      resolution: '4K Ultra HD',
      posterImage: ASSET_IMAGES.greenwoodLakefront,
      videoUrl: 'https://assets.mixkit.co/videos/47286/47286-720.mp4',
      summary:
        'Spectacular waterfront architectural estate on private shoreline with cantilevered sunset party deck, outdoor fire table, and floor-to-ceiling glass panoramic water vistas.',
      chapters: [
        { time: 0, label: '0:00 Aerial Drone Over Private Lake', description: 'Waterfront approach and pontoon boat dock' },
        { time: 60, label: '1:00 Double-Height Water-View Great Room', description: 'Motorized window walls and natural stone hearth' },
        { time: 110, label: '1:50 Culinary Kitchen & Integrated Wine Cellar', description: 'Waterfall quartz island and premium European appliances' },
        { time: 165, label: '2:45 Lakeside Primary Balcony Suite', description: 'Direct sunset views over the water and spa bathroom' },
        { time: 210, label: '3:30 Outdoor Party Deck & Gas Fire Table', description: 'Entertaining area and illuminated dock path' },
      ],
    },
    {
      id: 'tour-zionsville-cottage',
      title: 'The Cedar Street Historic Village Cottage',
      city: 'Zionsville',
      county: 'Boone County',
      category: 'small',
      categoryLabel: 'Charming Village Cottages',
      price: '$345,000',
      beds: 3,
      baths: 2,
      sqft: 1820,
      durationSeconds: 155, // 2:35
      durationLabel: '2:35',
      resolution: '4K Ultra HD',
      posterImage: ASSET_IMAGES.zionsvilleCottage,
      videoUrl: 'https://assets.mixkit.co/videos/12877/12877-720.mp4',
      summary:
        'Quintessential Zionsville village cottage with cobblestone garden walkway, artisan sage shutters, white oak floors, and walkable access to Main Street.',
      chapters: [
        { time: 0, label: '0:00 Cobblestone Path & Lavender Gardens', description: 'Dry-stack stone garden wall and gabled front porch' },
        { time: 40, label: '0:40 Warm Sunlit Living with Stone Chimney', description: 'Real oak hardwoods and artisan wood trims' },
        { time: 75, label: '1:15 Farmhouse Kitchen & Sunny Dining Nook', description: 'Butcher-block island and hand-glazed backsplash' },
        { time: 115, label: '1:55 Primary Bedroom & Spa Bath', description: 'Walk-in tiled shower and antique brass fixtures' },
        { time: 140, label: '2:20 Shaded Porch Swing & Garden Terrace', description: 'Tranquil village setting shaded by mature Indiana trees' },
      ],
    },
  ];

  // Active tour in the cinema player
  const [selectedTour, setSelectedTour] = useState<VideoTour>(videoTours[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync play/pause state with video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: mute and retry
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, selectedTour.id]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const handleSpeedToggle = () => {
    const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = Math.round(ratio * selectedTour.durationSeconds);
    setCurrentTime(targetSec);
    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      videoRef.current.currentTime = ratio * videoRef.current.duration;
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      const step = (seconds / selectedTour.durationSeconds) * videoRef.current.duration;
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + step));
    }
  };

  const handleJumpChapter = (chapterTime: number) => {
    setCurrentTime(chapterTime);
    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      videoRef.current.currentTime = (chapterTime / selectedTour.durationSeconds) * videoRef.current.duration;
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(true);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = Math.floor(sec % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const progressPercent = selectedTour.durationSeconds > 0
    ? (currentTime / selectedTour.durationSeconds) * 100
    : 0;

  const handleSelectTour = (tour: VideoTour) => {
    setSelectedTour(tour);
    setCurrentTime(0);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 100);
    document.getElementById('video-tours')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredTours = videoTours.filter((tour) => {
    const matchCat = filterCategory === 'all' || tour.category === filterCategory;
    const matchCity = filterCity === 'all' || tour.city.toLowerCase() === filterCity.toLowerCase();
    return matchCat && matchCity;
  });

  return (
    <section id="video-tours" className="py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Luxury gold ambient glow at top */}
      <div className="absolute top-0 left-1/4 w-96 h-1 bg-[#D4AF37]/30 blur-sm pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-luxury-sans font-semibold text-amber-400 uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
              <Video className="w-4 h-4 text-amber-300" />
              <span>{t.videoGallery.kicker}</span>
            </div>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white text-balance">
              <span className="animated-shining-word">{t.videoGallery.title}</span>
            </h2>
            <p className="font-body-read text-base text-slate-300 leading-relaxed font-light">
              {t.videoGallery.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onCallClick}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-gold-metallic text-slate-950 text-xs font-luxury-sans uppercase tracking-wider font-semibold border border-[#D4AF37] hover:opacity-95 shadow-luxury-glow transition-all cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>{t.videoGallery.requestFaceTime}</span>
            </button>
          </div>
        </div>

        {/* Master Cinema Video Player Box */}
        <div className="bg-slate-900 rounded-2xl border border-[#D4AF37]/30 shadow-luxury-glow overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Viewport Screen (Left 8 Cols) */}
          <div className="lg:col-span-8 relative aspect-video bg-black flex flex-col justify-between overflow-hidden group">
            
            {/* Real HD Cinema Video Stream */}
            <video
              ref={videoRef}
              key={selectedTour.id}
              src={selectedTour.videoUrl}
              poster={selectedTour.posterImage}
              playsInline
              muted={isMuted}
              loop
              className="w-full h-full object-cover transition-opacity duration-700"
              onTimeUpdate={() => {
                if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
                  const progressRatio = videoRef.current.currentTime / videoRef.current.duration;
                  setCurrentTime(Math.round(progressRatio * selectedTour.durationSeconds));
                }
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

            {/* Top Bar Overlay */}
            <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between gap-4 pointer-events-none">
              <div className="space-y-1">
                <span className="text-[10px] font-luxury-sans tracking-widest uppercase text-amber-300 font-semibold bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded border border-[#D4AF37]/40 pointer-events-auto">
                  {selectedTour.resolution} · {selectedTour.categoryLabel}
                </span>
                <h3 className="font-luxury-serif text-xl sm:text-3xl font-normal text-white drop-shadow-md">
                  {selectedTour.title}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 drop-shadow font-body-read">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{selectedTour.city}, IN ({selectedTour.county})</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-luxury-serif text-lg font-normal text-amber-300">{selectedTour.price}</span>
                </p>
              </div>

              <div className="shrink-0 hidden sm:block text-right">
                <span className="text-[10px] text-amber-400/80 block font-luxury-sans uppercase tracking-wider">Hosted by</span>
                <span className="text-xs font-luxury-serif tracking-wide text-white">Indy Home Collection</span>
              </div>
            </div>

            {/* Center Play/Pause Large Action */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gold-metallic text-slate-950 border border-[#D4AF37] flex items-center justify-center shadow-luxury-glow transition-transform hover:scale-110 active:scale-95 cursor-pointer z-20"
              aria-label={isPlaying ? 'Pause video tour' : 'Play video tour'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-slate-950 text-slate-950" />
              ) : (
                <Play className="w-7 h-7 ml-1 fill-slate-950 text-slate-950" />
              )}
            </button>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 p-4 sm:p-5 space-y-3 bg-gradient-to-t from-black via-black/80 to-transparent">
              
              {/* Interactive Scrubber Timeline */}
              <div
                onClick={handleSeek}
                className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative transition-all overflow-hidden"
                title="Click to seek"
              >
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={togglePlay}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleSkip(-10)}
                    className="hover:text-white transition-colors cursor-pointer"
                    title="Rewind 10s"
                  >
                    <Rewind className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleSkip(10)}
                    className="hover:text-white transition-colors cursor-pointer"
                    title="Forward 10s"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] tabular-nums text-slate-400">
                    {formatSeconds(currentTime)} / {selectedTour.durationLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Speed toggle */}
                  <button
                    onClick={handleSpeedToggle}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono cursor-pointer transition-colors"
                  >
                    {playbackSpeed}x
                  </button>
                  <span className="text-[11px] font-mono text-amber-400 hidden sm:inline">
                    {selectedTour.resolution}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Chapters & Schedule Column (Right 4 Cols) */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-900 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 space-y-6">
            
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {t.videoGallery.roomChapters}
                </span>
                <p className="text-xs text-slate-400 leading-snug">
                  Click any room timestamp to jump immediately into that section of the tour:
                </p>
              </div>

              {/* Clickable Chapter List */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {selectedTour.chapters.map((chap, idx) => {
                  const isActive =
                    currentTime >= chap.time &&
                    (idx === selectedTour.chapters.length - 1 || currentTime < selectedTour.chapters[idx + 1].time);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleJumpChapter(chap.time)}
                      className={`w-full p-2.5 rounded-lg text-left text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                        isActive
                          ? 'bg-amber-500/20 border border-amber-500/50 text-white font-medium'
                          : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300'
                      }`}
                    >
                      <span className={`font-mono text-[11px] shrink-0 mt-0.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                        ▶
                      </span>
                      <div className="space-y-0.5 min-w-0">
                        <div className="font-semibold truncate">{chap.label}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{chap.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Property Key Specs */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-mono tabular-nums text-slate-300">
                <div className="p-2 bg-slate-800/80 rounded border border-slate-700/50">
                  <span className="block text-[10px] text-slate-400">BEDS</span>
                  <span className="font-bold text-white text-sm">{selectedTour.beds}</span>
                </div>
                <div className="p-2 bg-slate-800/80 rounded border border-slate-700/50">
                  <span className="block text-[10px] text-slate-400">BATHS</span>
                  <span className="font-bold text-white text-sm">{selectedTour.baths}</span>
                </div>
                <div className="p-2 bg-slate-800/80 rounded border border-slate-700/50">
                  <span className="block text-[10px] text-slate-400">SQ FT</span>
                  <span className="font-bold text-white text-sm">{selectedTour.sqft.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Direct Conversion Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => onScheduleTour(`Virtual Video Tour: ${selectedTour.title}`)}
                className="w-full py-3 px-4 rounded-lg bg-gold-metallic text-slate-950 font-luxury-sans uppercase tracking-wider font-semibold text-xs border border-[#D4AF37] hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-luxury-glow"
              >
                <Calendar className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>{t.videoGallery.bookShowing}</span>
              </button>

              <button
                onClick={onCallClick}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-300 text-xs font-luxury-sans uppercase tracking-wider font-semibold border border-slate-800 hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Us: (317) 408-9532</span>
              </button>
            </div>

          </div>

        </div>

        {/* Video Gallery Browser / Filter Bar */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-luxury-serif text-2xl font-normal text-white">
                Browse More Video Walkthroughs by Community & Style
              </h3>
              <p className="text-xs text-slate-400">
                Select any property below to load its full HD tour in the cinema player above.
              </p>
            </div>

            {/* Style Filters */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
              {[
                { id: 'all', label: 'All Video Tours' },
                { id: 'luxury', label: 'Luxury Mansions' },
                { id: 'single-family', label: 'Single-Family' },
                { id: 'small', label: 'Small Cottages' },
                { id: 'new-build', label: 'New Builds' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    filterCategory === tab.id
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => {
              const isSelected = selectedTour.id === tour.id;

              return (
                <div
                  key={tour.id}
                  onClick={() => handleSelectTour(tour)}
                  className={`bg-slate-900 rounded-xl border transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between hover-card-float ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                      : 'border-slate-800 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={tour.posterImage}
                        alt={tour.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 hover-image-zoom transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Centered Play Button */}
                      <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-black/60 group-hover:bg-[#D4AF37] text-white group-hover:text-slate-950 flex items-center justify-center transition-all animate-pulse-subtle group-hover:scale-110">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-mono text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{tour.durationLabel}</span>
                      </div>

                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-medium text-amber-300">
                        {tour.city}, IN
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif-luxury text-lg font-bold text-white font-mono tabular-nums">
                          {tour.price}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {tour.sqft.toLocaleString()} sq ft
                        </span>
                      </div>

                      <h4 className="font-serif-luxury font-bold text-slate-200 group-hover:text-amber-400 transition-colors text-sm line-clamp-1">
                        {tour.title}
                      </h4>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {tour.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-amber-400 font-medium">Click to Load in Player</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
