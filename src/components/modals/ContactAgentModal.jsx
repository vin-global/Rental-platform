import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  MessageSquare,
  Send,
  X,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  Clock
} from "lucide-react";

export const ContactAgentModal = ({ property, onClose }) => {
  const { currentUser, sendMessage, showToast } = useApp();
  const [messageText, setMessageText] = useState(
    `Hello ${property.agent?.name || "Agent"}, I'm interested in "${property.title}". Is it still available for inspection this week?`
  );
  const [phone, setPhone] = useState(currentUser.phone || "+234 802 333 4455");

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    sendMessage(null, messageText, property.id, property.agent);
    showToast("Message sent to agent! Check your inbox for replies.", "success");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <span className="badge badge-ai mb-2">
            <MessageSquare size={13} /> Direct Agent Inquiry
          </span>
          <h2 id="contact-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
            Chat with Verified Agent
          </h2>
        </div>

        {/* Agent Profile Box */}
        {property.agent && (
          <div className="agent-detail-card mb-4">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="agent-detail-avatar"
            />
            <div className="agent-detail-info">
              <div className="flex items-center gap-2">
                <span className="agent-name-lg">{property.agent.name}</span>
                <ShieldCheck size={16} className="text-emerald-500" />
              </div>
              <div className="agent-agency-text">{property.agent.agency}</div>
              <div className="agent-meta-row">
                <span>★ {property.agent.rating} ({property.agent.reviewCount} reviews)</span>
                <span>• Active Member since {property.agent.verifiedDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Property Context */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
          <div className="text-xs text-gray-500">Inquiring about:</div>
          <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
            {property.title}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
            {property.location.address}, {property.location.city}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Phone Number for Quick WhatsApp / Call</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <a
              href={`tel:${property.agent?.phone || "+2348000000000"}`}
              className="btn btn-sm btn-outline"
            >
              <Phone size={14} /> Call Agent
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                <Send size={14} /> Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
