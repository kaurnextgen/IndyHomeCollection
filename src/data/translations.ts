export type Language = 'en' | 'hi' | 'pa';

export interface Translations {
  nav: {
    homes: string;
    communities: string;
    services: string;
    valuation: string;
    faq: string;
    contact: string;
    callNow: string;
    preview: string;
    promptStudio: string;
  };
  brand: {
    slogan: string;
    directLine: string;
    area: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    callCta: string;
    consultCta: string;
    valuationPrompt: string;
    valuationLink: string;
    trustPoint1: string;
    trustPoint2: string;
  };
  marketStats: {
    kicker: string;
    title: string;
    subtitle: string;
    medianPrice: string;
    daysOnMarket: string;
    saleToList: string;
    inventory: string;
    seeComps: string;
    requestReport: string;
  };
  properties: {
    kicker: string;
    title: string;
    subtitle: string;
    askOffMarket: string;
    watchTour: string;
    scheduleTour: string;
    allStyles: string;
    luxuryBig: string;
    smallCozy: string;
    newBuilds: string;
    familyBrick: string;
  };
  videoGallery: {
    kicker: string;
    title: string;
    subtitle: string;
    requestFaceTime: string;
    roomChapters: string;
    clickToLoad: string;
    bookShowing: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    whatWeDeliver: string;
    discussDirectly: string;
  };
  communities: {
    kicker: string;
    title: string;
    subtitle: string;
    allCommunities: string;
    explore: string;
    idealFor: string;
    highlights: string;
    commute: string;
  };
  valuation: {
    kicker: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    cityLabel: string;
    sqftLabel: string;
    bedsLabel: string;
    bathsLabel: string;
    conditionLabel: string;
    sendReport: string;
    estimatedRange: string;
    cmaTitle: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
  };
  investment: {
    kicker: string;
    title: string;
    subtitle: string;
    purchasePrice: string;
    downPayment: string;
    monthlyRent: string;
    monthlyCashFlow: string;
    capRate: string;
    requestDeals: string;
  };
  trust: {
    kicker: string;
    title: string;
    subtitle: string;
    readyTitle: string;
    readySubtitle: string;
  };
  stories: {
    kicker: string;
    title: string;
    subtitle: string;
    closingResult: string;
    officialStatement: string;
    shareExperience: string;
    multilingualNotice: string;
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    haveQuestion: string;
    askOnline: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    directLine: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    serviceLabel: string;
    communityLabel: string;
    timelineLabel: string;
    submitButton: string;
  };
  footer: {
    slogan: string;
    servicesHeader: string;
    communitiesHeader: string;
    connectHeader: string;
    equalHousing: string;
    allRightsReserved: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      homes: 'Homes & Tours',
      communities: 'Communities',
      services: 'Services',
      valuation: 'Valuation',
      faq: 'FAQ',
      contact: 'Contact',
      callNow: 'Call (317) 408-9532',
      preview: 'Website Preview',
      promptStudio: 'Master Prompt',
    },
    brand: {
      slogan: 'Your Trusted Realtor · Indiana',
      directLine: 'Direct Realtor Line: (317) 408-9532',
      area: 'Serving Greater Indianapolis & All Indiana',
    },
    hero: {
      kicker: 'Indiana Residential & Investment Real Estate',
      headline: 'Your Trusted Indiana Real Estate Advisor in Every Move.',
      subheadline:
        'Whether you are buying your family dream home, selling for maximum return, investing in reliable Midwest cash flow, or relocating to the Hoosier State—we deliver transparent, dedicated local guidance with zero pressure.',
      callCta: 'Call (317) 408-9532',
      consultCta: 'Schedule Consultation',
      valuationPrompt: 'Curious what your Indiana home is worth today?',
      valuationLink: 'Try Instant Valuation Estimator',
      trustPoint1: 'Direct 1-on-1 Representation',
      trustPoint2: 'English, Punjabi & Hindi Consultations',
    },
    marketStats: {
      kicker: 'Real-Time Indiana Market Pulse',
      title: 'Local Market Dynamics & Pricing Trends',
      subtitle: 'Current rolling MLS benchmarks across Central Indiana',
      medianPrice: 'Median Home Price',
      daysOnMarket: 'Avg. Days on Market',
      saleToList: 'Sale-to-List Ratio',
      inventory: 'Months of Inventory',
      seeComps: 'See comps for your home',
      requestReport: 'Request full market report',
    },
    properties: {
      kicker: 'Real Estate Gallery & Virtual Tours',
      title: 'Explore Indiana Homes Across Every Style & Scale',
      subtitle:
        'From grand architectural estates in Zionsville and Carmel to cozy family cottages in Avon and brand-new modern farmhouses in Westfield—experience our curated Indiana property collection and HD virtual video walkthroughs.',
      askOffMarket: 'Ask About Off-Market Listings',
      watchTour: 'Play Video Tour',
      scheduleTour: 'Schedule Tour',
      allStyles: 'All Home Styles',
      luxuryBig: 'Luxury Big Homes & Estates',
      smallCozy: 'Charming Small Homes & Cottages',
      newBuilds: 'New Construction & Modern Builds',
      familyBrick: 'Large Family Brick Homes',
    },
    videoGallery: {
      kicker: 'Cinematic Video Tour Gallery · Indiana Real Estate',
      title: 'High-Definition Virtual Video Walkthroughs',
      subtitle:
        'Experience authentic room-by-room walkthroughs and aerial drone surveys of luxury estates, executive single-family residences, and cozy cottages across Central Indiana from anywhere in the world.',
      requestFaceTime: 'Request Custom FaceTime Tour: (317) 408-9532',
      roomChapters: 'Interactive Room Chapters',
      clickToLoad: 'Click to Load in Cinema Player',
      bookShowing: 'Schedule Private In-Person Walkthrough',
    },
    services: {
      kicker: '01. Dedicated Real Estate Representation',
      title: 'Four Core Pillars Built Around Your Goals',
      subtitle:
        'Real estate decisions are personal, consequential, and uniquely yours. Whether stepping into homeownership, maximizing home equity, or expanding your portfolio, we guide every milestone with dedicated advisory and care.',
      whatWeDeliver: 'What We Deliver',
      discussDirectly: 'Or discuss directly: (317) 408-9532',
    },
    communities: {
      kicker: '02. Hyper-Local Indiana Intelligence',
      title: 'Explore Indiana’s Most Coveted Neighborhoods',
      subtitle:
        'From northern luxury havens like Carmel and Zionsville to bustling westside hubs like Avon, Plainfield, and Brownsburg, and southside anchors like Greenwood, Southport, and Whiteland—here is where our clients thrive.',
      allCommunities: 'All Communities (14)',
      explore: 'Explore',
      idealFor: 'Ideal for:',
      highlights: 'Neighborhood Highlights',
      commute: 'Commute to Indy',
    },
    valuation: {
      kicker: '03. Instant Market Valuation',
      title: 'What Is Your Indiana Property Worth in Today’s Market?',
      subtitle:
        'Automated algorithms miss unique architectural upgrades, neighborhood pockets, and school zoning shifts. Use our interactive benchmark tool below for an immediate estimate, then request our personalized Comparative Market Analysis (CMA).',
      addressLabel: 'Property Address or Subdivision',
      cityLabel: 'Indiana City / Community',
      sqftLabel: 'Approximate Finished Square Footage',
      bedsLabel: 'Bedrooms',
      bathsLabel: 'Bathrooms',
      conditionLabel: 'Interior & Exterior Condition',
      sendReport: 'Send Free Valuation Report',
      estimatedRange: 'Estimated Indiana Market Range',
      cmaTitle: 'Get Our In-Depth Comparative Market Report',
      nameLabel: 'Your Name',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address',
    },
    investment: {
      kicker: '04. Midwest Cash Flow & Wealth Modeling',
      title: 'Indiana Real Estate Investment & ROI Calculator',
      subtitle:
        'Indiana’s low entry price points, steady job market, and favorable property taxes make it a top destination for residential rental investors. Model your potential monthly cash flow and cap rate below.',
      purchasePrice: 'Target Purchase Price',
      downPayment: 'Down Payment',
      monthlyRent: 'Expected Monthly Gross Rent',
      monthlyCashFlow: 'Est. Net Monthly Cash Flow',
      capRate: 'Estimated Cap Rate',
      requestDeals: 'Request Current Off-Market Investment List',
    },
    trust: {
      kicker: '05. The Indy Home Collection Commitment',
      title: 'Rooted in Authenticity. Driven by What Matters to You.',
      subtitle:
        'In an industry crowded with flashy billboard claims and automated algorithms, Indy Home Collection stands for something grounded: genuine hospitality, local know-how, and dependable follow-through.',
      readyTitle: 'Ready to discuss your next chapter in Indiana?',
      readySubtitle: 'Call or text us directly at (317) 408-9532 for a confidential, no-obligation conversation.',
    },
    stories: {
      kicker: 'Real Indian & Punjabi Client Closings · Trusted Guidance',
      title: 'Client Success Stories & Closing Statements',
      subtitle:
        'Serving our vibrant Indian, Punjabi, and multicultural communities across Carmel, Fishers, Zionsville, Avon, and Greater Indianapolis with culturally attuned service in English, Punjabi, and Hindi.',
      closingResult: 'Closing Result:',
      officialStatement: 'Official Closing Statement:',
      shareExperience: 'Share Your Closing Experience',
      multilingualNotice: 'Consultations available in English, Punjabi (ਪੰਜਾਬੀ), and Hindi (हिन्दी) for all Indiana home purchases.',
    },
    faq: {
      kicker: 'Clear Answers · No Industry Jargon',
      title: 'Frequently Asked Questions',
      subtitle:
        'Everything you need to know about navigating the Indiana real estate market, pricing strategies, and working with our dedicated real estate advisory.',
      haveQuestion: 'Have a specific question about your situation?',
      askOnline: 'Ask Online',
    },
    contact: {
      kicker: '06. Connect With Our Real Estate Advisory',
      title: 'Let’s Start the Conversation',
      subtitle:
        'Whether you need a quick answer about an Indiana neighborhood or a full strategy for selling or investing, our team is ready to assist.',
      directLine: 'Direct Line',
      formTitle: 'Schedule a One-on-One Discovery Consultation',
      formSubtitle: 'Tell us a bit about your timeline and preferences. We will respond personally within a few hours.',
      nameLabel: 'Your Full Name *',
      phoneLabel: 'Phone Number *',
      emailLabel: 'Email Address',
      serviceLabel: 'Primary Service Needed',
      communityLabel: 'Preferred Indiana Community',
      timelineLabel: 'Target Timeline',
      submitButton: 'Submit Consultation Request',
    },
    footer: {
      slogan: 'Your Trusted Realtor · Indiana',
      servicesHeader: 'Services',
      communitiesHeader: 'Key Communities',
      connectHeader: 'Connect Directly',
      equalHousing: 'Equal Housing Opportunity · Indiana Real Estate Services',
      allRightsReserved: 'All rights reserved.',
    },
  },
  hi: {
    nav: {
      homes: 'घर और वीडियो टूर',
      communities: 'क्षेत्र व शहर',
      services: 'सेवाएं',
      valuation: 'घर का मूल्यांकन',
      faq: 'अक्सर पूछे जाने वाले सवाल',
      contact: 'संपर्क करें',
      callNow: 'कॉल करें (317) 408-9532',
      preview: 'वेबसाइट प्रिव्यू',
      promptStudio: 'मास्टर प्रॉम्प्ट',
    },
    brand: {
      slogan: 'आपके अपने विश्वसनीय रियलटर · इंडियाना',
      directLine: 'सीधा रियलटर नंबर: (317) 408-9532',
      area: 'ग्रेटर इंडियानापोलिस और पूरे इंडियाना में सेवारत',
    },
    hero: {
      kicker: 'इंडियाना रिहायशी एवं निवेश रियल एस्टेट',
      headline: 'इंडियाना में आपके हर घर के सपने के सच्चे और विश्वसनीय साथी।',
      subheadline:
        'चाहे आप अपना पहला घर खरीद रहे हों, अपना मौजूदा घर सर्वश्रेष्ठ दाम पर बेच रहे हों, या इंडियाना में किराये की संपत्ति में निवेश कर रहे हों—कौर आपको बिना किसी दबाव के ईमानदार और समर्पित सलाह देती हैं।',
      callCta: 'कॉल करें (317) 408-9532',
      consultCta: 'मुफ्त परामर्श बुक करें',
      valuationPrompt: 'जानना चाहते हैं कि आज आपके इंडियाना घर की क्या कीमत है?',
      valuationLink: 'तुरंत घर का मूल्यांकन देखें',
      trustPoint1: 'प्रत्यक्ष 1-ऑन-1 व्यक्तिगत सेवा',
      trustPoint2: 'हिंदी, पंजाबी और अंग्रेजी में संपूर्ण परामर्श',
    },
    marketStats: {
      kicker: 'इंडियाना रियल एस्टेट बाजार के ताजा आंकड़े',
      title: 'स्थानीय बाजार की गतिशीलता और मूल्य रुझान',
      subtitle: 'सेंट्रल इंडियाना भर में नवीनतम MLS बिक्री आंकड़े',
      medianPrice: 'औसत घर की कीमत',
      daysOnMarket: 'बिक्री में लगने वाले औसत दिन',
      saleToList: 'बिक्री-से-सूची मूल्य अनुपात',
      inventory: 'सक्रिय इन्वेंटरी (महीने)',
      seeComps: 'अपने घर के नजदीकी दाम देखें',
      requestReport: 'पूरी बाजार रिपोर्ट मंगवाएं',
    },
    properties: {
      kicker: 'रियल एस्टेट गैलरी और वर्चुअल टूर',
      title: 'हर शैली और बजट के इंडियाना घर देखें',
      subtitle:
        'ज़ायन्सविले और कार्मेल के भव्य लग्जरी बंगलों से लेकर एवन के सुंदर पारिवारिक कॉटेज और वेस्टफील्ड के आधुनिक नए घरों तक—हमारी संकलित सूची और HD वीडियो वॉकथ्रू का अनुभव करें।',
      askOffMarket: 'ऑफ-मार्केट घरों की जानकारी लें',
      watchTour: 'वीडियो टूर चलाएं',
      scheduleTour: 'दौरा तय करें',
      allStyles: 'सभी प्रकार के घर',
      luxuryBig: 'लग्जरी बड़े एस्टेट',
      smallCozy: 'सुंदर छोटे और मध्यम घर',
      newBuilds: 'नए आधुनिक निर्माण',
      familyBrick: 'बड़े पारिवारिक ईंट के घर',
    },
    videoGallery: {
      kicker: 'सिनेमैटिक वीडियो टूर गैलरी · इंडियाना',
      title: 'हाई-डेफिनिशन वर्चुअल वीडियो वॉकथ्रू',
      subtitle:
        'दुनिया के किसी भी कोने से बैठकर कार्मेल, फिशर्स, एवन और ज़ायन्सविले के घरों का कमरा-दर-कमरा और ड्रोन वीडियो मुआयना करें।',
      requestFaceTime: 'कस्टम फेसटाइम वीडियो टूर: (317) 408-9532',
      roomChapters: 'कमरा-वार वीडियो अध्याय',
      clickToLoad: 'सिनेमा प्लेयर में लोड करने के लिए क्लिक करें',
      bookShowing: 'निजी व्यक्तिगत दौरा बुक करें',
    },
    services: {
      kicker: '01. समर्पित रियल एस्टेट प्रतिनिधित्व',
      title: 'आपके लक्ष्यों पर आधारित चार मुख्य स्तंभ',
      subtitle:
        'घर खरीदना या बेचना आपके जीवन का सबसे महत्वपूर्ण फैसला है। हम हर कदम पर आपके साथ एक सच्चे और विश्वसनीय सलाहकार की तरह खड़े रहते हैं।',
      whatWeDeliver: 'हमारी सेवाएं',
      discussDirectly: 'या सीधे बातचीत करें: (317) 408-9532',
    },
    communities: {
      kicker: '02. इंडियाना के मुख्य क्षेत्र',
      title: 'इंडियाना के सबसे पसंदीदा पड़ोस खोजें',
      subtitle:
        'उत्तरी लग्जरी क्षेत्र कार्मेल और ज़ायन्सविले से लेकर पश्चिम के एवन, प्लेनफील्ड और ब्राउनसबर्ग, तथा दक्षिण के ग्रीनवुड और साउथपोर्ट तक।',
      allCommunities: 'सभी क्षेत्र (14)',
      explore: 'विस्तार से देखें',
      idealFor: 'के लिए सर्वोत्तम:',
      highlights: 'क्षेत्र की विशेषताएं',
      commute: 'इंडियानापोलिस की दूरी',
    },
    valuation: {
      kicker: '03. तुरंत बाजार मूल्य अनुमान',
      title: 'आज के बाजार में आपके इंडियाना घर की क्या कीमत है?',
      subtitle:
        'ऑनलाइन ऑटोमेटेड वेबसाइटें स्थानीय स्कूल जोन और आंतरिक नवीनीकरण को नजरअंदाज कर देती हैं। सटीक तुलनात्मक बाजार विश्लेषण (CMA) प्राप्त करें।',
      addressLabel: 'घर का पता या सब-डिवीजन',
      cityLabel: 'इंडियाना शहर / क्षेत्र',
      sqftLabel: 'अनुमानित क्षेत्रफल (वर्ग फुट)',
      bedsLabel: 'बेडरूम',
      bathsLabel: 'बाथरूम',
      conditionLabel: 'घर की स्थिति',
      sendReport: 'मुफ्त मूल्यांकन रिपोर्ट भेजें',
      estimatedRange: 'अनुमानित इंडियाना बाजार दायरा',
      cmaTitle: 'कौर की विस्तृत CMA रिपोर्ट प्राप्त करें',
      nameLabel: 'आपका नाम',
      phoneLabel: 'फ़ोन नंबर',
      emailLabel: 'ईमेल पता',
    },
    investment: {
      kicker: '04. किराये की आय और धन वृद्धि मॉडल',
      title: 'इंडियाना रियल एस्टेट निवेश और ROI कैलकुलेटर',
      subtitle:
        'इंडियाना का स्थिर रोजगार बाजार, कम प्रॉपर्टी टैक्स और 6%-9% किराये की यील्ड इसे निवेशकों के लिए पसंदीदा स्थान बनाती है।',
      purchasePrice: 'खरीद मूल्य',
      downPayment: 'डाउन पेमेंट',
      monthlyRent: 'अपेक्षित मासिक किराया',
      monthlyCashFlow: 'अनुमानित शुद्ध मासिक नकद प्रवाह',
      capRate: 'अनुमानित कैप रेट',
      requestDeals: 'ऑफ-मार्केट निवेश सौदों की सूची मांगें',
    },
    trust: {
      kicker: '05. हमारी निष्ठा और सेवा का वादा',
      title: 'सच्चाई में निहित। जो आपके लिए जरूरी है, वही हमारा लक्ष्य।',
      subtitle:
        'हम किसी हड़बड़ी या दबाव वाली बिक्री में विश्वास नहीं रखते—केवल पारदर्शी सलाह और दीर्घकालिक पारिवारिक संतुष्टि।',
      readyTitle: 'इंडियाना में अपने अगले कदम पर चर्चा करने के लिए तैयार हैं?',
      readySubtitle: 'गोपनीय और बिना किसी बंधन की सलाह के लिए सीधे हमें (317) 408-9532 पर कॉल या मैसेज करें।',
    },
    stories: {
      kicker: 'वास्तविक भारतीय और पंजाबी ग्राहकों की सफल कहानियां',
      title: 'ग्राहक सफलता और आधिकारिक क्लोजिंग वक्तव्य',
      subtitle:
        'कार्मेल, फिशर्स, एवन और ज़ायन्सविले में हमारे जीवंत भारतीय और बहुसांस्कृतिक परिवारों की सेवा हिंदी, पंजाबी और अंग्रेजी में।',
      closingResult: 'क्लोजिंग परिणाम:',
      officialStatement: 'आधिकारिक क्लोजिंग वक्तव्य:',
      shareExperience: 'अपना अनुभव साझा करें',
      multilingualNotice: 'सभी इंडियाना घरों की खरीद-फरोख्त के लिए हिंदी (हिन्दी), पंजाबी (ਪੰਜਾਬੀ) और अंग्रेजी में परामर्श उपलब्ध है।',
    },
    faq: {
      kicker: 'स्पष्ट उत्तर · कोई जटिल शब्दावली नहीं',
      title: 'अक्सर पूछे जाने वाले सवाल',
      subtitle: 'इंडियाना में घर खरीदने, बेचने और अपनी जरूरत के अनुसार काम करने से जुड़ी हर महत्वपूर्ण जानकारी।',
      haveQuestion: 'क्या आपके पास कोई विशिष्ट प्रश्न है?',
      askOnline: 'ऑनलाइन पूछें',
    },
    contact: {
      kicker: '06. अपने रियल एस्टेट सलाहकार से जुड़ें',
      title: 'आइये बातचीत शुरू करें',
      subtitle: 'चाहे किसी स्कूल डिस्ट्रिक्ट के बारे में छोटी सी जानकारी चाहिए या घर बेचने की पूरी योजना—कौर आपकी सेवा में उपस्थित हैं।',
      directLine: 'सीधा नंबर',
      formTitle: 'व्यक्तिगत परामर्श सत्र बुक करें',
      formSubtitle: 'हमें अपनी समय-सीमा और प्राथमिकताओं के बारे में बताएं। कौर कुछ ही घंटों में आपसे संपर्क करेंगी।',
      nameLabel: 'पूरा नाम *',
      phoneLabel: 'फ़ोन नंबर *',
      emailLabel: 'ईमेल पता',
      serviceLabel: 'आवश्यक सेवा',
      communityLabel: 'पसंदीदा इंडियाना क्षेत्र',
      timelineLabel: 'समय-सीमा',
      submitButton: 'परामर्श अनुरोध भेजें',
    },
    footer: {
      slogan: 'आपके अपने विश्वसनीय रियलटर · इंडियाना',
      servicesHeader: 'सेवाएं',
      communitiesHeader: 'प्रमुख क्षेत्र',
      connectHeader: 'सीधा संपर्क',
      equalHousing: 'समान आवास अवसर · इंडियाना रियल एस्टेट सेवाएं',
      allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    },
  },
  pa: {
    nav: {
      homes: 'ਘਰ ਅਤੇ ਵੀਡੀਓ ਟੂਰ',
      communities: 'ਇਲਾਕੇ ਤੇ ਸ਼ਹਿਰ',
      services: 'ਸੇਵਾਵਾਂ',
      valuation: 'ਘਰ ਦੀ ਕੀਮਤ',
      faq: 'ਸਵਾਲ-ਜਵਾਬ',
      contact: 'ਸੰਪਰਕ ਕਰੋ',
      callNow: 'ਕਾਲ ਕਰੋ (317) 408-9532',
      preview: 'ਵੈੱਬਸਾਈਟ ਪ੍ਰੀਵਿਊ',
      promptStudio: 'ਮਾਸਟਰ ਪ੍ਰੌਮਪਟ',
    },
    brand: {
      slogan: 'ਤੁਹਾਡਾ ਭਰੋਸੇਮੰਦ ਰੀਅਲਟਰ · ਇੰਡੀਆਨਾ',
      directLine: 'ਸਿੱਧਾ ਰੀਅਲਟਰ ਫ਼ੋਨ: (317) 408-9532',
      area: 'ਗ੍ਰੇਟਰ ਇੰਡੀਆਨਾਪੋਲਿਸ ਅਤੇ ਪੂਰੇ ਇੰਡੀਆਨਾ ਵਿੱਚ ਸੇਵਾਦਾਰ',
    },
    hero: {
      kicker: 'ਇੰਡੀਆਨਾ ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਨਿਵੇਸ਼ ਰੀਅਲ ਅਸਟੇਟ',
      headline: 'ਇੰਡੀਆਨਾ ਵਿੱਚ ਹਰ ਘਰ ਦੇ ਸੁਪਨੇ ਦੇ ਸੱਚੇ ਅਤੇ ਭਰੋਸੇਮੰਦ ਸਾਥੀ।',
      subheadline:
        'ਚਾਹੇ ਤੁਸੀਂ ਪਰਿਵਾਰ ਲਈ ਪਹਿਲਾ ਘਰ ਖਰੀਦ ਰਹੇ ਹੋ, ਆਪਣਾ ਮੌਜੂਦਾ ਘਰ ਚੰਗੇ ਮੁਨਾਫ਼ੇ ਤੇ ਵੇਚਣਾ ਹੈ, ਜਾਂ ਇੰਡੀਆਨਾ ਵਿੱਚ ਕਿਰਾਏ ਦੀ ਜਾਇਦਾਦ ਵਿੱਚ ਨਿਵੇਸ਼ ਕਰਨਾ ਹੈ—ਕੌਰ ਤੁਹਾਨੂੰ ਬਿਨਾਂ ਕਿਸੇ ਦਬਾਅ ਦੇ ਇਮਾਨਦਾਰ ਤੇ ਸਮਰਪਿਤ ਸਲਾਹ ਦਿੰਦੀ ਹੈ।',
      callCta: 'ਕਾਲ ਕਰੋ (317) 408-9532',
      consultCta: 'ਮੁਫ਼ਤ ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
      valuationPrompt: 'ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ ਕਿ ਅੱਜ ਤੁਹਾਡੇ ਇੰਡੀਆਨਾ ਘਰ ਦੀ ਕੀ ਕੀਮਤ ਹੈ?',
      valuationLink: 'ਤੁਰੰਤ ਘਰ ਦਾ ਮੁਲਾਂਕਣ ਦੇਖੋ',
      trustPoint1: 'ਸਿੱਧੀ 1-ਆਨ-1 ਨਿੱਜੀ ਸੇਵਾ',
      trustPoint2: 'ਪੰਜਾਬੀ, ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਪੂਰੀ ਗੱਲਬਾਤ',
    },
    marketStats: {
      kicker: 'ਇੰਡੀਆਨਾ ਰੀਅਲ ਅਸਟੇਟ ਮਾਰਕੀਟ ਦੇ ਤਾਜ਼ਾ ਅੰਕੜੇ',
      title: 'ਸਥਾਨਕ ਬਾਜ਼ਾਰ ਦੀ ਚਾਲ ਅਤੇ ਕੀਮਤਾਂ ਦੇ ਰੁਝਾਨ',
      subtitle: 'ਸੈਂਟਰਲ ਇੰਡੀਆਨਾ ਵਿੱਚ ਤਾਜ਼ਾ MLS ਵਿਕਰੀ ਅੰਕੜੇ',
      medianPrice: 'ਔਸਤਨ ਘਰ ਦੀ ਕੀਮਤ',
      daysOnMarket: 'ਵਿਕਰੀ ਵਿੱਚ ਲੱਗਦੇ ਔਸਤਨ ਦਿਨ',
      saleToList: 'ਵਿਕਰੀ-ਤੋਂ-ਸੂਚੀ ਮੁੱਲ ਅਨੁਪਾਤ',
      inventory: 'ਮੌਜੂਦਾ ਘਰਾਂ ਦੀ ਗਿਣਤੀ (ਮਹੀਨੇ)',
      seeComps: 'ਆਪਣੇ ਘਰ ਦੇ ਨੇੜਲੇ ਮੁੱਲ ਦੇਖੋ',
      requestReport: 'ਪੂਰੀ ਮਾਰਕੀਟ ਰਿਪੋਰਟ ਮੰਗਵਾਓ',
    },
    properties: {
      kicker: 'ਰੀਅਲ ਅਸਟੇਟ ਗੈਲਰੀ ਅਤੇ ਵਰਚੁਅਲ ਟੂਰ',
      title: 'ਹਰ ਸਟਾਈਲ ਅਤੇ ਆਕਾਰ ਦੇ ਇੰਡੀਆਨਾ ਘਰ ਦੇਖੋ',
      subtitle:
        'ਜ਼ਾਇਨਸਵਿਲ ਅਤੇ ਕਾਰਮਲ ਦੇ ਸ਼ਾਨਦਾਰ ਲਗਜ਼ਰੀ ਬੰਗਲਿਆਂ ਤੋਂ ਲੈ ਕੇ ਏਵਨ ਦੇ ਖੂਬਸੂਰਤ ਪਰਿਵਾਰਕ ਘਰਾਂ ਅਤੇ ਵੈਸਟਫੀਲਡ ਦੇ ਨਵੇਂ ਮਾਡਰਨ ਘਰਾਂ ਤੱਕ—ਸਾਡੀ ਚੋਣਵੀਂ ਸੂਚੀ ਅਤੇ HD ਵੀਡੀਓ ਵਾਕਥਰੂ ਦੇਖੋ।',
      askOffMarket: 'ਆਫ-ਮਾਰਕੀਟ ਘਰਾਂ ਬਾਰੇ ਪੁੱਛੋ',
      watchTour: 'ਵੀਡੀਓ ਟੂਰ ਚਲਾਓ',
      scheduleTour: 'ਦੌਰਾ ਤੈਅ ਕਰੋ',
      allStyles: 'ਸਾਰੇ ਘਰ',
      luxuryBig: 'ਲਗਜ਼ਰੀ ਵੱਡੇ ਅਸਟੇਟ',
      smallCozy: 'ਸੁੰਦਰ ਛੋਟੇ ਤੇ ਦਰਮਿਆਨੇ ਘਰ',
      newBuilds: 'ਨਵੇਂ ਬਣੇ ਮਾਡਰਨ ਘਰ',
      familyBrick: 'ਵੱਡੇ ਪਰਿਵਾਰਕ ਇੱਟਾਂ ਵਾਲੇ ਘਰ',
    },
    videoGallery: {
      kicker: 'ਸਿਨੇਮੈਟਿਕ ਵੀਡੀਓ ਟੂਰ ਗੈਲਰੀ · ਇੰਡੀਆਨਾ',
      title: 'ਹਾਈ-ਡੈਫੀਨੇਸ਼ਨ ਵਰਚੁਅਲ ਵੀਡੀਓ ਵਾਕਥਰੂ',
      subtitle:
        'ਦੁਨੀਆ ਦੇ ਕਿਸੇ ਵੀ ਕੋਨੇ ਤੋਂ ਬੈਠ ਕੇ ਕਾਰਮਲ, ਫਿਸ਼ਰਸ, ਏਵਨ ਅਤੇ ਜ਼ਾਇਨਸਵਿਲ ਦੇ ਘਰਾਂ ਦਾ ਕਮਰਾ-ਦਰ-ਕਮਰਾ ਅਤੇ ਡਰੋਨ ਵੀਡੀਓ ਦੌਰਾ ਕਰੋ।',
      requestFaceTime: 'ਕਸਟਮ ਫੇਸਟਾਈਮ ਵੀਡੀਓ ਟੂਰ: (317) 408-9532',
      roomChapters: 'ਕਮਰਾ-ਵਾਰ ਵੀਡੀਓ ਅਧਿਆਇ',
      clickToLoad: 'ਸਿਨੇਮਾ ਪਲੇਅਰ ਵਿੱਚ ਚਲਾਉਣ ਲਈ ਕਲਿੱਕ ਕਰੋ',
      bookShowing: 'ਨਿੱਜੀ ਦੌਰਾ ਬੁੱਕ ਕਰੋ',
    },
    services: {
      kicker: '01. ਸਮਰਪਿਤ ਰੀਅਲ ਅਸਟੇਟ ਪ੍ਰਤੀਨਿਧਤਾ',
      title: 'ਤੁਹਾਡੇ ਟੀਚਿਆਂ ਦੁਆਲੇ ਬਣੇ ਚਾਰ ਮੁੱਖ ਥੰਮ੍ਹ',
      subtitle:
        'ਘਰ ਖਰੀਦਣਾ ਜਾਂ ਵੇਚਣਾ ਤੁਹਾਡੇ ਜੀਵਨ ਦਾ ਬਹੁਤ ਵੱਡਾ ਫੈਸਲਾ ਹੈ। ਅਸੀਂ ਹਰ ਕਦਮ ਤੇ ਤੁਹਾਡੇ ਨਾਲ ਇੱਕ ਸਮਰਪਿਤ ਮਾਹਿਰ ਵਾਂਗ ਖੜ੍ਹਦੇ ਹਾਂ।',
      whatWeDeliver: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ',
      discussDirectly: 'ਜਾਂ ਸਿੱਧੀ ਗੱਲ ਕਰੋ: (317) 408-9532',
    },
    communities: {
      kicker: '02. ਇੰਡੀਆਨਾ ਦੇ ਮੁੱਖ ਇਲਾਕੇ',
      title: 'ਇੰਡੀਆਨਾ ਦੇ ਸਭ ਤੋਂ ਮਨਪਸੰਦ ਇਲਾਕੇ ਲੱਭੋ',
      subtitle:
        'ਉੱਤਰੀ ਲਗਜ਼ਰੀ ਇਲਾਕੇ ਕਾਰਮਲ ਅਤੇ ਜ਼ਾਇਨਸਵਿਲ ਤੋਂ ਲੈ ਕੇ ਪੱਛਮ ਦੇ ਏਵਨ, ਪਲੇਨਫੀਲਡ ਅਤੇ ਬ੍ਰਾਊਨਸਬਰਗ, ਅਤੇ ਦੱਖਣ ਦੇ ਗ੍ਰੀਨਵੁੱਡ ਤੇ ਸਾਊਥਪੋਰਟ ਤੱਕ।',
      allCommunities: 'ਸਾਰੇ ਇਲਾਕੇ (14)',
      explore: 'ਵੇਰਵਾ ਦੇਖੋ',
      idealFor: 'ਲਈ ਬਿਹਤਰੀਨ:',
      highlights: 'ਇਲਾਕੇ ਦੀਆਂ ਖੂਬੀਆਂ',
      commute: 'ਇੰਡੀਆਨਾਪੋਲਿਸ ਦੀ ਦੂਰੀ',
    },
    valuation: {
      kicker: '03. ਤੁਰੰਤ ਮਾਰਕੀਟ ਮੁੱਲ ਅੰਦਾਜ਼ਾ',
      title: 'ਅੱਜ ਦੇ ਬਾਜ਼ਾਰ ਵਿੱਚ ਤੁਹਾਡੇ ਇੰਡੀਆਨਾ ਘਰ ਦੀ ਕੀ ਕੀਮਤ ਹੈ?',
      subtitle:
        'ਆਨਲਾਈਨ ਵੈੱਬਸਾਈਟਾਂ ਸਥਾਨਕ ਸਕੂਲ ਜ਼ੋਨ ਅਤੇ ਅੰਦਰੂਨੀ ਮੁਰੰਮਤ ਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕਰ ਦਿੰਦੀਆਂ ਹਨ। ਸਹੀ ਤੁਲਨਾਤਮਕ ਮਾਰਕੀਟ ਵਿਸ਼ਲੇਸ਼ਣ (CMA) ਪ੍ਰਾਪਤ ਕਰੋ।',
      addressLabel: 'ਘਰ ਦਾ ਪਤਾ ਜਾਂ ਸਬ-ਡਿਵੀਜ਼ਨ',
      cityLabel: 'ਇੰਡੀਆਨਾ ਸ਼ਹਿਰ / ਇਲਾਕਾ',
      sqftLabel: 'ਅੰਦਾਜ਼ਨ ਰਕਬਾ (ਸਕੇਅਰ ਫੁੱਟ)',
      bedsLabel: 'ਬੈੱਡਰੂਮ',
      bathsLabel: 'ਬਾਥਰੂਮ',
      conditionLabel: 'ਘਰ ਦੀ ਹਾਲਤ',
      sendReport: 'ਮੁਫ਼ਤ ਮੁਲਾਂਕਣ ਰਿਪੋਰਟ ਭੇਜੋ',
      estimatedRange: 'ਅੰਦਾਜ਼ਨ ਇੰਡੀਆਨਾ ਮਾਰਕੀਟ ਦਾਇਰਾ',
      cmaTitle: 'ਕੌਰ ਦੀ ਵਿਸਤ੍ਰਿਤ CMA ਰਿਪੋਰਟ ਪ੍ਰਾਪਤ ਕਰੋ',
      nameLabel: 'ਤੁਹਾਡਾ ਨਾਮ',
      phoneLabel: 'ਫ਼ੋਨ ਨੰਬਰ',
      emailLabel: 'ਈਮੇਲ ਪਤਾ',
    },
    investment: {
      kicker: '04. ਕਿਰਾਏ ਦੀ ਆਮਦਨ ਅਤੇ ਦੌਲਤ ਵਾਧਾ ਮਾਡਲ',
      title: 'ਇੰਡੀਆਨਾ ਰੀਅਲ ਅਸਟੇਟ ਨਿਵੇਸ਼ ਅਤੇ ROI ਕੈਲਕੁਲੇਟਰ',
      subtitle:
        'ਇੰਡੀਆਨਾ ਦਾ ਸਥਿਰ ਰੁਜ਼ਗਾਰ, ਘੱਟ ਪ੍ਰਾਪਰਟੀ ਟੈਕਸ ਅਤੇ 6%-9% ਕਿਰਾਏ ਦੀ ਯੀਲਡ ਇਸ ਨੂੰ ਨਿਵੇਸ਼ਕਾਂ ਲਈ ਪਹਿਲੀ ਪਸੰਦ ਬਣਾਉਂਦੀ ਹੈ।',
      purchasePrice: 'ਖਰੀਦ ਮੁੱਲ',
      downPayment: 'ਡਾਊਨ ਪੇਮੈਂਟ',
      monthlyRent: 'ਅੰਦਾਜ਼ਨ ਮਹੀਨਾਵਾਰ ਕਿਰਾਇਆ',
      monthlyCashFlow: 'ਸ਼ੁੱਧ ਮਹੀਨਾਵਾਰ ਕੈਸ਼ ਫਲੋ',
      capRate: 'ਅੰਦਾਜ਼ਨ ਕੈਪ ਰੇਟ',
      requestDeals: 'ਆਫ-ਮਾਰਕੀਟ ਨਿਵੇਸ਼ ਸੌਦਿਆਂ ਦੀ ਸੂਚੀ ਮੰਗੋ',
    },
    trust: {
      kicker: '05. ਸਾਡੀ ਇਮਾਨਦਾਰੀ ਅਤੇ ਭਰੋਸੇ ਦਾ ਵਾਅਦਾ',
      title: 'ਇਮਾਨਦਾਰੀ ਵਿੱਚ ਜੜ੍ਹਾਂ। ਜੋ ਤੁਹਾਡੇ ਲਈ ਜ਼ਰੂਰੀ ਹੈ, ਉਹੀ ਸਾਡਾ ਟੀਚਾ।',
      subtitle:
        'ਅਸੀਂ ਕਿਸੇ ਜਲਦਬਾਜ਼ੀ ਜਾਂ ਦਬਾਅ ਵਾਲੀ ਵਿਕਰੀ ਵਿੱਚ ਯਕੀਨ ਨਹੀਂ ਰੱਖਦੇ—ਸਿਰਫ਼ ਪਾਰਦਰਸ਼ੀ ਸਲਾਹ ਅਤੇ ਪਰਿਵਾਰਕ ਤਸੱਲੀ।',
      readyTitle: 'ਇੰਡੀਆਨਾ ਵਿੱਚ ਆਪਣੇ ਅਗਲੇ ਕਦਮ ਤੇ ਗੱਲਬਾਤ ਲਈ ਤਿਆਰ ਹੋ?',
      readySubtitle: 'ਗੁਪਤ ਅਤੇ ਬਿਨਾਂ ਕਿਸੇ ਸ਼ਰਤ ਦੀ ਸਲਾਹ ਲਈ ਸਿੱਧਾ ਸਾਨੂੰ (317) 408-9532 ਤੇ ਕਾਲ ਜਾਂ ਮੈਸੇਜ ਕਰੋ।',
    },
    stories: {
      kicker: 'ਅਸਲੀ ਪੰਜਾਬੀ ਅਤੇ ਭਾਰਤੀ ਪਰਿਵਾਰਾਂ ਦੀਆਂ ਕਲੋਜ਼ਿੰਗ ਕਹਾਣੀਆਂ',
      title: 'ਗਾਹਕਾਂ ਦੀ ਕਾਮਯਾਬੀ ਅਤੇ ਅਧਿਕਾਰਤ ਕਲੋਜ਼ਿੰਗ ਬਿਆਨ',
      subtitle:
        'ਕਾਰਮਲ, ਫਿਸ਼ਰਸ, ਏਵਨ ਅਤੇ ਜ਼ਾਇਨਸਵਿਲ ਵਿੱਚ ਸਾਡੇ ਪੰਜਾਬੀ ਅਤੇ ਭਾਰਤੀ ਭਾਈਚਾਰੇ ਦੀ ਸੇਵਾ ਪੰਜਾਬੀ, ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ।',
      closingResult: 'ਕਲੋਜ਼ਿੰਗ ਨਤੀਜਾ:',
      officialStatement: 'ਅਧਿਕਾਰਤ ਕਲੋਜ਼ਿੰਗ ਬਿਆਨ:',
      shareExperience: 'ਆਪਣਾ ਤਜਰਬਾ ਸਾਂਝਾ ਕਰੋ',
      multilingualNotice: 'ਸਾਰੇ ਇੰਡੀਆਨਾ ਘਰਾਂ ਦੀ ਖਰੀਦ-ਵੇਚ ਲਈ ਪੰਜਾਬੀ (ਪੰਜਾਬੀ), ਹਿੰਦੀ (हिन्दी) ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਸਲਾਹ ਉਪਲਬਧ ਹੈ।',
    },
    faq: {
      kicker: 'ਸਪੱਸ਼ਟ ਜਵਾਬ · ਕੋਈ ਔਖੀ ਸ਼ਬਦਾਵਲੀ ਨਹੀਂ',
      title: 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ',
      subtitle: 'ਇੰਡੀਆਨਾ ਵਿੱਚ ਘਰ ਖਰੀਦਣ, ਵੇਚਣ ਅਤੇ ਆਪਣੀ ਲੋੜ ਮੁਤਾਬਕ ਕੰਮ ਕਰਨ ਬਾਰੇ ਹਰ ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀ।',
      haveQuestion: 'ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਕੋਈ ਖ਼ਾਸ ਸਵਾਲ ਹੈ?',
      askOnline: 'ਆਨਲਾਈਨ ਪੁੱਛੋ',
    },
    contact: {
      kicker: '06. ਆਪਣੇ ਰੀਅਲ ਅਸਟੇਟ ਸਲਾਹਕਾਰ ਨਾਲ ਜੁੜੋ',
      title: 'ਆਓ ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰੀਏ',
      subtitle: 'ਚਾਹੇ ਕਿਸੇ ਸਕੂਲ ਬਾਰੇ ਮਾਮੂਲੀ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ ਜਾਂ ਘਰ ਵੇਚਣ ਦੀ ਪੂਰੀ ਸਕੀਮ—ਕੌਰ ਤੁਹਾਡੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੈ।',
      directLine: 'ਸਿੱਧਾ ਨੰਬਰ',
      formTitle: 'ਆਹਮੋ-ਸਾਹਮਣੇ ਸਲਾਹ-ਮਸ਼ਵਰਾ ਬੁੱਕ ਕਰੋ',
      formSubtitle: 'ਸਾਨੂੰ ਆਪਣੇ ਸਮੇਂ ਅਤੇ ਪਸੰਦ ਬਾਰੇ ਦੱਸੋ। ਕੌਰ ਕੁਝ ਹੀ ਘੰਟਿਆਂ ਵਿੱਚ ਤੁਹਾਡੇ ਨਾਲ ਰਾਬਤਾ ਕਰੇਗੀ।',
      nameLabel: 'ਪੂਰਾ ਨਾਮ *',
      phoneLabel: 'ਫ਼ੋਨ ਨੰਬਰ *',
      emailLabel: 'ਈਮੇਲ ਪਤਾ',
      serviceLabel: 'ਲੋੜੀਂਦੀ ਸੇਵਾ',
      communityLabel: 'ਪਸੰਦੀਦਾ ਇੰਡੀਆਨਾ ਇਲਾਕਾ',
      timelineLabel: 'ਸਮਾਂ ਸੀਮਾ',
      submitButton: 'ਸਲਾਹ ਬੇਨਤੀ ਭੇਜੋ',
    },
    footer: {
      slogan: 'ਤੁਹਾਡਾ ਭਰੋਸੇਮੰਦ ਰੀਅਲਟਰ · ਇੰਡੀਆਨਾ',
      servicesHeader: 'ਸੇਵਾਵਾਂ',
      communitiesHeader: 'ਮੁੱਖ ਇਲਾਕੇ',
      connectHeader: 'ਸਿੱਧਾ ਸੰਪਰਕ',
      equalHousing: 'ਬਰਾਬਰ ਰਿਹਾਇਸ਼ੀ ਮੌਕਾ · ਇੰਡੀਆਨਾ ਰੀਅਲ ਅਸਟੇਟ ਸੇਵਾਵਾਂ',
      allRightsReserved: 'ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',
    },
  },
};
