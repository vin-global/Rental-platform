import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { PropertyCard } from "../components/common/PropertyCard";
import {
  Bed,
  Bath,
  Square,
  Car,
  MapPin,
  Heart,
  Scale,
  ShieldCheck,
  Sparkles,
  Calendar,
  MessageSquare,
  Share2,
  AlertTriangle,
  Star,
  CheckCircle2,
  Clock,
  Zap,
  Building,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from "lucide-react";

export const PropertyDetailPage = ({
  onScheduleClick,
  onContactClick,
  onReportClick,
  onReviewClick,
  onEditClick
}) => {
  const {
    properties,
    selectedPropertyId,
    currentRole,
    formatPrice,
    favorites,
    toggleFavorite,
    compareList,
    toggleCompare,
    showToast,
    navigateTo
  } = useApp();

  // Find selected property or fallback to first
  const property =
    properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!property) return null;

  const isFavorited = favorites.includes(property.id);
  const isCompared = compareList.includes(property.id);

  // Similar properties in same city or property type
  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.location.city === property.location.city ||
          p.propertyType === property.propertyType)
    )
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Property link copied to clipboard!", "success");
    } else {
      showToast("Link ready to share!", "info");
    }
  };

  return (
    <div className="property-detail-page">
      {/* Lightbox Modal for Photos */}
      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={24} />
            </button>
            <img
              src={property.images[activeImageIdx]}
              alt={`Photo ${activeImageIdx + 1}`}
              className="lightbox-main-img"
            />
            <div className="lightbox-counter">
              {activeImageIdx + 1} / {property.images.length}
            </div>
            {property.images.length > 1 && (
              <>
                <button
                  className="lightbox-nav-btn prev"
                  onClick={() =>
                    setActiveImageIdx(
                      (activeImageIdx - 1 + property.images.length) %
                        property.images.length
                    )
                  }
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="lightbox-nav-btn next"
                  onClick={() =>
                    setActiveImageIdx((activeImageIdx + 1) % property.images.length)
                  }
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Breadcrumb & Navigation */}
      <div className="detail-top-nav">
        <div className="container">
          <button
            onClick={() => navigateTo("listings")}
            className="detail-back-link"
          >
            <ChevronLeft size={16} /> Back to all listings
          </button>
        </div>
      </div>

      {/* Main Detail Container */}
      <div className="container py-6">
        {/* Header Title & Actions */}
        <div className="detail-header-row mb-6">
          <div className="detail-header-text">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {property.verificationStatus === "Verified" && (
                <span className="badge badge-verified">
                  <ShieldCheck size={14} /> Verified Listing & Landlord
                </span>
              )}
              <span className="badge badge-ai">{property.propertyType}</span>
              <span className="badge badge-status badge-status-approved">
                {property.availability}
              </span>
            </div>
            <h1 className="detail-property-title">{property.title}</h1>
            <div className="detail-property-address">
              <MapPin size={16} className="text-blue-500 shrink-0" />
              <span>
                {property.location.address}, {property.location.neighborhood},{" "}
                {property.location.city}, {property.location.state}
              </span>
            </div>
          </div>

          <div className="detail-header-actions">
            {(currentRole === "admin" || currentRole === "landlord") && onEditClick && (
              <button
                className="btn btn-sm btn-accent"
                onClick={() => onEditClick(property)}
                title="Edit this property"
              >
                <ShieldCheck size={16} /> Edit Details
              </button>
            )}
            <button
              className={`btn btn-secondary btn-icon ${
                isFavorited ? "text-rose-500" : ""
              }`}
              onClick={() => toggleFavorite(property.id)}
              title={isFavorited ? "Remove Favorite" : "Save Favorite"}
            >
              <Heart
                size={18}
                className={isFavorited ? "fill-rose-500 text-rose-500" : ""}
              />
            </button>
            <button
              className={`btn btn-secondary btn-icon ${
                isCompared ? "text-blue-600" : ""
              }`}
              onClick={() => toggleCompare(property.id)}
              title={isCompared ? "Remove Compare" : "Add to Compare"}
            >
              <Scale size={18} />
            </button>
            <button
              className="btn btn-secondary btn-icon"
              onClick={handleShare}
              title="Share Listing"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* High-Resolution Photo Gallery */}
        <div className="detail-gallery-grid mb-8">
          <div
            className="gallery-main-frame cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={property.images[activeImageIdx]}
              alt={property.title}
              className="gallery-main-img"
            />
            <button
              className="gallery-expand-pill"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
            >
              <Maximize2 size={14} /> View All {property.images.length} Photos
            </button>
          </div>

          <div className="gallery-thumbs-col">
            {property.images.map((img, idx) => (
              <div
                key={idx}
                className={`gallery-thumb-item ${
                  activeImageIdx === idx ? "active" : ""
                }`}
                onClick={() => setActiveImageIdx(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="detail-two-col-layout">
          {/* Left Main Content */}
          <div className="detail-main-content">
            {/* Quick Specs Bar */}
            <div className="detail-specs-card mb-6">
              <div className="detail-spec-box">
                <Bed size={20} className="text-blue-500" />
                <div>
                  <div className="spec-val">{property.specs.bedrooms}</div>
                  <div className="spec-lbl">Bedrooms</div>
                </div>
              </div>
              <div className="detail-spec-box">
                <Bath size={20} className="text-blue-500" />
                <div>
                  <div className="spec-val">{property.specs.bathrooms}</div>
                  <div className="spec-lbl">Bathrooms</div>
                </div>
              </div>
              <div className="detail-spec-box">
                <Square size={20} className="text-blue-500" />
                <div>
                  <div className="spec-val">{property.specs.sizeSqft}</div>
                  <div className="spec-lbl">Sq Ft</div>
                </div>
              </div>
              <div className="detail-spec-box">
                <Car size={20} className="text-blue-500" />
                <div>
                  <div className="spec-val">{property.specs.parkingSpaces}</div>
                  <div className="spec-lbl">Parking</div>
                </div>
              </div>
              <div className="detail-spec-box">
                <Building size={20} className="text-blue-500" />
                <div>
                  <div className="spec-val">{property.furnishing}</div>
                  <div className="spec-lbl">Furnishing</div>
                </div>
              </div>
            </div>

            {/* AI Property Summary & Smart Intelligence */}
            {property.aiSummary && (
              <div className="ai-summary-card mb-8">
                <div className="ai-summary-header">
                  <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-amber-400" />
                    <h3 className="font-bold text-lg text-white">
                      SMART-AI Property Insights & Evaluation
                    </h3>
                  </div>
                  <span className="ai-summary-pill">
                    Safety Score: {property.aiSummary.safetyScore}/10
                  </span>
                </div>

                <div className="ai-summary-body">
                  <div className="ai-highlight-box mb-4">
                    <strong>AI Recommendation Summary:</strong>{" "}
                    {property.aiSummary.matchHighlight}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <div className="text-gray-300">Affordability Rating</div>
                      <div className="font-bold text-white text-sm mt-0.5">
                        {property.aiSummary.affordabilityRating}
                      </div>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg">
                      <div className="text-gray-300">Commute Index</div>
                      <div className="font-bold text-white text-sm mt-0.5">
                        {property.aiSummary.commuteRating}
                      </div>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg">
                      <div className="text-gray-300">Acoustic / Noise</div>
                      <div className="font-bold text-white text-sm mt-0.5">
                        {property.aiSummary.noiseLevel}
                      </div>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="ai-pros-box">
                      <h4 className="font-bold text-emerald-400 text-sm mb-2">
                        ✓ Key Advantages (AI Verified)
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-200">
                        {property.aiSummary.pros?.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="ai-cons-box">
                      <h4 className="font-bold text-amber-400 text-sm mb-2">
                        ⚠ Important Considerations
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-200">
                        {property.aiSummary.cons?.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="detail-section-block mb-8">
              <h3 className="detail-section-title">Property Description</h3>
              <p className="detail-description-text leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="detail-section-block mb-8">
              <h3 className="detail-section-title">Amenities & Features</h3>
              <div className="detail-amenities-grid">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="detail-amenity-chip">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhood & Commute Info */}
            <div className="detail-section-block mb-8">
              <h3 className="detail-section-title">Location & Neighborhood</h3>
              <div className="neighborhood-info-card">
                <div className="flex items-center gap-2 mb-2 font-semibold text-gray-900 dark:text-white">
                  <MapPin size={18} className="text-blue-500" />
                  <span>{property.location.neighborhood} Corridor</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <strong>Commute Estimates:</strong> {property.location.commuteInfo}
                </p>

                {/* Simulated Location Map Box */}
                <div className="detail-map-box">
                  <div className="detail-map-pin-badge">
                    <MapPin size={16} className="text-white inline mr-1" />
                    <span>{property.location.city} Verified Coordinates</span>
                  </div>
                  <div className="detail-map-coords">
                    GPS: {property.location.lat}, {property.location.lng}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="detail-section-block mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="detail-section-title mb-0">
                  Inspection Reviews & Ratings ({property.reviews?.length || 0})
                </h3>
                {onReviewClick && (
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onReviewClick(property)}
                  >
                    <Star size={14} className="text-amber-500" /> Leave a Review
                  </button>
                )}
              </div>

              {property.reviews && property.reviews.length > 0 ? (
                <div className="space-y-3">
                  {property.reviews.map((rev) => (
                    <div key={rev.id} className="review-item-card">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                          {rev.author}
                        </span>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                      </div>
                      <div className="text-amber-500 text-xs mb-2">
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 py-3">
                  No tenant reviews yet. Be the first to inspect and review this property!
                </div>
              )}
            </div>

            {/* Report Listing Trigger */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xs text-gray-400">
              <span>Listing ID: {property.id}</span>
              {onReportClick && (
                <button
                  onClick={() => onReportClick(property)}
                  className="text-rose-500 hover:underline flex items-center gap-1 font-semibold"
                >
                  <AlertTriangle size={13} /> Report this listing
                </button>
              )}
            </div>
          </div>

          {/* Right Sticky Sidebar: Pricing, Booking & Agent Card */}
          <aside className="detail-sidebar-col">
            <div className="detail-booking-card sticky top-24">
              {/* Price Row */}
              <div className="detail-price-box mb-4">
                <div className="detail-price-amount">
                  {formatPrice(property.price)}
                </div>
                <div className="detail-price-sub">
                  per {property.pricePeriod || "year"}
                </div>
              </div>

              {/* Lease Breakdown */}
              <div className="lease-breakdown-list mb-6">
                <div className="lease-row">
                  <span>Refundable Caution Deposit</span>
                  <strong>{formatPrice(property.depositRequired || 0)}</strong>
                </div>
                <div className="lease-row">
                  <span>Annual Service Charge</span>
                  <strong>{formatPrice(property.serviceCharge || 0)}</strong>
                </div>
                <div className="lease-row highlight">
                  <span>Estimated Total Initial Outlay</span>
                  <strong>
                    {formatPrice(
                      property.price +
                        (property.depositRequired || 0) +
                        (property.serviceCharge || 0)
                    )}
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  className="btn btn-accent btn-lg w-full"
                  onClick={() => onScheduleClick && onScheduleClick(property)}
                >
                  <Calendar size={18} /> Schedule In-Person Inspection
                </button>

                <button
                  className="btn btn-primary btn-lg w-full"
                  onClick={() => onContactClick && onContactClick(property)}
                >
                  <MessageSquare size={18} /> Contact Verified Agent
                </button>
              </div>

              {/* Agent Profile Box */}
              {property.agent && (
                <div className="detail-agent-box">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      className="detail-agent-avatar"
                    />
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1">
                        {property.agent.name}
                        <ShieldCheck size={14} className="text-emerald-500" />
                      </div>
                      <div className="text-xs text-gray-500">
                        {property.agent.agency}
                      </div>
                      <div className="text-xs text-amber-500 font-semibold mt-0.5">
                        ★ {property.agent.rating} ({property.agent.reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-2">
                    Verified Agent Partner • Fast Response (Avg. 15 mins)
                  </div>
                </div>
              )}

              {/* Fraud Protection Guarantee */}
              <div className="fraud-guarantee-badge mt-4">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                <span className="text-[11px] text-gray-500 leading-tight">
                  SMART-AI Rent Protection: Transparent direct lease with verified owners only.
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="section-header text-left mb-6">
              <span className="section-tag section-tag-ai">
                Smart Suggestions
              </span>
              <h2 className="section-title text-2xl">
                Similar Properties You Might Like
              </h2>
            </div>
            <div className="grid-properties">
              {similarProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onScheduleClick={onScheduleClick}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
