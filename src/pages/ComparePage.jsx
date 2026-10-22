import React from "react";
import { useApp } from "../context/AppContext";
import { AMENITIES_LIST } from "../data/mockProperties";
import {
  Scale,
  X,
  Plus,
  Check,
  Minus,
  Sparkles,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Building2,
  Trash2
} from "lucide-react";

export const ComparePage = ({ onScheduleClick }) => {
  const {
    properties,
    compareList,
    toggleCompare,
    formatPrice,
    navigateTo
  } = useApp();

  const comparedProperties = properties.filter((p) =>
    compareList.includes(p.id)
  );

  return (
    <div className="compare-page-wrapper">
      {/* Header */}
      <section className="compare-page-header">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="badge badge-ai mb-2">
                <Scale size={14} /> Side-by-Side Matrix
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Property Comparison Matrix
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Evaluate specifications, amenities, security, and AI value ratings across up to 4 properties.
              </p>
            </div>

            {comparedProperties.length > 0 && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  comparedProperties.forEach((p) => toggleCompare(p.id));
                }}
              >
                <Trash2 size={14} /> Clear All Comparison
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container py-8">
        {comparedProperties.length === 0 ? (
          <div className="empty-compare-box text-center py-16">
            <Scale size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Properties Selected for Comparison
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mt-1 mb-6">
              Click the scale icon on any property card or detail page to add up to 4 homes for side-by-side spec comparison.
            </p>
            <button
              onClick={() => navigateTo("listings")}
              className="btn btn-primary"
            >
              Browse Properties to Compare
            </button>
          </div>
        ) : (
          <div className="compare-matrix-scroll-wrapper">
            <div className="compare-table">
              {/* Row 1: Photos, Titles & Remove */}
              <div className="compare-row compare-header-row">
                <div className="compare-cell cell-label">Property Overview</div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell cell-prop-header">
                    <button
                      onClick={() => toggleCompare(prop.id)}
                      className="compare-remove-btn"
                      title="Remove from comparison"
                    >
                      <X size={14} />
                    </button>
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="compare-thumb-img"
                    />
                    <h4
                      className="compare-prop-title truncate cursor-pointer hover:text-blue-600"
                      onClick={() => navigateTo("property-detail", prop.id)}
                    >
                      {prop.title}
                    </h4>
                    <div className="text-xs text-gray-500">{prop.location.city}</div>
                  </div>
                ))}
              </div>

              {/* Row 2: Price & Period */}
              <div className="compare-row">
                <div className="compare-cell cell-label">Annual Rent</div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(prop.price)}/{prop.pricePeriod || "year"}
                  </div>
                ))}
              </div>

              {/* Row 3: Caution Deposit & Service Charge */}
              <div className="compare-row">
                <div className="compare-cell cell-label">Caution Deposit</div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell text-sm">
                    {formatPrice(prop.depositRequired || 0)}
                  </div>
                ))}
              </div>

              {/* Row 4: Property Type & Furnishing */}
              <div className="compare-row">
                <div className="compare-cell cell-label">Type & Furnishing</div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell text-sm">
                    <span className="badge badge-status badge-status-approved mr-1">
                      {prop.propertyType}
                    </span>
                    <span>{prop.furnishing}</span>
                  </div>
                ))}
              </div>

              {/* Row 5: Specs (Bedrooms / Baths / Size) */}
              <div className="compare-row">
                <div className="compare-cell cell-label">Layout & Floor Area</div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell text-xs">
                    <div><strong>{prop.specs.bedrooms}</strong> Bedrooms • <strong>{prop.specs.bathrooms}</strong> Baths</div>
                    <div className="text-gray-500 mt-0.5">{prop.specs.sizeSqft} sqft ({prop.specs.parkingSpaces} Parking slots)</div>
                  </div>
                ))}
              </div>

              {/* Row 6: AI Safety Score */}
              <div className="compare-row highlight-row">
                <div className="compare-cell cell-label">
                  <Sparkles size={14} className="inline mr-1 text-blue-500" /> AI Safety & Match Score
                </div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell">
                    <span className="badge badge-verified font-bold">
                      ★ {prop.aiSummary?.safetyScore || "9.5"}/10 Safety Index
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 7: Power Reliability */}
              <div className="compare-row">
                <div className="compare-cell cell-label">Solar / Backup Power</div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell">
                    {prop.amenities.includes("Solar Power Backup") ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <Check size={14} /> 24/7 Solar Backup
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Minus size={14} /> Standard Grid Power
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Row 8+: Selected Key Amenities Checklist */}
              {AMENITIES_LIST.slice(0, 8).map((amenity) => (
                <div key={amenity} className="compare-row">
                  <div className="compare-cell cell-label text-xs">{amenity}</div>
                  {comparedProperties.map((prop) => {
                    const hasAmenity = prop.amenities.some((a) =>
                      a.toLowerCase().includes(amenity.toLowerCase())
                    );
                    return (
                      <div key={prop.id} className="compare-cell text-center">
                        {hasAmenity ? (
                          <Check size={16} className="text-emerald-500 inline" />
                        ) : (
                          <Minus size={16} className="text-gray-300 dark:text-gray-600 inline" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Row Final: Actions */}
              <div className="compare-row compare-footer-row">
                <div className="compare-cell cell-label">Actions</div>
                {comparedProperties.map((prop) => (
                  <div key={prop.id} className="compare-cell">
                    <button
                      className="btn btn-sm btn-accent w-full mb-2"
                      onClick={() => onScheduleClick && onScheduleClick(prop)}
                    >
                      <Calendar size={13} /> Schedule Visit
                    </button>
                    <button
                      className="btn btn-sm btn-outline w-full"
                      onClick={() => navigateTo("property-detail", prop.id)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
