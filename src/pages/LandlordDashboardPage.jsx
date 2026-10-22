import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { AMENITIES_LIST, PROPERTY_TYPES } from "../data/mockProperties";
import {
  Building2,
  PlusCircle,
  Calendar,
  Eye,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Upload,
  Sparkles,
  MapPin,
  ShieldCheck,
  Check,
  Coins,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export const LandlordDashboardPage = ({ onEditClick }) => {
  const {
    properties,
    currentUser,
    addProperty,
    deleteProperty,
    inspections,
    updateInspectionStatus,
    formatPrice,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState("listings"); // "listings" | "add-property" | "inspections" | "analytics"

  // Add Property Wizard State
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [furnishing, setFurnishing] = useState("Furnished");
  const [price, setPrice] = useState("");
  const [depositRequired, setDepositRequired] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Port Harcourt");
  const [neighborhood, setNeighborhood] = useState("");
  const [bedrooms, setBedrooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("2");
  const [parkingSpaces, setParkingSpaces] = useState("2");
  const [sizeSqft, setSizeSqft] = useState("1400");
  const [selectedAmenities, setSelectedAmenities] = useState([
    "Parking",
    "24/7 Security",
    "Solar Power Backup",
    "High-Speed Internet"
  ]);
  const [imageUrl, setImageUrl] = useState(
    "/properties/property-bungalow-steps.jpg"
  );
  const [description, setDescription] = useState("");

  // Preset luxury images for quick landlord testing
  const sampleImages = [
    { label: "Bungalow Entrance", url: "/properties/property-bungalow-steps.jpg" },
    { label: "Lekki Living & Dining", url: "/properties/property-living-dining.jpg" },
    { label: "Primary Living Room", url: "/properties/property-living-room.jpg" },
    { label: "Master Bedroom Suite", url: "/properties/property-master-bedroom.jpg" },
    { label: "Executive Bungalow", url: "/properties/property-bungalow-scallop.jpg" }
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddPropertySubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !address) return;

    const newPropId = addProperty({
      title,
      propertyType,
      furnishing,
      price: parseFloat(price),
      depositRequired: parseFloat(depositRequired) || 0,
      serviceCharge: parseFloat(serviceCharge) || 0,
      pricePeriod: "year",
      currency: "NGN",
      location: {
        address,
        city,
        state: city === "Lagos" ? "Lagos State" : city === "Port Harcourt" ? "Rivers State" : city === "Abuja" ? "FCT" : "State",
        neighborhood: neighborhood || address,
        lat: 4.8156,
        lng: 7.0498,
        commuteInfo: "Close to central commercial corridor and expressway"
      },
      specs: {
        bedrooms: parseInt(bedrooms, 10),
        bathrooms: parseInt(bathrooms, 10),
        toilets: parseInt(bathrooms, 10) + 1,
        sizeSqft: parseInt(sizeSqft, 10) || 1200,
        parkingSpaces: parseInt(parkingSpaces, 10) || 1,
        floorNumber: 2,
        totalFloors: 4,
        yearBuilt: 2024
      },
      images: [imageUrl],
      amenities: selectedAmenities,
      description: description || "Modern well-ventilated property in serene gated neighborhood with steady security and treated water.",
      aiSummary: {
        matchHighlight: `Newly listed ${propertyType} in ${city} with ${selectedAmenities.slice(0, 2).join(" & ")}`,
        safetyScore: 9.6,
        affordabilityRating: "Competitive Market Value",
        commuteRating: "Direct Highway Access",
        noiseLevel: "Low / Residential",
        pros: selectedAmenities.slice(0, 3).map(a => `Includes ${a}`),
        cons: ["Standard tenant vetting required"]
      },
      agent: {
        name: currentUser.name,
        agency: currentUser.agency || "Independent Verified Landlord",
        avatar: currentUser.avatar,
        phone: currentUser.phone,
        email: currentUser.email,
        badge: "Verified Landlord",
        rating: 5.0,
        reviewCount: 1,
        verifiedDate: "Today"
      }
    });

    // Reset Form & switch tab
    setTitle("");
    setPrice("");
    setAddress("");
    setActiveTab("listings");
  };

  const pendingInspections = inspections.filter((i) => i.status === "Pending");
  const totalViews = properties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);

  return (
    <div className="dashboard-page-wrapper">
      {/* Landlord Header Bar */}
      <section className="dashboard-header-bg">
        <div className="container">
          <div className="dashboard-user-bar">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="dashboard-avatar"
            />
            <div className="dashboard-user-details">
              <div className="flex items-center gap-2">
                <h1 className="dashboard-user-name">{currentUser.name}</h1>
                <span className="badge badge-verified">Verified Agent / Landlord</span>
              </div>
              <p className="dashboard-user-meta">
                {currentUser.agency} • {currentUser.city} • ★ 4.9 Rating
              </p>
            </div>

            <div className="dashboard-quick-stats">
              <div className="stat-pill">
                <Building2 size={16} className="text-blue-500" />
                <span>{properties.length} Properties</span>
              </div>
              <div className="stat-pill">
                <Eye size={16} className="text-emerald-500" />
                <span>{totalViews.toLocaleString()} Views</span>
              </div>
              <div className="stat-pill">
                <Calendar size={16} className="text-amber-500" />
                <span>{inspections.length} Inspections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container py-8">
        <div className="dashboard-grid-layout">
          {/* Navigation Sidebar */}
          <aside className="dashboard-nav-card">
            <button
              className={`dash-nav-btn ${activeTab === "listings" ? "active" : ""}`}
              onClick={() => setActiveTab("listings")}
            >
              <Building2 size={18} />
              <span>Manage Properties</span>
              <span className="dash-nav-count">{properties.length}</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "add-property" ? "active" : ""}`}
              onClick={() => setActiveTab("add-property")}
            >
              <PlusCircle size={18} />
              <span>+ Add New Listing</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "inspections" ? "active" : ""}`}
              onClick={() => setActiveTab("inspections")}
            >
              <Calendar size={18} />
              <span>Inspection Leads</span>
              {pendingInspections.length > 0 && (
                <span className="badge badge-featured ml-auto">
                  {pendingInspections.length} New
                </span>
              )}
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <TrendingUp size={18} />
              <span>Listing Analytics</span>
            </button>
          </aside>

          {/* Main Tab Content */}
          <main className="dashboard-content-card">
            {/* Tab: Manage Listings */}
            {activeTab === "listings" && (
              <div>
                <div className="dash-section-header flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Your Property Listings ({properties.length})
                    </h2>
                    <p className="text-xs text-gray-500">
                      Manage active leases, pricing, and live availability.
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => setActiveTab("add-property")}
                  >
                    <PlusCircle size={14} /> Add Property
                  </button>
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 font-semibold uppercase tracking-wider">
                        <th className="py-3 px-2">Property</th>
                        <th className="py-3 px-2">Location</th>
                        <th className="py-3 px-2">Price</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2">Views</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={prop.images[0]}
                                alt={prop.title}
                                className="w-10 h-10 object-cover rounded-md"
                              />
                              <div className="font-bold text-gray-900 dark:text-white max-w-[200px] truncate">
                                {prop.title}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-gray-500">
                            {prop.location.city}
                          </td>
                          <td className="py-3 px-2 font-bold text-blue-600 dark:text-blue-400">
                            {formatPrice(prop.price)}/yr
                          </td>
                          <td className="py-3 px-2">
                            <span className="badge badge-verified">
                              {prop.verificationStatus}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-gray-500">
                            {prop.viewsCount || 0}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded"
                                onClick={() => onEditClick && onEditClick(prop)}
                                title="Edit property details"
                              >
                                <Edit size={15} />
                              </button>
                              <button
                                className="p-1.5 text-gray-500 hover:text-blue-600"
                                onClick={() => navigateTo("property-detail", prop.id)}
                                title="View details"
                              >
                                <ExternalLink size={15} />
                              </button>
                              <button
                                className="p-1.5 text-rose-500 hover:text-rose-700"
                                onClick={() => deleteProperty(prop.id)}
                                title="Delete listing"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Add New Property Wizard */}
            {activeTab === "add-property" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Publish a New Verified Property
                  </h2>
                  <p className="text-xs text-gray-500">
                    Fill in the property details to instantly publish to SMART-AI search engine.
                  </p>
                </div>

                <form onSubmit={handleAddPropertySubmit} className="mt-6 space-y-6">
                  {/* Section 1: Basic Info */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                      <Building2 size={16} className="text-blue-500" /> Basic Overview & Pricing
                    </h3>

                    <div className="form-group">
                      <label className="form-label">Property Title</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        placeholder="e.g. Luxury 2-Bedroom Serviced Apartment with Solar Inverter"
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
                          placeholder="e.g. 1500000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group">
                        <label className="form-label">Caution Deposit (₦)</label>
                        <input
                          type="number"
                          value={depositRequired}
                          onChange={(e) => setDepositRequired(e.target.value)}
                          className="form-control"
                          placeholder="e.g. 200000"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Annual Service Charge (₦)</label>
                        <input
                          type="number"
                          value={serviceCharge}
                          onChange={(e) => setServiceCharge(e.target.value)}
                          className="form-control"
                          placeholder="e.g. 150000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Location & Address */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                      <MapPin size={16} className="text-blue-500" /> Location Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="form-group sm:col-span-2">
                        <label className="form-label">Full Street Address</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          placeholder="e.g. 14 Peter Odili Road, Trans-Amadi"
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
                    </div>
                  </div>

                  {/* Section 3: Specs & Amenities */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                      Layout Specifications & Amenities
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
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
                        <label className="form-label">Parking Slots</label>
                        <input
                          type="number"
                          value={parkingSpaces}
                          onChange={(e) => setParkingSpaces(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Size (Sqft)</label>
                        <input
                          type="number"
                          value={sizeSqft}
                          onChange={(e) => setSizeSqft(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <label className="form-label mb-2">Select Included Amenities</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {AMENITIES_LIST.map((a) => {
                        const isChecked = selectedAmenities.includes(a);
                        return (
                          <label
                            key={a}
                            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer ${
                              isChecked
                                ? "bg-blue-50 dark:bg-blue-950/40 border-blue-400 font-semibold text-blue-700 dark:text-blue-300"
                                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAmenity(a)}
                              className="hidden"
                            />
                            {isChecked && <Check size={12} />}
                            <span>{a}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 4: Photo URL & Preview */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
                      <Upload size={16} className="text-blue-500" /> Property Photos
                    </h3>

                    <div className="form-group">
                      <label className="form-label">High-Resolution Photo URL</label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="text-xs text-gray-400 mb-2">Or select from presets:</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sampleImages.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImageUrl(s.url)}
                          className="btn btn-sm btn-secondary text-xs"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    {imageUrl && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Image Preview:</div>
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-full max-h-56 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>

                  {/* Section 5: Description */}
                  <div className="form-group">
                    <label className="form-label">Detailed Description</label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      placeholder="Describe the finishing, security arrangements, power supply, neighborhood vibe, and rules..."
                    ></textarea>
                  </div>

                  {/* Submit CTA */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setActiveTab("listings")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-accent btn-lg">
                      <Sparkles size={16} /> Publish Listing Instantly
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tab: Inspection Appointments Manager */}
            {activeTab === "inspections" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Inspection Leads & Requests ({inspections.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Approve or reschedule prospective tenant in-person walkthroughs.
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  {inspections.map((insp) => (
                    <div key={insp.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span
                          className={`badge badge-status badge-status-${
                            insp.status === "Approved" ? "approved" : "pending"
                          }`}
                        >
                          ● {insp.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          Booking ID: {insp.id}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-gray-900 dark:text-white">
                        {insp.propertyTitle}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs">
                        <div>
                          <div className="text-gray-400">Prospect:</div>
                          <div className="font-bold text-gray-800 dark:text-gray-200">
                            {insp.renterName}
                          </div>
                          <div className="text-gray-500">{insp.renterPhone}</div>
                        </div>

                        <div>
                          <div className="text-gray-400">Requested Time:</div>
                          <div className="font-bold text-gray-800 dark:text-gray-200">
                            📅 {insp.date}
                          </div>
                          <div className="text-gray-500">{insp.timeSlot}</div>
                        </div>

                        <div>
                          <div className="text-gray-400">Notes:</div>
                          <div className="text-gray-600 dark:text-gray-300">
                            {insp.notes || "No special notes."}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        {insp.status === "Pending" ? (
                          <>
                            <button
                              className="btn btn-sm btn-outline text-rose-500"
                              onClick={() => updateInspectionStatus(insp.id, "Cancelled")}
                            >
                              Decline
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => updateInspectionStatus(insp.id, "Approved")}
                            >
                              <CheckCircle size={14} /> Approve Appointment
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-emerald-600 font-semibold">
                            ✓ Confirmed & Tenant Notified
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Analytics */}
            {activeTab === "analytics" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Listing Analytics & Performance
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-xs text-blue-600 font-bold uppercase">
                      Total Impressions
                    </div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1 font-heading">
                      {totalViews.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      Across all {properties.length} active listings
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="text-xs text-emerald-600 font-bold uppercase">
                      Inspection Requests
                    </div>
                    <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-200 mt-1 font-heading">
                      {inspections.length}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      Avg. 3.4 bookings per property
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="text-xs text-amber-600 font-bold uppercase">
                      Tenant Match Rate
                    </div>
                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-200 mt-1 font-heading">
                      94.8%
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      AI Lead Quality Score
                    </div>
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
