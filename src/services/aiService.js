// AI Service Layer for SMART-AI House Rental
// Implements NLP search parser, Matchmaker scoring, Affordability guidance, and AI Assistant reasoning

/**
 * Natural Language Search Parser
 * Transforms queries like "Find me a 2-bedroom apartment in Port Harcourt under ₦1.5 million with parking"
 * into structured filter objects.
 */
export function parseNaturalLanguageQuery(query) {
  if (!query || typeof query !== "string") return null;

  const normalized = query.toLowerCase().trim();
  const extracted = {
    rawQuery: query,
    bedrooms: null,
    bathrooms: null,
    propertyType: null,
    location: null,
    maxPrice: null,
    minPrice: null,
    amenities: [],
    furnishing: null,
    intentTags: []
  };

  // 1. Bedroom extraction (e.g., "2-bedroom", "2 bedroom", "2 bed", "2bed", "two bedroom")
  const bedPatterns = [
    { regex: /(\d+)\s*(?:-| )?(?:bed|bedroom|bdr|bd)/i, parser: (m) => parseInt(m[1], 10) },
    { regex: /(?:one|single)\s*(?:-| )?(?:bed|bedroom)/i, parser: () => 1 },
    { regex: /(?:two|double)\s*(?:-| )?(?:bed|bedroom)/i, parser: () => 2 },
    { regex: /(?:three)\s*(?:-| )?(?:bed|bedroom)/i, parser: () => 3 },
    { regex: /(?:four)\s*(?:-| )?(?:bed|bedroom)/i, parser: () => 4 },
    { regex: /(?:five)\s*(?:-| )?(?:bed|bedroom)/i, parser: () => 5 }
  ];

  for (const p of bedPatterns) {
    const match = normalized.match(p.regex);
    if (match) {
      extracted.bedrooms = p.parser(match);
      extracted.intentTags.push(`${extracted.bedrooms} Bedrooms`);
      break;
    }
  }

  // 2. Property Type extraction
  const types = ["apartment", "duplex", "penthouse", "bungalow", "studio", "villa", "flat", "terrace"];
  for (const t of types) {
    if (normalized.includes(t)) {
      if (t === "flat") {
        extracted.propertyType = "Apartment";
      } else {
        extracted.propertyType = t.charAt(0).toUpperCase() + t.slice(1);
      }
      extracted.intentTags.push(extracted.propertyType);
      break;
    }
  }

  // 3. Location extraction (Cities & popular neighborhoods)
  const locations = [
    { key: "port harcourt", label: "Port Harcourt" },
    { key: "ph", label: "Port Harcourt" },
    { key: "peter odili", label: "Port Harcourt" },
    { key: "trans-amadi", label: "Port Harcourt" },
    { key: "lekki", label: "Lagos" },
    { key: "ikoyi", label: "Lagos" },
    { key: "victoria island", label: "Lagos" },
    { key: "vi", label: "Lagos" },
    { key: "yaba", label: "Lagos" },
    { key: "ikeja", label: "Lagos" },
    { key: "banana island", label: "Lagos" },
    { key: "lagos", label: "Lagos" },
    { key: "abuja", label: "Abuja" },
    { key: "maitama", label: "Abuja" },
    { key: "wuse", label: "Abuja" },
    { key: "jabi", label: "Abuja" },
    { key: "ibadan", label: "Ibadan" },
    { key: "bodija", label: "Ibadan" },
    { key: "enugu", label: "Enugu" }
  ];

  for (const loc of locations) {
    if (normalized.includes(loc.key)) {
      extracted.location = loc.label;
      extracted.intentTags.push(loc.label);
      break;
    }
  }

  // 4. Max Price extraction (e.g. "under 1.5 million", "under ₦1.5m", "below 2m", "max 3000000", "< 1500000")
  const priceRegexes = [
    // "under 1.5 million", "under 1.5m", "below 2 million", "less than 1.5m"
    /(?:under|below|less than|max|up to|budget of|within|capped at)\s*(?:₦|ngn|n)?\s*(\d+(?:\.\d+)?)\s*(?:million|m|mil)/i,
    // "under 1,500,000" or "under 1500000"
    /(?:under|below|less than|max|up to|budget of|within|capped at)\s*(?:₦|ngn|n)?\s*([\d,]+(?:\.\d+)?)/i,
    // "1.5m" anywhere
    /(?:₦|ngn)?\s*(\d+(?:\.\d+)?)\s*(?:million|m)\s*(?:budget|max|limit)?/i
  ];

  for (let i = 0; i < priceRegexes.length; i++) {
    const match = normalized.match(priceRegexes[i]);
    if (match) {
      const numStr = match[1].replace(/,/g, "");
      const num = parseFloat(numStr);
      if (!isNaN(num)) {
        if (i === 0 || (i === 2 && num < 1000)) {
          // Million multiplier
          extracted.maxPrice = num * 1000000;
        } else {
          extracted.maxPrice = num;
        }
        extracted.intentTags.push(`Max ₦${(extracted.maxPrice).toLocaleString()}`);
        break;
      }
    }
  }

  // 5. Amenities extraction
  const amenityMap = [
    { words: ["parking", "garage", "car park"], tag: "Parking" },
    { words: ["security", "guarded", "gated", "cctv"], tag: "24/7 Security" },
    { words: ["solar", "inverter", "backup power", "generator", "uninterrupted power"], tag: "Solar Power Backup" },
    { words: ["internet", "wifi", "fiber", "broadband"], tag: "High-Speed Internet" },
    { words: ["pool", "swimming pool"], tag: "Swimming Pool" },
    { words: ["gym", "fitness"], tag: "Gym / Fitness Center" },
    { words: ["water", "borehole", "treated water"], tag: "Water Treatment Plant" },
    { words: ["bq", "boys quarters"], tag: "Boys Quarters (BQ)" },
    { words: ["ac", "air condition", "aircon"], tag: "Air Conditioning" },
    { words: ["pet", "pets"], tag: "Pet Friendly" }
  ];

  for (const item of amenityMap) {
    if (item.words.some(w => normalized.includes(w))) {
      extracted.amenities.push(item.tag);
      extracted.intentTags.push(item.tag);
    }
  }

  // 6. Furnishing
  if (normalized.includes("furnished") && !normalized.includes("unfurnished")) {
    extracted.furnishing = "Furnished";
    extracted.intentTags.push("Furnished");
  } else if (normalized.includes("unfurnished")) {
    extracted.furnishing = "Unfurnished";
    extracted.intentTags.push("Unfurnished");
  }

  return extracted;
}

/**
 * Filter properties by natural language parsed criteria or manual filters
 */
export function filterProperties(properties, criteria) {
  if (!properties || !Array.isArray(properties)) return [];
  if (!criteria) return properties;

  return properties.filter((property) => {
    // 1. Location match
    if (criteria.location && criteria.location !== "All Locations") {
      const propCity = property.location.city.toLowerCase();
      const propState = property.location.state.toLowerCase();
      const propAddress = property.location.address.toLowerCase();
      const targetLoc = criteria.location.toLowerCase();

      const matchesLocation = propCity.includes(targetLoc) ||
        propState.includes(targetLoc) ||
        propAddress.includes(targetLoc) ||
        targetLoc.includes(propCity);

      if (!matchesLocation) return false;
    }

    // 2. Property Type
    if (criteria.propertyType && criteria.propertyType !== "All Types") {
      if (property.propertyType.toLowerCase() !== criteria.propertyType.toLowerCase()) {
        return false;
      }
    }

    // 3. Bedrooms (exact or min)
    if (criteria.bedrooms && criteria.bedrooms !== "any" && criteria.bedrooms !== "Any") {
      const requiredBeds = parseInt(criteria.bedrooms, 10);
      if (!isNaN(requiredBeds) && property.specs.bedrooms !== requiredBeds) {
        return false;
      }
    }

    // 4. Bathrooms
    if (criteria.bathrooms && criteria.bathrooms !== "any") {
      const reqBaths = parseInt(criteria.bathrooms, 10);
      if (!isNaN(reqBaths) && property.specs.bathrooms < reqBaths) {
        return false;
      }
    }

    // 5. Max Price
    if (criteria.maxPrice && criteria.maxPrice > 0) {
      if (property.price > criteria.maxPrice) {
        return false;
      }
    }

    // 6. Min Price
    if (criteria.minPrice && criteria.minPrice > 0) {
      if (property.price < criteria.minPrice) {
        return false;
      }
    }

    // 7. Amenities (every selected amenity must be in property amenities)
    if (criteria.amenities && criteria.amenities.length > 0) {
      const hasAll = criteria.amenities.every((a) =>
        property.amenities.some(propA => propA.toLowerCase().includes(a.toLowerCase()))
      );
      if (!hasAll) return false;
    }

    // 8. Furnishing
    if (criteria.furnishing && criteria.furnishing !== "all") {
      if (property.furnishing.toLowerCase() !== criteria.furnishing.toLowerCase()) {
        return false;
      }
    }

    // 9. Verified Only
    if (criteria.verifiedOnly) {
      if (property.verificationStatus !== "Verified") {
        return false;
      }
    }

    return true;
  });
}

/**
 * Calculates a dynamic AI compatibility match score (0 - 100%)
 * for a property based on user lifestyle questionnaire answers.
 */
export function calculateAiMatchScore(property, userProfile) {
  if (!userProfile) return 88; // default baseline

  let score = 50;
  const reasons = [];

  // Budget Match (Max 25 points)
  if (userProfile.budgetMax) {
    if (property.price <= userProfile.budgetMax) {
      const savings = userProfile.budgetMax - property.price;
      score += 25;
      if (savings > 0) {
        reasons.push(`Under your budget limit (Saves ₦${savings.toLocaleString()}/yr)`);
      } else {
        reasons.push("Matches your exact budget ceiling");
      }
    } else if (property.price <= userProfile.budgetMax * 1.1) {
      score += 15;
      reasons.push("Slightly above preferred budget (+10% flexibility)");
    } else {
      score -= 20;
    }
  }

  // Location Match (Max 20 points)
  if (userProfile.preferredCity) {
    if (property.location.city.toLowerCase() === userProfile.preferredCity.toLowerCase()) {
      score += 20;
      reasons.push(`Situated in your preferred city: ${property.location.city}`);
    } else {
      score -= 15;
    }
  }

  // Bedrooms Match (Max 15 points)
  if (userProfile.bedrooms) {
    if (property.specs.bedrooms === parseInt(userProfile.bedrooms, 10)) {
      score += 15;
      reasons.push(`Exact ${property.specs.bedrooms}-bedroom layout you requested`);
    } else if (property.specs.bedrooms > parseInt(userProfile.bedrooms, 10)) {
      score += 10;
      reasons.push(`Spacious extra bedroom included`);
    }
  }

  // Power / Solar Requirement (Max 15 points)
  if (userProfile.requiresSolar && property.amenities.includes("Solar Power Backup")) {
    score += 15;
    reasons.push("24/7 Solar Inverter guarantees uninterrupted remote work");
  }

  // Parking Requirement (Max 10 points)
  if (userProfile.requiresParking && property.specs.parkingSpaces >= 1) {
    score += 10;
    reasons.push(`Includes ${property.specs.parkingSpaces} dedicated secure parking slots`);
  }

  // Work from Home / High Speed Internet (Max 10 points)
  if (userProfile.remoteWorker && property.amenities.includes("High-Speed Internet")) {
    score += 10;
    reasons.push("High-speed fiber broadband pre-installed for seamless video calls");
  }

  // Clamp between 45 and 99
  const finalScore = Math.min(99, Math.max(45, score));

  return {
    score: finalScore,
    reasons: reasons.length > 0 ? reasons : ["Well-rounded property matching standard preferences"],
    rating: finalScore >= 90 ? "Excellent Match" : finalScore >= 75 ? "Strong Candidate" : "Fair Option"
  };
}

/**
 * Rent Affordability Guidance Calculator (30% Gross Income standard)
 */
export function calculateAffordability(monthlyIncome, currency = "NGN") {
  const parsedIncome = parseFloat(monthlyIncome) || 0;
  const annualIncome = parsedIncome * 12;

  // 30% rule for rent
  const recommendedMaxMonthly = parsedIncome * 0.30;
  const recommendedMaxAnnual = annualIncome * 0.30;

  // Conservative (25%)
  const conservativeMaxAnnual = annualIncome * 0.25;

  // Aggressive (35%)
  const stretchMaxAnnual = annualIncome * 0.35;

  let advice = "Enter your income to view AI guidance.";
  if (parsedIncome > 0) {
    if (parsedIncome < 200000) {
      advice = "We recommend studio or shared apartments in emerging neighborhoods with low service charges.";
    } else if (parsedIncome <= 600000) {
      advice = "You comfortably afford well-serviced 1-2 bedroom apartments with backup power in prime locations.";
    } else if (parsedIncome <= 1500000) {
      advice = "Executive 2-3 bedroom serviced apartments or gated duplexes are comfortably within your budget.";
    } else {
      advice = "Luxury penthouses, waterfront flats, or prime detached villas with private pools and smart automation.";
    }
  }

  return {
    monthlyIncome: parsedIncome,
    annualIncome,
    recommendedMaxMonthly,
    recommendedMaxAnnual,
    conservativeMaxAnnual,
    stretchMaxAnnual,
    guidance: advice
  };
}

/**
 * AI Assistant Chat Bot Response Generator
 * Provides intelligent, natural responses for property discovery, comparison, and leasing inquiries.
 */
export function generateAiAssistantResponse(userMessage, properties = []) {
  const lower = userMessage.toLowerCase();

  // Check for specific natural language search intent
  if (lower.includes("find") || lower.includes("search") || lower.includes("looking for") || lower.includes("under") || lower.includes("bedroom") || lower.includes("apartment")) {
    const parsed = parseNaturalLanguageQuery(userMessage);
    const matches = filterProperties(properties, parsed);

    if (matches.length > 0) {
      const top = matches[0];
      return {
        reply: `I found **${matches.length} matching properties** for your request! Here is the top recommendation:\n\n🏠 **${top.title}** in *${top.location.city}* for **₦${top.price.toLocaleString()}/yr**.\n\n✨ **AI Highlight**: ${top.aiSummary.matchHighlight}.\n\nWould you like me to schedule an inspection or compare this with similar listings?`,
        suggestedProperties: matches.slice(0, 3),
        extractedFilters: parsed
      };
    } else {
      return {
        reply: `I analyzed your search for "${userMessage}", but currently don't have an exact match under those strict filters. Would you like me to expand the budget slightly (+15%) or check nearby neighborhoods?`,
        suggestedProperties: properties.slice(0, 2),
        extractedFilters: parsed
      };
    }
  }

  if (lower.includes("compare") || lower.includes("difference")) {
    return {
      reply: `You can compare up to 4 properties side-by-side using our **Smart Comparison Tool**! Click the "Compare" icon on any property card or open the Comparison tab in the navigation bar to see spec-by-spec breakdowns, price per sqft, and AI security ratings.`,
      suggestedProperties: []
    };
  }

  if (lower.includes("verify") || lower.includes("safe") || lower.includes("scam") || lower.includes("legit")) {
    return {
      reply: `🛡️ **SMART-AI Security Assurance**: Every verified listing undergoes rigorous in-person physical inspections, title document validation, and agent identity vetting. Verified listings display the green **Verified** badge. Never make payments outside of our secure agreement system!`,
      suggestedProperties: []
    };
  }

  if (lower.includes("inspection") || lower.includes("book") || lower.includes("visit")) {
    return {
      reply: `Scheduling an inspection is effortless! Simply open any property details page, click **"Schedule Inspection"**, select your preferred date & time, and the verified agent will confirm instantly. You can track all appointments in your Renter Dashboard.`,
      suggestedProperties: []
    };
  }

  if (lower.includes("afford") || lower.includes("salary") || lower.includes("income") || lower.includes("budget")) {
    return {
      reply: `💰 **AI Affordability Rule**: Financial advisors recommend keeping annual housing costs below **30% of your gross annual income**. Try our built-in **AI Affordability Calculator** in the AI Recommendations page to calculate your exact ideal rent ceiling!`,
      suggestedProperties: []
    };
  }

  // Default helpful response
  return {
    reply: `Hello! I'm **SmartRental AI**, your personal real estate assistant. I can help you:\n\n1. 🔍 Find homes using natural language (e.g. *"Find a 2-bedroom in Port Harcourt under ₦1.5M with parking"*)\n2. 📊 Compare properties and calculate fair market pricing\n3. 📅 Schedule instant verified property inspections\n4. 💡 Recommend neighborhoods based on your commute and lifestyle.\n\nWhat kind of home are you dreaming of today?`,
    suggestedProperties: properties.filter(p => p.isFeatured).slice(0, 2)
  };
}
