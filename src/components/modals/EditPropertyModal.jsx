import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AMENITIES_LIST, PROPERTY_TYPES } from "../../data/mockProperties";
import {
  Edit3,
  X,
  Building2,
  MapPin,
  Coins,
  Sparkles,
  ShieldCheck,
  Check,
  Upload,
  Plus,
  Trash2,
  Save,
  Image as ImageIcon
} from "lucide-react";

export const EditPropertyModal = ({ property, onClose }) => {
  const { updateProperty, formatPrice } = useApp();

  if (!property) return null;

  // Basic Info Form State
  const [title, setTitle] = useState(property.title || "");
  const [propertyType, setPropertyType] = useState(property.propertyType || "Apartment");
  const [furnishing, setFurnishing] = useState(property.furnishing || "Furnished");
  const [price, setPrice] = useState(property.price || "");
  const [pricePeriod, setPricePeriod] = useState(property.pricePeriod || "year");
  const [depositRequired, setDepositRequired] = useState(property.depositRequired || 0);
  const [serviceCharge, setServiceCharge] = useState(property.serviceCharge || 0);

  // Location State
  const [address, setAddress] = useState(property.location?.address || "");
  const [city, setCity] = useState(property.location?.city || "Port Harcourt");
  const [state, setState] = useState(property.location?.state || "Rivers State");
  const [neighborhood, setNeighborhood] = useState(property.location?.neighborhood || "");
  const [commuteInfo, setCommuteInfo] = useState(property.location?.commuteInfo || "");

  // Specs State
  const [bedrooms, setBedrooms] = useState(property.specs?.bedrooms || 2);
  const [bathrooms, setBathrooms] = useState(property.specs?.bathrooms || 2);
  const [toilets, setToilets] = useState(property.specs?.toilets || 3);
  const [sizeSqft, setSizeSqft] = useState(property.specs?.sizeSqft || 1200);
  const [parkingSpaces, setParkingSpaces] = useState(property.specs?.parkingSpaces || 2);
  const [yearBuilt, setYearBuilt] = useState(property.specs?.yearBuilt || 2024);

  // Status State
  const [verificationStatus, setVerificationStatus] = useState(property.verificationStatus || "Verified");
  const [availability, setAvailability] = useState(property.availability || "Available Now");
  const [isFeatured, setIsFeatured] = useState(property.isFeatured || false);
  const [isNewlyListed, setIsNewlyListed] = useState(property.isNewlyListed || false);

  // Amenities State
  const [selectedAmenities, setSelectedAmenities] = useState(property.amenities || []);

  // Images State
  const [images, setImages] = useState(property.images && property.images.length > 0 ? property.images : [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
  ]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Description
  const [description, setDescription] = useState(property.description || "");

  // AI Evaluation State
  const [matchHighlight, setMatchHighlight] = useState(property.aiSummary?.matchHighlight || "");
  const [safetyScore, setSafetyScore] = useState(property.aiSummary?.safetyScore || 9.5);
  const [affordabilityRating, setAffordabilityRating] = useState(property.aiSummary?.affordabilityRating || "High Value for Money");
  const [commuteRating, setCommuteRating] = useState(property.aiSummary?.commuteRating || "Prime Access");
  const [noiseLevel, setNoiseLevel] = useState(property.aiSummary?.noiseLevel || "Low / Residential");

  // Agent State
  const [agentName, setAgentName] = useState(property.agent?.name || "Chukwudi Nwosu");
  const [agentAgency, setAgentAgency] = useState(property.agent?.agency || "PrimeShield Realty");
  const [agentPhone, setAgentPhone] = useState(property.agent?.phone || "+234 803 456 7890");

  const [activeTab, setActiveTab] = useState("general"); // "general" | "specs" | "amenities" | "photos" | "ai"

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      propertyType,
      furnishing,
      price: parseFloat(price),
      pricePeriod,
      depositRequired: parseFloat(depositRequired) || 0,
      serviceCharge: parseFloat(serviceCharge) || 0,
      verificationStatus,
      availability,
      isFeatured,
      isNewlyListed,
      location: {
        ...property.location,
        address,
        city,
        state,
        neighborhood: neighborhood || address,
        commuteInfo
      },
      specs: {
        ...property.specs,
        bedrooms: parseInt(bedrooms, 10),
        bathrooms: parseInt(bathrooms, 10),
        toilets: parseInt(toilets, 10),
        sizeSqft: parseInt(sizeSqft, 10),
        parkingSpaces: parseInt(parkingSpaces, 10),
        yearBuilt: parseInt(yearBuilt, 10)
      },
      amenities: selectedAmenities,
      images: images.length > 0 ? images : property.images,
      description,
      aiSummary: {
        ...property.aiSummary,
        matchHighlight: matchHighlight || `Premium ${bedrooms}-bed ${propertyType} in ${city}`,
        safetyScore: parseFloat(safetyScore) || 9.5,
        affordabilityRating,
        commuteRating,
        noiseLevel
      },
      agent: {
        ...property.agent,
        name: agentName,
        agency: agentAgency,
        phone: agentPhone
      }
    };

    updateProperty(property.id, updatedData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-property-title"
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-4 flex items-center justify-between pr-8">
          <div>
            <span className="badge badge-featured mb-1">
              <ShieldCheck size={13} /> Admin & Landlord Editor
            </span>
            <h2 id="edit-property-title" className="text-xl font-bold text-gray-900 dark:text-white">
              Edit Property Details
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Modify specifications, pricing, location, photos, and AI metadata in real time.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-4 pb-2 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg ${activeTab === "general" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab("general")}
          >
            1. Overview & Pricing
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg ${activeTab === "specs" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab("specs")}
          >
            2. Specs & Layout
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg ${activeTab === "amenities" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab("amenities")}
          >
            3. Amenities ({selectedAmenities.length})
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg ${activeTab === "photos" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab("photos")}
          >
            4. Photos ({images.length})
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg ${activeTab === "ai" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab("ai")}
          >
            5. AI & Agent
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TAB 1: General & Pricing */}
          {activeTab === "general" && (
            <div className="space-y-3">
              <div className="form-group">
                <label className="form-label">Property Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="form-control"
                  >
                    {PROPERTY_TYPES.filter((t) => t !== "All Types").map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Furnishing</label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value)}
                    className="form-control"
                  >
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Annual Rent (₦)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="form-group">
                  <label className="form-label">Caution Deposit (₦)</label>
                  <input
                    type="number"
                    value={depositRequired}
                    onChange={(e) => setDepositRequired(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Service Charge (₦/yr)</label>
                  <input
                    type="number"
                    value={serviceCharge}
                    onChange={(e) => setServiceCharge(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="form-control"
                  >
                    <option value="Available Now">Available Now</option>
                    <option value="Occupied / Rented">Occupied / Rented</option>
                    <option value="Under Offer">Under Offer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Verification Status</label>
                  <select
                    value={verificationStatus}
                    onChange={(e) => setVerificationStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="Verified">Verified (Green Shield Badge)</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <span>★ Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewlyListed}
                      onChange={(e) => setIsNewlyListed(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    <span>⚡ New Listing Badge</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>
            </div>
          )}

          {/* TAB 2: Specs & Layout */}
          {activeTab === "specs" && (
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
                  Location & Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="form-group sm:col-span-2">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-control"
                    >
                      <option value="Port Harcourt">Port Harcourt</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Ibadan">Ibadan</option>
                      <option value="Enugu">Enugu</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Neighborhood</label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="form-control"
                      placeholder="e.g. Peter Odili Road"
                    />
                  </div>
                  <div className="form-group sm:col-span-2">
                    <label className="form-label">Commute Notes</label>
                    <input
                      type="text"
                      value={commuteInfo}
                      onChange={(e) => setCommuteInfo(e.target.value)}
                      className="form-control"
                      placeholder="e.g. 10 mins to GRA Phase 2"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
                  Room Dimensions & Area
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Bedrooms</label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bathrooms</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Toilets</label>
                    <input
                      type="number"
                      value={toilets}
                      onChange={(e) => setToilets(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Floor Area (Sqft)</label>
                    <input
                      type="number"
                      value={sizeSqft}
                      onChange={(e) => setSizeSqft(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Parking Slots</label>
                    <input
                      type="number"
                      value={parkingSpaces}
                      onChange={(e) => setParkingSpaces(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year Built</label>
                    <input
                      type="number"
                      value={yearBuilt}
                      onChange={(e) => setYearBuilt(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Amenities */}
          {activeTab === "amenities" && (
            <div className="space-y-3">
              <label className="form-label mb-2">Toggle Included Amenities:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AMENITIES_LIST.map((a) => {
                  const isChecked = selectedAmenities.includes(a);
                  return (
                    <label
                      key={a}
                      className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-400 font-bold text-blue-700 dark:text-blue-300"
                          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAmenity(a)}
                        className="hidden"
                      />
                      {isChecked ? (
                        <Check size={14} className="text-blue-600 shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 border rounded-sm shrink-0 inline-block border-gray-300"></span>
                      )}
                      <span>{a}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Photos */}
          {activeTab === "photos" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste high-res Unsplash or image URL..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="form-control text-xs flex-1"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="btn btn-sm btn-primary"
                >
                  <Plus size={14} /> Add Photo
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group">
                    <img
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-28 object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {idx === 0 ? "Main Cover" : `Photo ${idx + 1}`}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full hover:bg-rose-700"
                      title="Remove image"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AI & Agent */}
          {activeTab === "ai" && (
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1">
                  <Sparkles size={14} /> AI Recommendation Metadata
                </h4>

                <div className="form-group">
                  <label className="form-label">AI Highlight Summary</label>
                  <input
                    type="text"
                    value={matchHighlight}
                    onChange={(e) => setMatchHighlight(e.target.value)}
                    className="form-control"
                    placeholder="e.g. 98% match for budget under ₦1.5M in Port Harcourt"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">AI Safety Score (out of 10)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="5.0"
                      max="10.0"
                      value={safetyScore}
                      onChange={(e) => setSafetyScore(e.target.value)}
                      className="form-control font-bold"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Affordability Rating</label>
                    <input
                      type="text"
                      value={affordabilityRating}
                      onChange={(e) => setAffordabilityRating(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Managing Agent / Landlord Info
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Agent Name</label>
                    <input
                      type="text"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Agency</label>
                    <input
                      type="text"
                      value={agentAgency}
                      onChange={(e) => setAgentAgency(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      value={agentPhone}
                      onChange={(e) => setAgentPhone(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-400">
              ID: <strong>{property.id}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-secondary text-xs"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary text-xs">
                <Save size={14} /> Save Property Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
