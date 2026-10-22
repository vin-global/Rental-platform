import React from "react";
import { useApp } from "../../context/AppContext";
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
  ArrowRight,
  Calendar
} from "lucide-react";

export const PropertyCard = ({ property, onScheduleClick }) => {
  const {
    formatPrice,
    favorites,
    toggleFavorite,
    compareList,
    toggleCompare,
    navigateTo
  } = useApp();

  if (!property) return null;

  const isFavorited = favorites.includes(property.id);
  const isCompared = compareList.includes(property.id);

  return (
    <div className="property-card">
      {/* Image Wrap */}
      <div className="property-card-image-wrap">
        <img
          src={property.images?.[0] || "/properties/property-bungalow-steps.jpg"}
          alt={property.title}
          className="property-card-image"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="property-card-badges">
          {property.verificationStatus === "Verified" && (
            <span className="badge badge-verified">
              <ShieldCheck size={13} /> Verified
            </span>
          )}
          {property.isFeatured && (
            <span className="badge badge-featured">
              ★ Featured
            </span>
          )}
          {property.isNewlyListed && (
            <span className="badge badge-ai">
              New Listing
            </span>
          )}
        </div>

        {/* Action Buttons (Fav & Compare) */}
        <div className="property-card-actions">
          <button
            className={`action-btn-pill ${isCompared ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(property.id);
            }}
            title={isCompared ? "Remove from comparison" : "Add to comparison"}
            aria-label="Toggle comparison"
          >
            <Scale size={16} className={isCompared ? "text-blue-600" : ""} />
          </button>
          <button
            className={`action-btn-pill ${isFavorited ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            title={isFavorited ? "Remove from favorites" : "Save to favorites"}
            aria-label="Toggle favorite"
          >
            <Heart size={16} className={isFavorited ? "fill-rose-500 text-rose-500" : ""} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="property-card-body">
        {/* Price & Period */}
        <div className="property-card-price-row">
          <div>
            <span className="property-card-price">{formatPrice(property.price)}</span>
            <span className="property-card-period"> /{property.pricePeriod || "year"}</span>
          </div>
          <span className="badge badge-status badge-status-approved">
            {property.propertyType}
          </span>
        </div>

        {/* Title */}
        <h3
          className="property-card-title cursor-pointer"
          onClick={() => navigateTo("property-detail", property.id)}
          title={property.title}
        >
          {property.title}
        </h3>

        {/* Location */}
        <div className="property-card-location">
          <MapPin size={14} className="text-blue-500 shrink-0" />
          <span className="truncate">{property.location.neighborhood || property.location.address}, {property.location.city}</span>
        </div>

        {/* Specs Row */}
        <div className="property-card-specs">
          <div className="spec-item" title="Bedrooms">
            <Bed size={15} />
            <span>{property.specs.bedrooms} Beds</span>
          </div>
          <div className="spec-item" title="Bathrooms">
            <Bath size={15} />
            <span>{property.specs.bathrooms} Baths</span>
          </div>
          <div className="spec-item" title="Square Footage">
            <Square size={15} />
            <span>{property.specs.sizeSqft} sqft</span>
          </div>
          {property.specs.parkingSpaces > 0 && (
            <div className="spec-item" title="Parking Slots">
              <Car size={15} />
              <span>{property.specs.parkingSpaces} Park</span>
            </div>
          )}
        </div>

        {/* AI Highlight Preview */}
        {property.aiSummary?.matchHighlight && (
          <div className="property-card-ai-highlight">
            <Sparkles size={14} className="text-blue-500 shrink-0" />
            <span className="truncate">{property.aiSummary.matchHighlight}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="property-card-footer">
          {onScheduleClick ? (
            <button
              className="btn btn-sm btn-outline flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onScheduleClick(property);
              }}
            >
              <Calendar size={14} /> Schedule
            </button>
          ) : null}

          <button
            className="btn btn-sm btn-primary flex-1"
            onClick={() => navigateTo("property-detail", property.id)}
          >
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
