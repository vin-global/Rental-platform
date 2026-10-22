// Mock data for SMART-AI House Rental
// Contains high quality verified properties across major hubs (Port Harcourt, Lagos Lekki/Ikoyi/Ikeja, Abuja Maitama/Jabi, Ibadan, Enugu)

export const MOCK_PROPERTIES = [
  {
    id: "prop-1",
    title: "Luxury 2-Bedroom Serviced Apartment with Smart Home Tech",
    slug: "luxury-2bed-serviced-apartment-port-harcourt",
    propertyType: "Apartment",
    furnishing: "Furnished",
    price: 1450000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "14 Peter Odili Road, Trans-Amadi",
      city: "Port Harcourt",
      state: "Rivers State",
      neighborhood: "Peter Odili / Trans-Amadi",
      lat: 4.8156,
      lng: 7.0498,
      commuteInfo: "12 mins to GRA Phase 2, 25 mins to Port Harcourt Int. Airport"
    },
    specs: {
      bedrooms: 2,
      bathrooms: 2,
      toilets: 3,
      sizeSqft: 1350,
      parkingSpaces: 2,
      floorNumber: 3,
      totalFloors: 5,
      yearBuilt: 2023
    },
    verificationStatus: "Verified", // "Verified" | "Pending" | "Unverified"
    isFeatured: true,
    isNewlyListed: true,
    availability: "Available Now",
    depositRequired: 200000,
    serviceCharge: 150000,
    images: [
      "/properties/property-bungalow-steps.jpg",
      "/properties/property-living-dining.jpg",
      "/properties/property-living-room.jpg",
      "/properties/property-master-bedroom.jpg"
    ],
    amenities: [
      "Parking",
      "24/7 Security",
      "Solar Power Backup",
      "High-Speed Internet",
      "Swimming Pool",
      "Air Conditioning",
      "CCTV Surveillance",
      "Water Treatment Plant",
      "Gym / Fitness Center",
      "Balcony"
    ],
    description: "Experience modern elegance in this fully serviced 2-bedroom apartment located in the prime Peter Odili corridor of Port Harcourt. Features state-of-the-art smart lighting, pre-installed fiber-optic broadband, 24/7 backup solar hybrid power, and dedicated double parking. Ideal for tech professionals and young families seeking comfort and safety.",
    aiSummary: {
      matchHighlight: "Top Pick: 98% match for budget under ₦1.5M in Port Harcourt with dedicated parking",
      safetyScore: 9.4,
      affordabilityRating: "High Value for Money",
      commuteRating: "Excellent Access to Major Commercial Hubs",
      noiseLevel: "Low / Serene Residential Enclave",
      pros: [
        "24/7 Solar hybrid backup guarantees uninterrupted power",
        "Includes 2 dedicated secure parking spaces",
        "Treated automated borehole water system",
        "Close proximity to top schools and shopping malls"
      ],
      cons: [
        "Annual service charge billed separately",
        "No pets allowed on premises"
      ]
    },
    agent: {
      name: "Chukwudi Nwosu",
      agency: "PrimeShield Realty & Asset Management",
      avatar: "/avatars/avatar-2.svg",
      phone: "+234 803 456 7890",
      email: "chukwudi.n@primeshield.ng",
      badge: "Verified Top Agent",
      rating: 4.9,
      reviewCount: 38,
      verifiedDate: "Jan 2024"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Tariere Briggs",
        rating: 5,
        date: "2 weeks ago",
        comment: "Inspected and finalized my lease here last week! The solar power system is legit, haven't had a single blackout. Agent Chukwudi was super professional."
      },
      {
        id: "rev-2",
        author: "Dr. Okey Amadi",
        rating: 5,
        date: "1 month ago",
        comment: "Serene compound and top-notch security guards. Very quiet environment perfect for remote work."
      }
    ],
    viewsCount: 1420,
    favoritesCount: 89,
    createdAt: "2026-08-01"
  },
  {
    id: "prop-2",
    title: "Contemporary 4-Bedroom Semi-Detached Duplex with BQ",
    slug: "4bed-duplex-lekkiphase1-lagos",
    propertyType: "Duplex",
    furnishing: "Semi-Furnished",
    price: 6500000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "Block 8, Admiralty Way, Lekki Phase 1",
      city: "Lagos",
      state: "Lagos State",
      neighborhood: "Lekki Phase 1",
      lat: 6.4474,
      lng: 3.4731,
      commuteInfo: "5 mins to Lekki-Ikoyi Link Bridge, 15 mins to Victoria Island"
    },
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      toilets: 5,
      sizeSqft: 2800,
      parkingSpaces: 4,
      floorNumber: 1,
      totalFloors: 2,
      yearBuilt: 2024
    },
    verificationStatus: "Verified",
    isFeatured: true,
    isNewlyListed: false,
    availability: "Available Now",
    depositRequired: 500000,
    serviceCharge: 600000,
    images: [
      "/properties/property-living-dining.jpg",
      "/properties/property-master-bedroom.jpg",
      "/properties/property-living-room.jpg",
      "/properties/property-bungalow-steps.jpg"
    ],
    amenities: [
      "Parking",
      "24/7 Security",
      "Swimming Pool",
      "Solar Power Backup",
      "Boys Quarters (BQ)",
      "Fully Fitted Kitchen",
      "CCTV Surveillance",
      "Automated Gate",
      "Kids Play Area",
      "Walk-in Closet"
    ],
    description: "An architectural masterpiece in prestigious Lekki Phase 1. Features marble flooring, custom high-ceiling chandeliers, ultra-modern Italian kitchen with heat extractor and microwave, private en-suite BQ, and an expansive 4-car interlocked compound.",
    aiSummary: {
      matchHighlight: "Luxury Family Haven: 96% match for executive family living with quick Victoria Island commute",
      safetyScore: 9.8,
      affordabilityRating: "Premium Class",
      commuteRating: "Prime Access to Lekki-Ikoyi Link Bridge",
      noiseLevel: "Controlled Access Gate / Minimal Traffic",
      pros: [
        "Spacious compound with 4-car parking",
        "Includes self-contained BQ for staff or guest",
        "Walk-in closets and rainfall shower in Master suite",
        "24-hour estate armed security patrol"
      ],
      cons: [
        "Premium tier pricing",
        "Higher service charge during rainy season maintenance"
      ]
    },
    agent: {
      name: "Folake Adeleke",
      agency: "Haven Heights Properties Ltd",
      avatar: "/avatars/avatar-3.svg",
      phone: "+234 812 345 6789",
      email: "folake@havenheights.ng",
      badge: "Verified Diamond Broker",
      rating: 5.0,
      reviewCount: 64,
      verifiedDate: "Aug 2023"
    },
    reviews: [
      {
        id: "rev-21",
        author: "Engr. Babatunde Sanusi",
        rating: 5,
        date: "3 weeks ago",
        comment: "Inspected the duplex with my family. The finishings are genuinely European standard and the street is free from flood."
      }
    ],
    viewsCount: 2310,
    favoritesCount: 174,
    createdAt: "2026-07-20"
  },
  {
    id: "prop-3",
    title: "Executive 3-Bedroom Penthouse with Panoramic City Views",
    slug: "3bed-penthouse-maitama-abuja",
    propertyType: "Penthouse",
    furnishing: "Furnished",
    price: 8500000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "Plot 42 Aguiyi Ironsi Street, Maitama",
      city: "Abuja",
      state: "FCT",
      neighborhood: "Maitama Diplomatic Zone",
      lat: 9.0820,
      lng: 7.4984,
      commuteInfo: "5 mins to Central Business District, 10 mins to Aso Rock Villa"
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      toilets: 4,
      sizeSqft: 2200,
      parkingSpaces: 3,
      floorNumber: 7,
      totalFloors: 7,
      yearBuilt: 2024
    },
    verificationStatus: "Verified",
    isFeatured: true,
    isNewlyListed: true,
    availability: "Available Now",
    depositRequired: 800000,
    serviceCharge: 1200000,
    images: [
      "/properties/property-living-room.jpg",
      "/properties/property-living-dining.jpg",
      "/properties/property-master-bedroom.jpg",
      "/properties/property-bungalow-scallop.jpg"
    ],
    amenities: [
      "Private Rooftop Terrace",
      "Elevator / Lift",
      "24/7 Security",
      "Swimming Pool",
      "High-Speed Internet",
      "Gym / Fitness Center",
      "Smart Home Automation",
      "Dedicated Concierge",
      "Covered Parking",
      "Wine Cellar"
    ],
    description: "Perched atop the premier residential tower in Maitama, this breathtaking 3-bedroom penthouse offers 360-degree views over Abuja's skyline. Equipped with private keyed elevator access, custom Italian kitchen with wine cooler, expansive wrap-around terrace, and round-the-clock concierge services.",
    aiSummary: {
      matchHighlight: "Diplomatic Tier: 99% match for diplomats, expats, and C-level executives seeking elite comfort in Abuja",
      safetyScore: 9.9,
      affordabilityRating: "Ultra Luxury",
      commuteRating: "Adjacent to Central Business District & Embassies",
      noiseLevel: "Ultra Quiet / Sound-insulated Double Glazing",
      pros: [
        "Private direct elevator entry",
        "Spectacular wrap-around private terrace",
        "24/7 dual generator + solar grid power assurance",
        "Dedicated VIP concierge and biometric access control"
      ],
      cons: [
        "High annual service charge reflecting 5-star building amenities"
      ]
    },
    agent: {
      name: "Aliyu Usman",
      agency: "Capital Apex Real Estate",
      avatar: "/avatars/avatar-2.svg",
      phone: "+234 809 111 2233",
      email: "aliyu@capitalapex.ng",
      badge: "Verified Government & Diplomatic Realtor",
      rating: 4.9,
      reviewCount: 49,
      verifiedDate: "Nov 2023"
    },
    reviews: [
      {
        id: "rev-31",
        author: "Victoria Sterling",
        rating: 5,
        date: "2 months ago",
        comment: "Hands down the most luxurious penthouse in Abuja. The sunset views over the hills are magical."
      }
    ],
    viewsCount: 3105,
    favoritesCount: 245,
    createdAt: "2026-08-05"
  },
  {
    id: "prop-4",
    title: "Charming 1-Bedroom Studio Apartment in Tech Hub",
    slug: "1bed-studio-yaba-lagos",
    propertyType: "Studio",
    furnishing: "Furnished",
    price: 950000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "Herbert Macaulay Way, Alagomeji, Yaba",
      city: "Lagos",
      state: "Lagos State",
      neighborhood: "Yaba Tech Corridor",
      lat: 6.5059,
      lng: 3.3785,
      commuteInfo: "3 mins to Tech startups / co-working hubs, 10 mins to UNILAG"
    },
    specs: {
      bedrooms: 1,
      bathrooms: 1,
      toilets: 1,
      sizeSqft: 650,
      parkingSpaces: 1,
      floorNumber: 2,
      totalFloors: 4,
      yearBuilt: 2023
    },
    verificationStatus: "Verified",
    isFeatured: false,
    isNewlyListed: true,
    availability: "Available Now",
    depositRequired: 100000,
    serviceCharge: 80000,
    images: [
      "/properties/property-master-bedroom.jpg",
      "/properties/property-living-dining.jpg",
      "/properties/property-living-room.jpg"
    ],
    amenities: [
      "High-Speed Internet",
      "Workstation Desk",
      "Solar Power Backup",
      "Air Conditioning",
      "24/7 Security",
      "Water Heater",
      "Smart Lock Access",
      "Kitchenette"
    ],
    description: "Designed specifically for digital nomads, remote developers, and creatives. Features ultra-fast dedicated fiber internet, standing workstation desk, backup solar inverter, smart keyless code entry, and easy access to Yaba's vibrant tech cafes.",
    aiSummary: {
      matchHighlight: "Remote Work Optimized: 95% match for software engineers, freelancers, and single professionals under ₦1M",
      safetyScore: 8.9,
      affordabilityRating: "Great Budget Choice",
      commuteRating: "Heart of Mainland Tech District",
      noiseLevel: "Medium / Double acoustic windows installed",
      pros: [
        "Extremely affordable entry price under ₦1,000,000",
        "Includes dedicated fiber internet connection",
        "Smart keyless keypad door locks",
        "Low utility and maintenance costs"
      ],
      cons: [
        "Compact floor plan best suited for single occupant",
        "Single dedicated parking slot"
      ]
    },
    agent: {
      name: "Damilola Bakare",
      agency: "Urban Nest Realty",
      avatar: "/avatars/avatar-4.svg",
      phone: "+234 802 998 7766",
      email: "dami@urbannest.ng",
      badge: "Verified Local Specialist",
      rating: 4.8,
      reviewCount: 29,
      verifiedDate: "May 2024"
    },
    reviews: [
      {
        id: "rev-41",
        author: "Kelechi Obi",
        rating: 5,
        date: "1 month ago",
        comment: "Perfect studio for remote coding. The fiber internet tested at 85 Mbps and the solar never dropped."
      }
    ],
    viewsCount: 1890,
    favoritesCount: 112,
    createdAt: "2026-08-10"
  },
  {
    id: "prop-5",
    title: "Elegant 3-Bedroom Fully Detached Bungalow with Green Garden",
    slug: "3bed-bungalow-bodija-ibadan",
    propertyType: "Bungalow",
    furnishing: "Unfurnished",
    price: 1800000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "Old Bodija Estate, Near UI Gate",
      city: "Ibadan",
      state: "Oyo State",
      neighborhood: "Old Bodija",
      lat: 7.4223,
      lng: 3.9059,
      commuteInfo: "8 mins to University of Ibadan, 15 mins to Ring Road Mall"
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      toilets: 4,
      sizeSqft: 2100,
      parkingSpaces: 4,
      floorNumber: 1,
      totalFloors: 1,
      yearBuilt: 2022
    },
    verificationStatus: "Verified",
    isFeatured: false,
    isNewlyListed: true,
    availability: "Available Now",
    depositRequired: 200000,
    serviceCharge: 100000,
    images: [
      "/properties/property-bungalow-scallop.jpg",
      "/properties/property-living-room.jpg",
      "/properties/property-master-bedroom.jpg",
      "/properties/property-bungalow-steps.jpg"
    ],
    amenities: [
      "Private Garden & Lawn",
      "Parking",
      "24/7 Security",
      "Water Treatment Plant",
      "Pet Friendly",
      "Solar Power Backup",
      "CCTV Surveillance",
      "Perimeter Fencing"
    ],
    description: "A serene and spacious 3-bedroom detached bungalow nestled in prime Old Bodija. Boasting a lush green garden lawn, private paved driveway for 4 vehicles, expansive living room, and pet-friendly grounds. Perfect for families looking for peaceful space.",
    aiSummary: {
      matchHighlight: "Serene & Green: 94% match for families seeking ground-floor living with lush garden & pet space",
      safetyScore: 9.3,
      affordabilityRating: "Outstanding Value for Land Size",
      commuteRating: "Easy Highway Access",
      noiseLevel: "Extremely Quiet / Nature Ambiance",
      pros: [
        "Private fenced green yard with fruit trees",
        "Large compound accommodating 4+ SUVs",
        "Solid borehole water system with multi-stage filtration",
        "Pet friendly property"
      ],
      cons: [
        "Unfurnished — tenant provides own interior furniture"
      ]
    },
    agent: {
      name: "Olumide Ajayi",
      agency: "Heritage Prime Properties",
      avatar: "/avatars/avatar-5.svg",
      phone: "+234 803 777 4455",
      email: "olumide@heritageprime.ng",
      badge: "Verified Senior Agent",
      rating: 4.9,
      reviewCount: 42,
      verifiedDate: "Sep 2023"
    },
    reviews: [
      {
        id: "rev-51",
        author: "Prof. Grace Adeleke",
        rating: 5,
        date: "1 month ago",
        comment: "Impressed by the garden and generous room sizes. The neighborhood is very secure with active resident association."
      }
    ],
    viewsCount: 1620,
    favoritesCount: 95,
    createdAt: "2026-08-08"
  },
  {
    id: "prop-6",
    title: "Ultra-Modern 2-Bedroom Waterfront Flat with Marina Access",
    slug: "2bed-waterfront-flat-victoria-island-lagos",
    propertyType: "Apartment",
    furnishing: "Furnished",
    price: 4800000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "Ozumba Mbadiwe Avenue, Victoria Island",
      city: "Lagos",
      state: "Lagos State",
      neighborhood: "Victoria Island Waterfront",
      lat: 6.4281,
      lng: 3.4219,
      commuteInfo: "2 mins to Eko Hotels, 5 mins to Ikoyi commercial district"
    },
    specs: {
      bedrooms: 2,
      bathrooms: 2,
      toilets: 3,
      sizeSqft: 1400,
      parkingSpaces: 2,
      floorNumber: 4,
      totalFloors: 8,
      yearBuilt: 2024
    },
    verificationStatus: "Verified",
    isFeatured: true,
    isNewlyListed: false,
    availability: "Available Now",
    depositRequired: 400000,
    serviceCharge: 500000,
    images: [
      "/properties/property-living-dining.jpg",
      "/properties/property-master-bedroom.jpg",
      "/properties/property-living-room.jpg"
    ],
    amenities: [
      "Waterfront View",
      "Infinity Swimming Pool",
      "24/7 Security",
      "Gym / Fitness Center",
      "Elevator / Lift",
      "High-Speed Internet",
      "Solar Power Backup",
      "Private Boat Jetty Access",
      "Underground Parking"
    ],
    description: "Wake up to stunning lagoon breezes in this luxury 2-bedroom waterfront sanctuary on Ozumba Mbadiwe. Enjoy infinity pool access overlooking the yacht club, 24/7 uninterrupted power, gym facilities, and world-class fine dining within walking distance.",
    aiSummary: {
      matchHighlight: "Lagoon View Oasis: 97% match for lifestyle seekers and corporate executives in Victoria Island",
      safetyScore: 9.7,
      affordabilityRating: "High-End Luxury",
      commuteRating: "Instant Access to VI & Marina Business Districts",
      noiseLevel: "Low / Lagoon Breeze Acoustics",
      pros: [
        "Unobstructed waterfront views from living room and bedroom",
        "Infinity swimming pool and top-tier fitness gym",
        "Private boat jetty access",
        "Full 24/7 power guarantee with dual Caterpillar diesel generators"
      ],
      cons: [
        "Strict building guest policy after 10 PM"
      ]
    },
    agent: {
      name: "Folake Adeleke",
      agency: "Haven Heights Properties Ltd",
      avatar: "/avatars/avatar-3.svg",
      phone: "+234 812 345 6789",
      email: "folake@havenheights.ng",
      badge: "Verified Diamond Broker",
      rating: 5.0,
      reviewCount: 64,
      verifiedDate: "Aug 2023"
    },
    reviews: [
      {
        id: "rev-61",
        author: "Marcus Chen",
        rating: 5,
        date: "1 month ago",
        comment: "Spectacular views, flawless security, and the gym is state-of-the-art. Highly recommended."
      }
    ],
    viewsCount: 2840,
    favoritesCount: 198,
    createdAt: "2026-07-28"
  },
  {
    id: "prop-7",
    title: "Spacious 3-Bedroom Flat in Gated GRA Neighborhood",
    slug: "3bed-flat-gra-enugu",
    propertyType: "Apartment",
    furnishing: "Semi-Furnished",
    price: 1300000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "12 Park Avenue, GRA",
      city: "Enugu",
      state: "Enugu State",
      neighborhood: "Enugu GRA",
      lat: 6.4584,
      lng: 7.5464,
      commuteInfo: "5 mins to Polo Park Mall, 10 mins to Akanu Ibiam Airport"
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      toilets: 4,
      sizeSqft: 1600,
      parkingSpaces: 2,
      floorNumber: 1,
      totalFloors: 3,
      yearBuilt: 2023
    },
    verificationStatus: "Verified",
    isFeatured: false,
    isNewlyListed: true,
    availability: "Available Now",
    depositRequired: 150000,
    serviceCharge: 120000,
    images: [
      "/properties/property-bungalow-steps.jpg",
      "/properties/property-master-bedroom.jpg",
      "/properties/property-living-room.jpg"
    ],
    amenities: [
      "Parking",
      "24/7 Security",
      "Borehole Water Treatment",
      "Solar Power Backup",
      "Balcony",
      "CCTV Surveillance",
      "Fitted Wardrobes"
    ],
    description: "Located in the quiet and prestigious GRA Enugu, this 3-bedroom flat delivers exceptional living comfort with spacious tiled living areas, cross-ventilation balconies, round-the-clock security guards, and constant treated water supply.",
    aiSummary: {
      matchHighlight: "Value & Serenity: 93% match for quiet residential living under ₦1.5M in East region",
      safetyScore: 9.5,
      affordabilityRating: "High Affordability Index",
      commuteRating: "Central GRA Accessibility",
      noiseLevel: "Very Quiet / Tree-lined Avenue",
      pros: [
        "Located in Enugu's safest residential zone",
        "Generous room dimensions with en-suite baths",
        "Low utility cost structure"
      ],
      cons: [
        "No shared swimming pool"
      ]
    },
    agent: {
      name: "Emeka Okafor",
      agency: "Coal City Prime Estates",
      avatar: "/avatars/avatar-1.svg",
      phone: "+234 806 888 1234",
      email: "emeka@coalcityestates.ng",
      badge: "Verified Regional Partner",
      rating: 4.7,
      reviewCount: 31,
      verifiedDate: "Feb 2024"
    },
    reviews: [
      {
        id: "rev-71",
        author: "Chioma Nnamani",
        rating: 5,
        date: "3 weeks ago",
        comment: "The rooms are very big and airy. Water runs 24/7 without interruption."
      }
    ],
    viewsCount: 1150,
    favoritesCount: 68,
    createdAt: "2026-08-12"
  },
  {
    id: "prop-8",
    title: "Grand 5-Bedroom Luxury Villa with Private Pool & Cinema Room",
    slug: "5bed-luxury-villa-banana-island-lagos",
    propertyType: "Villa",
    furnishing: "Furnished",
    price: 18000000,
    pricePeriod: "year",
    currency: "NGN",
    location: {
      address: "Zone E, Ocean Parade, Banana Island, Ikoyi",
      city: "Lagos",
      state: "Lagos State",
      neighborhood: "Banana Island Ikoyi",
      lat: 6.4568,
      lng: 3.4411,
      commuteInfo: "Private helipad within estate, 5 mins to Ikoyi Club"
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      toilets: 7,
      sizeSqft: 4500,
      parkingSpaces: 6,
      floorNumber: 1,
      totalFloors: 3,
      yearBuilt: 2024
    },
    verificationStatus: "Verified",
    isFeatured: true,
    isNewlyListed: false,
    availability: "Available Now",
    depositRequired: 1500000,
    serviceCharge: 2000000,
    images: [
      "/properties/property-bungalow-scallop.jpg",
      "/properties/property-bungalow-steps.jpg",
      "/properties/property-living-dining.jpg",
      "/properties/property-master-bedroom.jpg"
    ],
    amenities: [
      "Private Swimming Pool",
      "Private Cinema Room",
      "24/7 Security",
      "Smart Home Automation",
      "Solar Power Backup",
      "Private Gym",
      "2-Room Staff Quarters",
      "Elevator / Lift",
      "Wine Cellar",
      "CCTV & Armed Patrol",
      "High-Speed Internet"
    ],
    description: "The pinnacle of Nigerian luxury real estate in Africa's most exclusive enclave. Features a custom private infinity swimming pool, 8-seat Dolby Atmos sound cinema, elevator to all 3 floors, smart motorized blinds, and 6-car executive garage.",
    aiSummary: {
      matchHighlight: "Bespoke Royal Tier: 100% match for ultra-high-net-worth individuals and corporate delegations",
      safetyScore: 10.0,
      affordabilityRating: "Ultra Luxury",
      commuteRating: "Fast Boat/Helipad Options",
      noiseLevel: "Silent Sanctuary",
      pros: [
        "Private swimming pool and dedicated cinema hall",
        "Banana Island's unmatched military-grade gate security",
        "Includes two self-contained staff quarters",
        "Full solar micro-grid redundancy"
      ],
      cons: [
        "Strict estate visitor pre-clearance gate code required"
      ]
    },
    agent: {
      name: "Folake Adeleke",
      agency: "Haven Heights Properties Ltd",
      avatar: "/avatars/avatar-2.svg",
      phone: "+234 812 345 6789",
      email: "folake@havenheights.ng",
      badge: "Verified Diamond Broker",
      rating: 5.0,
      reviewCount: 64,
      verifiedDate: "Aug 2023"
    },
    reviews: [
      {
        id: "rev-81",
        author: "Femi Otedola (Associate)",
        rating: 5,
        date: "1 month ago",
        comment: "Unmatched estate infrastructure. The private cinema and pool finishings are world-class."
      }
    ],
    viewsCount: 4890,
    favoritesCount: 412,
    createdAt: "2026-07-15"
  }
];

export const POPULAR_LOCATIONS = [
  {
    name: "Port Harcourt",
    state: "Rivers State",
    image: "/properties/property-bungalow-steps.jpg",
    propertyCount: 142,
    avgPrice: "₦1.8M/yr",
    popularAreas: ["Peter Odili Road", "GRA Phase 2", "Woji", "Ada George"]
  },
  {
    name: "Lagos (Lekki / Ikoyi / VI)",
    state: "Lagos State",
    image: "/properties/property-living-dining.jpg",
    propertyCount: 384,
    avgPrice: "₦4.5M/yr",
    popularAreas: ["Lekki Phase 1", "Victoria Island", "Ikoyi", "Chevron"]
  },
  {
    name: "Abuja (Maitama / Jabi)",
    state: "Federal Capital Territory",
    image: "/properties/property-living-room.jpg",
    propertyCount: 215,
    avgPrice: "₦3.2M/yr",
    popularAreas: ["Maitama", "Wuse 2", "Jabi Lake", "Guzape"]
  },
  {
    name: "Ibadan (Bodija / Ring Rd)",
    state: "Oyo State",
    image: "/properties/property-bungalow-scallop.jpg",
    propertyCount: 96,
    avgPrice: "₦1.4M/yr",
    popularAreas: ["Old Bodija", "Iyaganku GRA", "Alalubosa", "Akobo"]
  },
  {
    name: "Enugu (GRA / Independence Layout)",
    state: "Enugu State",
    image: "/properties/property-master-bedroom.jpg",
    propertyCount: 78,
    avgPrice: "₦1.2M/yr",
    popularAreas: ["Enugu GRA", "Independence Layout", "New Haven", "Trans Ekulu"]
  }
];

export const AMENITIES_LIST = [
  "Parking",
  "24/7 Security",
  "Solar Power Backup",
  "High-Speed Internet",
  "Swimming Pool",
  "Air Conditioning",
  "Gym / Fitness Center",
  "CCTV Surveillance",
  "Water Treatment Plant",
  "Furnished",
  "Balcony",
  "Pet Friendly",
  "Elevator / Lift",
  "Kids Play Area",
  "Boys Quarters (BQ)"
];

export const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "Duplex",
  "Penthouse",
  "Bungalow",
  "Studio",
  "Villa"
];
