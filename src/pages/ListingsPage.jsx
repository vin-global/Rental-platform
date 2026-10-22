import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { PropertyCard } from "../components/common/PropertyCard";
import { filterProperties, parseNaturalLanguageQuery } from "../services/aiService";
import { AMENITIES_LIST, PROPERTY_TYPES } from "../data/mockProperties";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  MapPin,
  Grid,
  List,
  Map as MapIcon,
  ShieldCheck,
  Check,
  ChevronDown,
  ArrowUpDown,
  X,
  Building2,
  Bed,
  Bath,
  ArrowRight
} from "lucide-react";

export const ListingsPage = ({ onScheduleClick }) => {
  const {
    properties,
    activeFilters,
    setActiveFilters,
    formatPrice,
    recordSearch,
    navigateTo
  } = useApp();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(activeFilters?.rawQuery || "");
  const [selectedLocation, setSelectedLocation] = useState(activeFilters?.location || "All Locations");
  const [selectedType, setSelectedType] = useState(activeFilters?.propertyType || "All Types");
  const [selectedBedrooms, setSelectedBedrooms] = useState(activeFilters?.bedrooms?.toString() || "any");
  const [selectedBathrooms, setSelectedBathrooms] = useState(activeFilters?.bathrooms?.toString() || "any");
  const [maxPrice, setMaxPrice] = useState(activeFilters?.maxPrice || 20000000);
  const [selectedAmenities, setSelectedAmenities] = useState(activeFilters?.amenities || []);
  const [selectedFurnishing, setSelectedFurnishing] = useState(activeFilters?.furnishing || "all");
  const [verifiedOnly, setVerifiedOnly] = useState(activeFilters?.verifiedOnly || false);

  // View state: "grid" | "list" | "map"
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("ai-relevance");
  const [selectedMapProperty, setSelectedMapProperty] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if activeFilters was passed via navigation
  useEffect(() => {
    if (activeFilters) {
      if (activeFilters.rawQuery) setSearchQuery(activeFilters.rawQuery);
      if (activeFilters.location) setSelectedLocation(activeFilters.location);
      if (activeFilters.propertyType) setSelectedType(activeFilters.propertyType);
      if (activeFilters.bedrooms) setSelectedBedrooms(activeFilters.bedrooms.toString());
      if (activeFilters.maxPrice) setMaxPrice(activeFilters.maxPrice);
      if (activeFilters.amenities) setSelectedAmenities(activeFilters.amenities);
      if (activeFilters.furnishing) setSelectedFurnishing(activeFilters.furnishing);
    }
  }, [activeFilters]);

  // Handle Natural Search input submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    recordSearch(searchQuery);
    const parsed = parseNaturalLanguageQuery(searchQuery);
    if (parsed) {
      if (parsed.location) setSelectedLocation(parsed.location);
      if (parsed.propertyType) setSelectedType(parsed.propertyType);
      if (parsed.bedrooms) setSelectedBedrooms(parsed.bedrooms.toString());
      if (parsed.maxPrice) setMaxPrice(parsed.maxPrice);
      if (parsed.amenities.length > 0) {
        setSelectedAmenities((prev) => Array.from(new Set([...prev, ...parsed.amenities])));
      }
      if (parsed.furnishing) setSelectedFurnishing(parsed.furnishing);
    }
  };

  // Toggle Amenity Checkbox
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All Locations");
    setSelectedType("All Types");
    setSelectedBedrooms("any");
    setSelectedBathrooms("any");
    setMaxPrice(20000000);
    setSelectedAmenities([]);
    setSelectedFurnishing("all");
    setVerifiedOnly(false);
    setActiveFilters(null);
  };

  // Filter and Sort properties
  const filteredListings = useMemo(() => {
    const criteria = {
      location: selectedLocation,
      propertyType: selectedType,
      bedrooms: selectedBedrooms,
      bathrooms: selectedBathrooms,
      maxPrice: maxPrice < 20000000 ? maxPrice : null,
      amenities: selectedAmenities,
      furnishing: selectedFurnishing,
      verifiedOnly
    };

    let result = filterProperties(properties, criteria);

    // Text search fallback if raw query has words not in categories
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.address.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.amenities.some((a) => a.toLowerCase().includes(q))
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "views") return b.viewsCount - a.viewsCount;
      // Default: AI relevance (featured + verified + reviews count)
      const scoreA = (a.isFeatured ? 20 : 0) + (a.verificationStatus === "Verified" ? 15 : 0) + (a.reviews?.length || 0) * 5;
      const scoreB = (b.isFeatured ? 20 : 0) + (b.verificationStatus === "Verified" ? 15 : 0) + (b.reviews?.length || 0) * 5;
      return scoreB - scoreA;
    });
  }, [
    properties,
    searchQuery,
    selectedLocation,
    selectedType,
    selectedBedrooms,
    selectedBathrooms,
    maxPrice,
    selectedAmenities,
    selectedFurnishing,
    verifiedOnly,
    sortBy
  ]);

  return (
    <div className="listings-page-wrapper">
      {/* Top Search & Filter Header Bar */}
      <section className="listings-header-section">
        <div className="container">
          <div className="listings-top-box">
            <h1 className="listings-main-title">
              Explore Verified Properties
            </h1>
            <p className="listings-main-desc">
              Discover verified houses, apartments, and duplexes with smart pricing, 24/7 power, and secure leasing.
            </p>

            {/* Top Search Bar */}
            <form onSubmit={handleSearchSubmit} className="listings-search-bar mt-4">
              <div className="listings-search-input-wrap">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask with natural language (e.g. 2-bedroom in Port Harcourt under ₦1.5M with solar power)..."
                  className="listings-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button type="submit" className="btn btn-ai">
                <Sparkles size={16} /> AI Parse & Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Listings Body with Sidebar & Grid */}
      <div className="container section-spacing pt-6">
        <div className="listings-layout">
          {/* Mobile Filter Toggle */}
          <div className="mobile-filter-bar md:hidden mb-4 flex items-center justify-between">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              <SlidersHorizontal size={16} /> Filters (
              {selectedAmenities.length +
                (selectedLocation !== "All Locations" ? 1 : 0) +
                (selectedType !== "All Types" ? 1 : 0)}
              )
            </button>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {filteredListings.length} homes found
            </span>
          </div>

          {/* Filter Sidebar */}
          <aside className={`listings-sidebar ${mobileFilterOpen ? "mobile-open" : ""}`}>
            <div className="sidebar-header flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                <SlidersHorizontal size={18} className="text-blue-500" />
                <span>Filters & Preferences</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Location Filter */}
            <div className="filter-group">
              <label className="filter-label">City / Region</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="form-control"
              >
                <option value="All Locations">All Locations</option>
                <option value="Port Harcourt">Port Harcourt</option>
                <option value="Lagos">Lagos (Lekki / Ikoyi / VI)</option>
                <option value="Abuja">Abuja (Maitama / Jabi)</option>
                <option value="Ibadan">Ibadan (Bodija)</option>
                <option value="Enugu">Enugu (GRA)</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="filter-group">
              <label className="filter-label">Property Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="form-control"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-2 filter-group">
              <div>
                <label className="filter-label">Bedrooms</label>
                <select
                  value={selectedBedrooms}
                  onChange={(e) => setSelectedBedrooms(e.target.value)}
                  className="form-control"
                >
                  <option value="any">Any</option>
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value="3">3 Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>
              <div>
                <label className="filter-label">Bathrooms</label>
                <select
                  value={selectedBathrooms}
                  onChange={(e) => setSelectedBathrooms(e.target.value)}
                  className="form-control"
                >
                  <option value="any">Any</option>
                  <option value="1">1+ Bath</option>
                  <option value="2">2+ Baths</option>
                  <option value="3">3+ Baths</option>
                  <option value="4">4+ Baths</option>
                </select>
              </div>
            </div>

            {/* Max Budget Slider */}
            <div className="filter-group">
              <div className="flex items-center justify-between mb-1">
                <label className="filter-label">Max Annual Budget</label>
                <span className="font-bold text-xs text-blue-600 dark:text-blue-400">
                  {maxPrice >= 20000000 ? "Any Budget" : formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={800000}
                max={20000000}
                step={200000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>₦800k</span>
                <span>₦10M</span>
                <span>₦20M+</span>
              </div>
            </div>

            {/* Furnishing */}
            <div className="filter-group">
              <label className="filter-label">Furnishing Status</label>
              <div className="flex gap-2">
                {["all", "Furnished", "Unfurnished"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFurnishing(f)}
                    className={`btn btn-sm flex-1 ${
                      selectedFurnishing === f ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {f === "all" ? "All" : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only Switch */}
            <div className="filter-group">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  🛡️ Verified Properties Only
                </span>
              </label>
            </div>

            {/* Amenities Checkboxes */}
            <div className="filter-group">
              <label className="filter-label">Must-Have Amenities</label>
              <div className="amenities-checkbox-list">
                {AMENITIES_LIST.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className={`amenity-checkbox-item ${isChecked ? "active" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAmenity(amenity)}
                      />
                      <span>{amenity}</span>
                      {isChecked && <Check size={13} className="text-blue-500 ml-auto" />}
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Results Column */}
          <main className="listings-main-col">
            {/* Controls Bar: Stats, Active Tags, Sort & View Switcher */}
            <div className="listings-controls-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="listings-count-badge">
                  <strong>{filteredListings.length}</strong> Properties Available
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <ArrowUpDown size={15} />
                    <span className="hidden sm:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <option value="ai-relevance">AI Match & Relevance</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest Listed</option>
                      <option value="views">Most Popular</option>
                    </select>
                  </div>

                  {/* View Switcher Buttons */}
                  <div className="view-mode-buttons">
                    <button
                      className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                      onClick={() => setViewMode("grid")}
                      title="Grid View"
                      aria-label="Grid View"
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                      onClick={() => setViewMode("list")}
                      title="List View"
                      aria-label="List View"
                    >
                      <List size={16} />
                    </button>
                    <button
                      className={`view-btn ${viewMode === "map" ? "active" : ""}`}
                      onClick={() => setViewMode("map")}
                      title="Map View"
                      aria-label="Map View"
                    >
                      <MapIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Tags */}
              {(selectedLocation !== "All Locations" ||
                selectedType !== "All Types" ||
                selectedBedrooms !== "any" ||
                maxPrice < 20000000 ||
                selectedAmenities.length > 0 ||
                verifiedOnly) && (
                <div className="active-filter-chips-row mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-400">Active filters:</span>
                  {selectedLocation !== "All Locations" && (
                    <span className="filter-chip">
                      {selectedLocation}
                      <X size={12} onClick={() => setSelectedLocation("All Locations")} />
                    </span>
                  )}
                  {selectedType !== "All Types" && (
                    <span className="filter-chip">
                      {selectedType}
                      <X size={12} onClick={() => setSelectedType("All Types")} />
                    </span>
                  )}
                  {selectedBedrooms !== "any" && (
                    <span className="filter-chip">
                      {selectedBedrooms} Beds
                      <X size={12} onClick={() => setSelectedBedrooms("any")} />
                    </span>
                  )}
                  {maxPrice < 20000000 && (
                    <span className="filter-chip">
                      Max {formatPrice(maxPrice)}
                      <X size={12} onClick={() => setMaxPrice(20000000)} />
                    </span>
                  )}
                  {selectedAmenities.map((a) => (
                    <span key={a} className="filter-chip">
                      {a}
                      <X size={12} onClick={() => toggleAmenity(a)} />
                    </span>
                  ))}
                  {verifiedOnly && (
                    <span className="filter-chip">
                      Verified
                      <X size={12} onClick={() => setVerifiedOnly(false)} />
                    </span>
                  )}
                  <button
                    onClick={resetFilters}
                    className="text-xs text-rose-500 font-semibold hover:underline ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Results Rendering according to View Mode */}
            {filteredListings.length === 0 ? (
              /* Empty State */
              <div className="empty-results-box text-center py-12">
                <div className="empty-icon-wrap mb-3">
                  <Building2 size={42} className="text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  No Matching Properties Found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mt-1 mb-5 text-sm">
                  We couldn't find listings matching your specific criteria. Try expanding your price limit, removing some amenities, or searching for neighboring cities.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid View */
              <div className="grid-properties mt-4">
                {filteredListings.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onScheduleClick={onScheduleClick}
                  />
                ))}
              </div>
            ) : viewMode === "list" ? (
              /* List View */
              <div className="listings-list-col mt-4 space-y-4">
                {filteredListings.map((prop) => (
                  <div key={prop.id} className="property-list-card">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="property-list-img"
                    />
                    <div className="property-list-body">
                      <div className="flex items-center justify-between mb-1">
                        <span className="badge badge-verified">
                          <ShieldCheck size={12} /> {prop.verificationStatus}
                        </span>
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400 font-heading">
                          {formatPrice(prop.price)}
                          <span className="text-xs text-gray-500 font-normal">
                            /{prop.pricePeriod || "year"}
                          </span>
                        </div>
                      </div>

                      <h3
                        className="font-bold text-lg text-gray-900 dark:text-white cursor-pointer hover:text-blue-600"
                        onClick={() => navigateTo("property-detail", prop.id)}
                      >
                        {prop.title}
                      </h3>

                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                        <MapPin size={14} className="text-blue-500" />
                        <span>{prop.location.address}, {prop.location.city}</span>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {prop.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-2 mt-auto">
                        <span>{prop.specs.bedrooms} Bedrooms</span>
                        <span>{prop.specs.bathrooms} Baths</span>
                        <span>{prop.specs.sizeSqft} sqft</span>
                        <span>{prop.specs.parkingSpaces} Parking</span>
                        <button
                          onClick={() => navigateTo("property-detail", prop.id)}
                          className="btn btn-sm btn-primary ml-auto"
                        >
                          View Details <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Map Split View */
              <div className="listings-map-layout mt-4">
                <div className="map-properties-scroll">
                  {filteredListings.map((prop) => (
                    <div
                      key={prop.id}
                      className={`map-prop-snippet ${
                        selectedMapProperty?.id === prop.id ? "active-pin-prop" : ""
                      }`}
                      onClick={() => setSelectedMapProperty(prop)}
                    >
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="map-prop-thumb"
                      />
                      <div className="map-prop-snippet-info">
                        <div className="font-bold text-xs text-blue-600 dark:text-blue-400">
                          {formatPrice(prop.price)}/yr
                        </div>
                        <div className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                          {prop.title}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {prop.location.city} • {prop.specs.bedrooms} Beds
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Interactive Map Display */}
                <div className="simulated-map-container">
                  <div className="simulated-map-bg">
                    {/* Simulated Map Roads & City Grids */}
                    <div className="map-grid-overlay"></div>

                    {/* Interactive Pins */}
                    {filteredListings.map((prop, idx) => (
                      <div
                        key={prop.id}
                        className={`map-marker-pin ${
                          selectedMapProperty?.id === prop.id ? "selected" : ""
                        }`}
                        style={{
                          top: `${25 + ((idx * 17) % 55)}%`,
                          left: `${20 + ((idx * 23) % 65)}%`
                        }}
                        onClick={() => setSelectedMapProperty(prop)}
                      >
                        <span className="marker-price-pill">
                          {formatPrice(prop.price).replace("/yr", "")}
                        </span>
                      </div>
                    ))}

                    {/* Selected Property Popup Info */}
                    {selectedMapProperty && (
                      <div className="map-popup-card animate-slide-up">
                        <button
                          onClick={() => setSelectedMapProperty(null)}
                          className="map-popup-close"
                        >
                          ✕
                        </button>
                        <img
                          src={selectedMapProperty.images[0]}
                          alt={selectedMapProperty.title}
                          className="map-popup-img"
                        />
                        <div className="map-popup-body">
                          <div className="font-bold text-sm text-blue-600">
                            {formatPrice(selectedMapProperty.price)}/yr
                          </div>
                          <div className="font-semibold text-xs text-gray-900 truncate">
                            {selectedMapProperty.title}
                          </div>
                          <div className="text-[11px] text-gray-500 mb-2">
                            {selectedMapProperty.location.address}, {selectedMapProperty.location.city}
                          </div>
                          <button
                            onClick={() => navigateTo("property-detail", selectedMapProperty.id)}
                            className="btn btn-sm btn-primary w-full"
                          >
                            View Full Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="map-control-tag">
                    <MapPin size={13} className="text-blue-500" /> Interactive Simulated GPS Matrix
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
