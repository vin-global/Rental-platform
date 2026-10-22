import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  Building2,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Edit3,
  PlusCircle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  MapPin
} from "lucide-react";

export const AdminDashboardPage = ({ onEditClick }) => {
  const {
    properties,
    verifyProperty,
    deleteProperty,
    resetPropertiesToDefault,
    reportedListings,
    formatPrice,
    navigateTo,
    setCurrentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState("all-properties"); // "all-properties" | "verification" | "reports" | "users"

  return (
    <div className="dashboard-page-wrapper">
      {/* Admin Top Header */}
      <section className="dashboard-header-bg">
        <div className="container">
          <div className="dashboard-user-bar">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg border-2 border-white/20">
              <ShieldCheck size={28} />
            </div>
            <div className="dashboard-user-details">
              <div className="flex items-center gap-2">
                <h1 className="dashboard-user-name">SMART-AI Administration Portal</h1>
                <span className="badge badge-featured">Super Admin Mode</span>
              </div>
              <p className="dashboard-user-meta">
                Live Property Editing, Verification Control & Trust Moderation
              </p>
            </div>

            <div className="dashboard-quick-stats">
              <div className="stat-pill">
                <Building2 size={16} className="text-blue-500" />
                <span>{properties.length} Active Listings</span>
              </div>
              <div className="stat-pill">
                <AlertTriangle size={16} className="text-rose-500" />
                <span>{reportedListings.length} Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="dashboard-grid-layout">
          {/* Admin Nav */}
          <aside className="dashboard-nav-card">
            <button
              className={`dash-nav-btn ${activeTab === "all-properties" ? "active" : ""}`}
              onClick={() => setActiveTab("all-properties")}
            >
              <Edit3 size={18} />
              <span>Edit & Manage Properties</span>
              <span className="dash-nav-count">{properties.length}</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "verification" ? "active" : ""}`}
              onClick={() => setActiveTab("verification")}
            >
              <ShieldCheck size={18} />
              <span>Verification Queue</span>
              <span className="dash-nav-count">
                {properties.filter((p) => p.verificationStatus === "Verified").length}
              </span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "reports" ? "active" : ""}`}
              onClick={() => setActiveTab("reports")}
            >
              <AlertTriangle size={18} />
              <span>Reported Listings</span>
              {reportedListings.length > 0 && (
                <span className="badge badge-status badge-status-cancelled ml-auto">
                  {reportedListings.length}
                </span>
              )}
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <Users size={18} />
              <span>User Directory</span>
            </button>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <button
                className="btn btn-sm btn-accent w-full"
                onClick={() => {
                  setCurrentRole("landlord");
                  navigateTo("landlord-dashboard");
                }}
              >
                <PlusCircle size={14} /> + Add New Listing
              </button>

              <button
                className="btn btn-sm btn-secondary w-full text-xs text-gray-500 hover:text-rose-500"
                onClick={resetPropertiesToDefault}
                title="Reset all properties to initial factory dataset"
              >
                <RotateCcw size={12} /> Reset Catalog to Defaults
              </button>
            </div>
          </aside>

          {/* Admin Content */}
          <main className="dashboard-content-card">
            {/* Tab 1: Edit & Manage All Properties */}
            {activeTab === "all-properties" && (
              <div>
                <div className="dash-section-header flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Edit3 size={18} className="text-blue-500" />
                      Edit Property Database ({properties.length} Homes)
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Click <strong>"Edit Details"</strong> on any listing to modify prices, photos, amenities, bedrooms, city, or AI scores.
                    </p>
                  </div>

                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => {
                      setCurrentRole("landlord");
                      navigateTo("landlord-dashboard");
                    }}
                  >
                    <PlusCircle size={14} /> + Add New Property
                  </button>
                </div>

                <div className="space-y-4 mt-4">
                  {properties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:border-blue-400 transition-all flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-[280px]">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-20 h-20 object-cover rounded-lg shrink-0 border"
                        />
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`badge ${
                                prop.verificationStatus === "Verified"
                                  ? "badge-verified"
                                  : "badge-status-pending"
                              }`}
                            >
                              {prop.verificationStatus}
                            </span>
                            <span className="badge badge-ai text-[10px]">
                              {prop.propertyType} • {prop.specs.bedrooms} Beds
                            </span>
                          </div>

                          <h3
                            className="font-bold text-sm text-gray-900 dark:text-white truncate cursor-pointer hover:text-blue-600"
                            onClick={() => navigateTo("property-detail", prop.id)}
                            title={prop.title}
                          >
                            {prop.title}
                          </h3>

                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-blue-500 shrink-0" />
                            <span className="truncate">
                              {prop.location.address}, {prop.location.city}
                            </span>
                          </div>

                          <div className="text-sm font-bold text-blue-600 dark:text-blue-400 font-heading mt-1">
                            {formatPrice(prop.price)}/{prop.pricePeriod || "year"}
                          </div>
                        </div>
                      </div>

                      {/* Admin Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          className="btn btn-sm btn-primary text-xs"
                          onClick={() => onEditClick && onEditClick(prop)}
                        >
                          <Edit3 size={13} /> Edit Details
                        </button>

                        <button
                          className="btn btn-sm btn-outline text-xs"
                          onClick={() => navigateTo("property-detail", prop.id)}
                          title="View live page"
                        >
                          <Eye size={13} /> View
                        </button>

                        <button
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                          onClick={() => deleteProperty(prop.id)}
                          title="Delete listing"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Verification Queue */}
            {activeTab === "verification" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Property Physical Verification Queue
                  </h2>
                  <p className="text-xs text-gray-500">
                    Review and toggle validation status for all catalog listings.
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  {properties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4
                            className="font-bold text-sm text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer"
                            onClick={() => navigateTo("property-detail", prop.id)}
                          >
                            {prop.title}
                          </h4>
                          <div className="text-xs text-gray-500">
                            {prop.location.address}, {prop.location.city} • {formatPrice(prop.price)}/yr
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Agent: <strong>{prop.agent?.name}</strong> ({prop.agent?.agency})
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`badge ${
                            prop.verificationStatus === "Verified"
                              ? "badge-verified"
                              : "badge-status-pending"
                          }`}
                        >
                          {prop.verificationStatus}
                        </span>

                        <button
                          className="btn btn-sm btn-secondary text-xs"
                          onClick={() => onEditClick && onEditClick(prop)}
                        >
                          <Edit3 size={12} /> Edit
                        </button>

                        {prop.verificationStatus === "Verified" ? (
                          <button
                            className="btn btn-sm btn-outline text-amber-600 text-xs"
                            onClick={() => verifyProperty(prop.id, "Pending")}
                          >
                            Mark Pending
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-primary text-xs"
                            onClick={() => verifyProperty(prop.id, "Verified")}
                          >
                            <CheckCircle size={13} /> Grant Verification Badge
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Reported Listings */}
            {activeTab === "reports" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Reported Listings & Moderation Queue
                  </h2>
                  <p className="text-xs text-gray-500">
                    Complaints submitted by users regarding fraud, duplicate pricing, or inaccurate specs.
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  {reportedListings.map((rep) => (
                    <div
                      key={rep.id}
                      className="p-4 bg-rose-50/40 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="badge badge-status badge-status-cancelled">
                          {rep.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          Reported on {rep.date} by {rep.reportedBy}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mt-1">
                        {rep.propertyTitle}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        <strong>Reason:</strong> {rep.reason}
                      </p>

                      <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-rose-100 dark:border-rose-900">
                        <button
                          className="btn btn-sm btn-secondary text-xs"
                          onClick={() => navigateTo("property-detail", rep.propertyId)}
                        >
                          Inspect Listing
                        </button>
                        <button
                          className="btn btn-sm btn-primary text-xs"
                          onClick={() => {
                            deleteProperty(rep.propertyId);
                          }}
                        >
                          <Trash2 size={13} /> Remove Listing from Platform
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Users */}
            {activeTab === "users" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Platform User Directory
                  </h2>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">
                        Amina Yusuf (Renter)
                      </div>
                      <div className="text-xs text-gray-500">
                        amina.y@example.com • Port Harcourt • Verified ID
                      </div>
                    </div>
                    <span className="badge badge-verified">Active</span>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">
                        Chukwudi Nwosu (PrimeShield Realty)
                      </div>
                      <div className="text-xs text-gray-500">
                        chukwudi.n@primeshield.ng • Licensed Agent
                      </div>
                    </div>
                    <span className="badge badge-verified">Diamond Agent</span>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">
                        Folake Adeleke (Haven Heights)
                      </div>
                      <div className="text-xs text-gray-500">
                        folake@havenheights.ng • Lagos
                      </div>
                    </div>
                    <span className="badge badge-verified">Verified Broker</span>
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
