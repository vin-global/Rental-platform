import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { PropertyCard } from "../components/common/PropertyCard";
import { POPULAR_LOCATIONS, PROPERTY_TYPES } from "../data/mockProperties";
import { parseNaturalLanguageQuery } from "../services/aiService";
import {
  Search,
  Sparkles,
  MapPin,
  Home,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Zap,
  CalendarCheck,
  CheckCircle,
  TrendingUp,
  Star,
  Users,
  ChevronRight
} from "lucide-react";

export const HomePage = ({ onScheduleClick }) => {
  const {
    properties,
    navigateTo,
    recordSearch,
    formatPrice,
    setCurrentRole
  } = useApp();

  // Natural language query input state
  const [nlQuery, setNlQuery] = useState("");
  // Traditional filter state
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedBeds, setSelectedBeds] = useState("any");
  const [maxBudget, setMaxBudget] = useState("");

  const samplePrompts = [
    "Find me a 2-bedroom apartment in Port Harcourt under ₦1.5 million with parking",
    "Duplex in Lekki Phase 1 with swimming pool and BQ",
    "Executive 3-bedroom penthouse in Maitama Abuja",
    "Modern studio apartment in Yaba with high-speed internet"
  ];

  const handleNlSearch = (e) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;

    recordSearch(nlQuery);
    const parsed = parseNaturalLanguageQuery(nlQuery);
    navigateTo("listings", null, parsed);
  };

  const handleTraditionalSearch = (e) => {
    e.preventDefault();
    const criteria = {
      location: selectedCity !== "All Locations" ? selectedCity : null,
      propertyType: selectedType !== "All Types" ? selectedType : null,
      bedrooms: selectedBeds !== "any" ? selectedBeds : null,
      maxPrice: maxBudget ? parseFloat(maxBudget) : null
    };
    navigateTo("listings", null, criteria);
  };

  const handleSamplePromptClick = (prompt) => {
    setNlQuery(prompt);
    recordSearch(prompt);
    const parsed = parseNaturalLanguageQuery(prompt);
    navigateTo("listings", null, parsed);
  };

  const featuredProperties = properties.filter((p) => p.isFeatured);
  const newProperties = properties.filter((p) => p.isNewlyListed);

  return (
    <div className="homepage-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-backdrop-gradient"></div>
        <div className="container hero-container">
          <div className="hero-content">
            {/* Hero AI Tag */}
            <div className="hero-tag-pill animate-fade-in">
              <Sparkles size={16} className="text-amber-400" />
              <span>Next-Gen AI House Rental Marketplace</span>
              <span className="hero-tag-accent">Powered by SMART-AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-headline animate-fade-in">
              Find a Place You’ll <br />
              <span className="text-gradient-amber">Love to Call Home.</span>
            </h1>

            <p className="hero-subtext animate-fade-in">
              Discover verified apartments, duplexes, and penthouses across Nigeria. Search using natural language, receive intelligent AI match scores, and book instant in-person inspections with trusted landlords and agents.
            </p>

            {/* AI Natural Language Search Box */}
            <div className="hero-search-card glass-panel-navy animate-slide-up">
              <div className="hero-search-tabs">
                <div className="search-tab active">
                  <Sparkles size={16} className="text-blue-400" />
                  <span>AI Natural Search</span>
                </div>
                <div className="search-tab-subtitle">
                  Type what you want in plain words
                </div>
              </div>

              {/* Natural Language Form */}
              <form onSubmit={handleNlSearch} className="nl-search-form">
                <div className="nl-input-wrap">
                  <Search size={20} className="nl-search-icon" />
                  <input
                    type="text"
                    value={nlQuery}
                    onChange={(e) => setNlQuery(e.target.value)}
                    placeholder="e.g. Find me a 2-bedroom apartment in Port Harcourt under ₦1.5 million with parking..."
                    className="nl-input"
                    aria-label="Natural Language Property Search"
                  />
                  {nlQuery && (
                    <button
                      type="button"
                      onClick={() => setNlQuery("")}
                      className="nl-clear-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button type="submit" className="btn btn-accent btn-lg nl-submit-btn">
                  <Sparkles size={18} /> Find My Home
                </button>
              </form>

              {/* Prompt Suggestions */}
              <div className="hero-prompts-row">
                <span className="prompts-label">Try searching:</span>
                <div className="prompts-chips">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="prompt-chip"
                      onClick={() => handleSamplePromptClick(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Parameter Quick Filter Bar */}
              <div className="hero-traditional-bar">
                <div className="traditional-filter-item">
                  <label>City / Hub</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="traditional-select"
                  >
                    <option value="All Locations">All Cities</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Lagos">Lagos (Lekki / Ikoyi)</option>
                    <option value="Abuja">Abuja (Maitama / Jabi)</option>
                    <option value="Ibadan">Ibadan (Bodija)</option>
                    <option value="Enugu">Enugu (GRA)</option>
                  </select>
                </div>

                <div className="traditional-filter-item">
                  <label>Property Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="traditional-select"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="traditional-filter-item">
                  <label>Bedrooms</label>
                  <select
                    value={selectedBeds}
                    onChange={(e) => setSelectedBeds(e.target.value)}
                    className="traditional-select"
                  >
                    <option value="any">Any Beds</option>
                    <option value="1">1 Bedroom / Studio</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>

                <div className="traditional-filter-item">
                  <label>Max Budget (₦)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2000000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="traditional-input"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTraditionalSearch}
                  className="btn btn-primary traditional-filter-btn"
                >
                  <SlidersHorizontal size={16} /> Filter
                </button>
              </div>
            </div>

            {/* Hero Trust Stats */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <span className="trust-number">100%</span>
                <span className="trust-label">Verified Physical Inspections</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">₦0</span>
                <span className="trust-label">Hidden Agency Caution Fees</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">98.4%</span>
                <span className="trust-label">AI Match Recommendation Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="section-spacing bg-surface-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-amber">
              ★ Handpicked Residences
            </span>
            <h2 className="section-title">Featured Premium Properties</h2>
            <p className="section-subtitle">
              Carefully curated homes featuring 24/7 backup power, state-of-the-art security, and verified landlord credentials.
            </p>
          </div>

          <div className="grid-properties">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onScheduleClick={onScheduleClick}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigateTo("listings")}
            >
              Explore All {properties.length} Properties <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* AI Recommendation Spotlight Banner */}
      <section className="ai-spotlight-section">
        <div className="container">
          <div className="ai-spotlight-card">
            <div className="ai-spotlight-text">
              <span className="badge badge-ai mb-3">
                <Sparkles size={14} /> Intelligent Matchmaker
              </span>
              <h2 className="ai-spotlight-title">
                Let Our AI Find Your Dream Rental in Under 60 Seconds
              </h2>
              <p className="ai-spotlight-desc">
                Tell us your lifestyle preferences, commute tolerance, pet requirements, solar power priorities, and budget. Our neural matchmaker calculates compatibility scores for every available home.
              </p>
              <div className="ai-spotlight-features">
                <div className="spotlight-feat-item">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <span>Personalized Rent-to-Income Affordability Guide</span>
                </div>
                <div className="spotlight-feat-item">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <span>\"Why This Fits You\" AI Context Rationale</span>
                </div>
                <div className="spotlight-feat-item">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <span>Commute & Neighborhood Safety Ratings</span>
                </div>
              </div>
              <button
                className="btn btn-ai btn-lg mt-4"
                onClick={() => navigateTo("ai-recommendations")}
              >
                Launch AI Matchmaker Wizard <Sparkles size={18} />
              </button>
            </div>
            <div className="ai-spotlight-graphic">
              <div className="ai-match-demo-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-gray-900">AI Compatibility Score</span>
                  <span className="badge badge-verified font-bold">98% Match</span>
                </div>
                <div className="ai-meter-bar">
                  <div className="ai-meter-fill" style={{ width: "98%" }}></div>
                </div>
                <div className="ai-demo-bullets mt-3">
                  <div className="demo-bullet">
                    <span className="text-blue-600 font-bold">✓</span> Under budget in Port Harcourt (₦1.45M/yr)
                  </div>
                  <div className="demo-bullet">
                    <span className="text-blue-600 font-bold">✓</span> 24/7 Solar hybrid backup power
                  </div>
                  <div className="demo-bullet">
                    <span className="text-blue-600 font-bold">✓</span> 2 Dedicated parking slots
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations Grid */}
      <section className="section-spacing">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-ai">
              <MapPin size={13} /> Prime Hubs
            </span>
            <h2 className="section-title">Explore Homes by Location</h2>
            <p className="section-subtitle">
              Browse top residential hubs with high rental demand and excellent infrastructure.
            </p>
          </div>

          <div className="grid-cols-3">
            {POPULAR_LOCATIONS.map((loc, idx) => (
              <div
                key={idx}
                className="location-card"
                onClick={() =>
                  navigateTo("listings", null, { location: loc.name.split(" ")[0] })
                }
              >
                <img src={loc.image} alt={loc.name} className="location-card-img" />
                <div className="location-card-overlay">
                  <div className="location-card-content">
                    <h3 className="location-card-title">{loc.name}</h3>
                    <div className="location-card-state">{loc.state}</div>
                    <div className="location-card-meta">
                      <span>{loc.propertyCount} Listings</span>
                      <span>Avg. {loc.avgPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newly Listed Section */}
      <section className="section-spacing bg-surface-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-ai">
              <Zap size={13} /> Fresh on the Market
            </span>
            <h2 className="section-title">Newly Listed Properties</h2>
            <p className="section-subtitle">
              The latest verified properties available for immediate inspection and leasing.
            </p>
          </div>

          <div className="grid-properties">
            {newProperties.slice(0, 3).map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onScheduleClick={onScheduleClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-amber">
              <TrendingUp size={13} /> Simple 4-Step Process
            </span>
            <h2 className="section-title">How SMART-AI Works</h2>
            <p className="section-subtitle">
              Renting a home in Nigeria has never been this transparent, fast, and secure.
            </p>
          </div>

          <div className="grid-cols-4">
            <div className="how-step-card">
              <div className="how-step-num">01</div>
              <div className="how-step-icon">
                <Search size={24} className="text-blue-500" />
              </div>
              <h3 className="how-step-title">AI Natural Search</h3>
              <p className="how-step-desc">
                Search using regular language like *"2-bed in Port Harcourt under ₦1.5M"* and let our NLP extract exact parameters.
              </p>
            </div>

            <div className="how-step-card">
              <div className="how-step-num">02</div>
              <div className="how-step-icon">
                <Sparkles size={24} className="text-purple-500" />
              </div>
              <h3 className="how-step-title">Smart Match & Compare</h3>
              <p className="how-step-desc">
                Compare up to 4 homes side-by-side and review AI safety scores, power reliability, and commute ratings.
              </p>
            </div>

            <div className="how-step-card">
              <div className="how-step-num">03</div>
              <div className="how-step-icon">
                <CalendarCheck size={24} className="text-amber-500" />
              </div>
              <h3 className="how-step-title">Book In-Person Visit</h3>
              <p className="how-step-desc">
                Select your calendar date & time. The verified agent meets you on-site for a complete walkthrough.
              </p>
            </div>

            <div className="how-step-card">
              <div className="how-step-num">04</div>
              <div className="how-step-icon">
                <ShieldCheck size={24} className="text-emerald-500" />
              </div>
              <h3 className="how-step-title">Secure Tenancy</h3>
              <p className="how-step-desc">
                Complete digital tenancy paperwork, enjoy zero hidden caution fees, and move into your verified new home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials */}
      <section className="section-spacing bg-surface-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag section-tag-ai">
              <Star size={13} /> Real Verified Renters
            </span>
            <h2 className="section-title">What Our Community Says</h2>
            <p className="section-subtitle">
              Join thousands of happy tenants and landlords who found their match through SMART-AI.
            </p>
          </div>

          <div className="grid-cols-3">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                \"I was looking for a 2-bedroom apartment in Port Harcourt with continuous solar power. SMART-AI's natural search found the exact apartment on Peter Odili Road within 10 seconds. Inspected on Saturday and moved in the next week!\"
              </p>
              <div className="testimonial-author">
                <img
                  src="/avatars/avatar-1.svg"
                  alt="Tariere Briggs"
                  className="testimonial-avatar"
                />
                <div>
                  <div className="testimonial-name">Tariere Briggs</div>
                  <div className="testimonial-role">Product Designer, Port Harcourt</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "As a landlord in Lekki, managing endless calls and fake inquiries used to be exhausting. SMART-AI pre-screens tenants and automatically schedules organized inspection slots. Outstanding platform!"
              </p>
              <div className="testimonial-author">
                <img
                  src="/avatars/avatar-2.svg"
                  alt="Chief Emeka Nwosu"
                  className="testimonial-avatar"
                />
                <div>
                  <div className="testimonial-name">Chief Emeka Nwosu</div>
                  <div className="testimonial-role">Property Investor, Lagos</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The property comparison tool and AI affordability breakdown saved me from over-spending. Being able to compare 3 Maitama penthouses side-by-side made the decision so straightforward."
              </p>
              <div className="testimonial-author">
                <img
                  src="/avatars/avatar-4.svg"
                  alt="Dr. Okey Amadi"
                  className="testimonial-avatar"
                />
                <div>
                  <div className="testimonial-name">Dr. Okey Amadi</div>
                  <div className="testimonial-role">Physician & Remote Consultant, Abuja</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
