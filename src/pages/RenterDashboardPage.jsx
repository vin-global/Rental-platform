import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { PropertyCard } from "../components/common/PropertyCard";
import {
  User,
  Heart,
  Calendar,
  FileCheck,
  Sparkles,
  History,
  MessageSquare,
  Bell,
  CheckCircle2,
  Clock,
  MapPin,
  Trash2,
  Send,
  ArrowRight
} from "lucide-react";

export const RenterDashboardPage = ({ onScheduleClick }) => {
  const {
    currentUser,
    properties,
    favorites,
    inspections,
    applications,
    conversations,
    notifications,
    searchHistory,
    formatPrice,
    sendMessage,
    navigateTo,
    recordSearch
  } = useApp();

  const [activeTab, setActiveTab] = useState("saved"); // "saved" | "inspections" | "applications" | "inbox" | "history" | "notifs"
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || null);
  const [replyText, setReplyText] = useState("");

  const favoriteProps = properties.filter((p) => favorites.includes(p.id));
  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;

    sendMessage(activeConversation.id, replyText);
    setReplyText("");
  };

  return (
    <div className="dashboard-page-wrapper">
      {/* Dashboard Top Hero */}
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
                <span className="badge badge-verified">Verified Renter</span>
              </div>
              <p className="dashboard-user-meta">
                {currentUser.occupation} • {currentUser.city} • Member since {currentUser.joinedDate}
              </p>
            </div>

            <div className="dashboard-quick-stats">
              <div className="stat-pill">
                <Heart size={16} className="text-rose-500" />
                <span>{favorites.length} Saved</span>
              </div>
              <div className="stat-pill">
                <Calendar size={16} className="text-amber-500" />
                <span>{inspections.length} Inspections</span>
              </div>
              <div className="stat-pill">
                <MessageSquare size={16} className="text-blue-500" />
                <span>{conversations.length} Inquiries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <div className="container py-8">
        <div className="dashboard-grid-layout">
          {/* Dashboard Sidebar Navigation */}
          <aside className="dashboard-nav-card">
            <button
              className={`dash-nav-btn ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              <Heart size={18} />
              <span>Saved Properties</span>
              <span className="dash-nav-count">{favorites.length}</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "inspections" ? "active" : ""}`}
              onClick={() => setActiveTab("inspections")}
            >
              <Calendar size={18} />
              <span>Scheduled Inspections</span>
              <span className="dash-nav-count">{inspections.length}</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "applications" ? "active" : ""}`}
              onClick={() => setActiveTab("applications")}
            >
              <FileCheck size={18} />
              <span>Rental Applications</span>
              <span className="dash-nav-count">{applications.length}</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "inbox" ? "active" : ""}`}
              onClick={() => setActiveTab("inbox")}
            >
              <MessageSquare size={18} />
              <span>Agent Inbox & Messages</span>
              <span className="dash-nav-count">{conversations.length}</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              <History size={18} />
              <span>Search History</span>
            </button>

            <button
              className={`dash-nav-btn ${activeTab === "notifs" ? "active" : ""}`}
              onClick={() => setActiveTab("notifs")}
            >
              <Bell size={18} />
              <span>Notifications</span>
              <span className="dash-nav-count">{notifications.length}</span>
            </button>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <button
                className="btn btn-ai w-full btn-sm"
                onClick={() => navigateTo("ai-recommendations")}
              >
                <Sparkles size={14} /> Recalculate AI Match
              </button>
            </div>
          </aside>

          {/* Main Tab Content */}
          <main className="dashboard-content-card">
            {/* Tab: Saved Properties */}
            {activeTab === "saved" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Saved Favorites ({favoriteProps.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Properties you bookmarked for later review, comparison, or inspection.
                  </p>
                </div>

                {favoriteProps.length === 0 ? (
                  <div className="empty-dash-state text-center py-12">
                    <Heart size={36} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No saved properties yet.</p>
                    <button
                      onClick={() => navigateTo("listings")}
                      className="btn btn-sm btn-primary mt-3"
                    >
                      Browse Listings
                    </button>
                  </div>
                ) : (
                  <div className="grid-properties mt-4">
                    {favoriteProps.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        onScheduleClick={onScheduleClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Inspections */}
            {activeTab === "inspections" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Scheduled Property Inspections ({inspections.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Track the real-time status of your in-person property walkthroughs.
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  {inspections.map((insp) => (
                    <div key={insp.id} className="inspection-card-item">
                      <img
                        src={insp.propertyImage}
                        alt={insp.propertyTitle}
                        className="inspection-card-img"
                      />
                      <div className="inspection-card-body">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span
                            className={`badge badge-status badge-status-${
                              insp.status === "Approved"
                                ? "approved"
                                : insp.status === "Completed"
                                ? "completed"
                                : insp.status === "Cancelled"
                                ? "cancelled"
                                : "pending"
                            }`}
                          >
                            ● {insp.status}
                          </span>
                          <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                            {formatPrice(insp.propertyPrice)}/yr
                          </span>
                        </div>

                        <h4
                          className="font-bold text-base text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer"
                          onClick={() => navigateTo("property-detail", insp.propertyId)}
                        >
                          {insp.propertyTitle}
                        </h4>

                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin size={13} className="text-blue-500" />
                          <span>{insp.propertyLocation}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs">
                          <div>
                            <span className="text-gray-400">Date & Time:</span>
                            <div className="font-semibold text-gray-800 dark:text-gray-200">
                              📅 {insp.date} ({insp.timeSlot})
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">Assigned Agent:</span>
                            <div className="font-semibold text-gray-800 dark:text-gray-200">
                              👤 {insp.agentName}
                            </div>
                          </div>
                        </div>

                        {insp.notes && (
                          <div className="text-xs text-gray-500 mt-2">
                            <strong>Inspection Notes:</strong> {insp.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Applications */}
            {activeTab === "applications" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Rental Applications ({applications.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Official lease pre-clearance and tenancy applications.
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="badge badge-status badge-status-pending">
                          {app.status}
                        </span>
                        <span className="text-xs text-gray-400">Submitted on {app.createdAt}</span>
                      </div>
                      <h4 className="font-bold text-base text-gray-900 dark:text-white">
                        {app.propertyTitle}
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">
                        Move-in: <strong>{app.moveInDate}</strong> • Lease Term: <strong>{app.leaseTerm}</strong> • Declared Monthly Income: <strong>{formatPrice(app.monthlyIncome)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Inbox */}
            {activeTab === "inbox" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Agent Messaging Inbox
                  </h2>
                  <p className="text-xs text-gray-500">
                    Direct communications with verified property managers.
                  </p>
                </div>

                <div className="inbox-container mt-4">
                  {/* Conversations Sidebar */}
                  <div className="inbox-threads-list">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`inbox-thread-item ${
                          activeConvId === conv.id ? "active" : ""
                        }`}
                        onClick={() => setActiveConvId(conv.id)}
                      >
                        <img
                          src={conv.agentAvatar}
                          alt={conv.agentName}
                          className="inbox-thread-avatar"
                        />
                        <div className="inbox-thread-info">
                          <div className="font-bold text-xs text-gray-900 dark:text-white truncate">
                            {conv.agentName}
                          </div>
                          <div className="text-[11px] text-gray-500 truncate">
                            {conv.propertyTitle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Area */}
                  {activeConversation ? (
                    <div className="inbox-chat-area">
                      <div className="inbox-chat-header">
                        <div className="font-bold text-sm text-gray-900 dark:text-white">
                          {activeConversation.agentName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {activeConversation.propertyTitle}
                        </div>
                      </div>

                      <div className="inbox-chat-messages">
                        {activeConversation.messages?.map((m) => (
                          <div
                            key={m.id}
                            className={`inbox-msg-bubble ${
                              m.sender === "renter" ? "msg-renter" : "msg-agent"
                            }`}
                          >
                            <div className="text-xs">{m.text}</div>
                            <span className="text-[10px] text-gray-400 mt-1 block">
                              {m.timestamp}
                            </span>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendReply} className="inbox-chat-form">
                        <input
                          type="text"
                          placeholder="Type your message to agent..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="form-control text-xs"
                        />
                        <button type="submit" className="btn btn-sm btn-primary">
                          <Send size={14} />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400 text-sm">
                      Select a conversation to start chatting.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Search History */}
            {activeTab === "history" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Search History & Saved Prompts
                  </h2>
                  <p className="text-xs text-gray-500">
                    Click any past query to re-execute natural search.
                  </p>
                </div>

                <div className="space-y-2 mt-4">
                  {searchHistory.map((query, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        recordSearch(query);
                        navigateTo("listings", null, { rawQuery: query });
                      }}
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                        <Sparkles size={15} className="text-blue-500" />
                        <span>{query}</span>
                      </div>
                      <ArrowRight size={15} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Notifications */}
            {activeTab === "notifs" && (
              <div>
                <div className="dash-section-header">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Notification Alerts
                  </h2>
                </div>

                <div className="space-y-3 mt-4">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-lg border ${
                        !n.read
                          ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                          {n.title}
                        </span>
                        <span className="text-[11px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
