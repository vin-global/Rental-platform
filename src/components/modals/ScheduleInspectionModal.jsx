import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  X,
  ShieldCheck,
  CheckCircle2,
  Building2
} from "lucide-react";

export const ScheduleInspectionModal = ({ property, onClose }) => {
  const { currentUser, bookInspection, formatPrice } = useApp();

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("11:00 AM - 12:00 PM");
  const [renterName, setRenterName] = useState(currentUser.name || "Amina Yusuf");
  const [renterEmail, setRenterEmail] = useState(currentUser.email || "amina.y@example.com");
  const [renterPhone, setRenterPhone] = useState(currentUser.phone || "+234 802 333 4455");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!property) return null;

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "04:00 PM - 05:00 PM",
    "05:30 PM - 06:30 PM"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      bookInspection({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: `${property.location.neighborhood || property.location.address}, ${property.location.city}`,
        propertyPrice: property.price,
        propertyImage: property.images[0],
        date,
        timeSlot,
        renterName,
        renterEmail,
        renterPhone,
        notes: notes || "Standard physical property inspection.",
        agentName: property.agent?.name || "Verified Agent"
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <span className="badge badge-ai mb-2">
            <ShieldCheck size={13} /> Verified In-Person Walkthrough
          </span>
          <h2 id="schedule-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
            Schedule a Property Inspection
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose your preferred date and time to physically inspect this property accompanied by the verified agent.
          </p>
        </div>

        {/* Property Mini Summary Card */}
        <div className="property-mini-preview">
          <img
            src={property.images[0]}
            alt={property.title}
            className="property-mini-img"
          />
          <div className="property-mini-info">
            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
              {property.title}
            </h4>
            <div className="text-xs text-gray-500 mt-0.5">
              {property.location.address}, {property.location.city}
            </div>
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
              {formatPrice(property.price)}/{property.pricePeriod || "year"} • {property.specs.bedrooms} Beds
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Preferred Date */}
            <div className="form-group">
              <label className="form-label">
                <Calendar size={14} className="inline mr-1 text-blue-500" /> Select Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
              />
            </div>

            {/* Preferred Time Slot */}
            <div className="form-group">
              <label className="form-label">
                <Clock size={14} className="inline mr-1 text-blue-500" /> Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="form-control"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">
                <User size={14} className="inline mr-1 text-gray-500" /> Your Full Name
              </label>
              <input
                type="text"
                required
                value={renterName}
                onChange={(e) => setRenterName(e.target.value)}
                className="form-control"
                placeholder="e.g. Amina Yusuf"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                <Phone size={14} className="inline mr-1 text-gray-500" /> Phone Number
              </label>
              <input
                type="tel"
                required
                value={renterPhone}
                onChange={(e) => setRenterPhone(e.target.value)}
                className="form-control"
                placeholder="+234 800 000 0000"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <Mail size={14} className="inline mr-1 text-gray-500" /> Email Address
              </label>
              <input
                type="email"
                required
                value={renterEmail}
                onChange={(e) => setRenterEmail(e.target.value)}
                className="form-control"
                placeholder="name@domain.com"
              />
            </div>
          </div>

          {/* Notes / Special Requests */}
          <div className="form-group">
            <label className="form-label">
              <FileText size={14} className="inline mr-1 text-gray-500" /> Notes or Specific Questions for Agent (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-control"
              placeholder="e.g. Would like to verify the solar inverter output, check parking slot accessibility, and discuss service charge details."
            ></textarea>
          </div>

          {/* Agent Info Strip */}
          {property.agent && (
            <div className="agent-mini-card mb-4">
              <img
                src={property.agent.avatar}
                alt={property.agent.name}
                className="agent-mini-avatar"
              />
              <div className="agent-mini-details">
                <div className="agent-mini-name">{property.agent.name}</div>
                <div className="agent-mini-agency">{property.agent.agency} • {property.agent.badge}</div>
              </div>
              <span className="badge badge-verified ml-auto">
                ★ {property.agent.rating} ({property.agent.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Safety Notice */}
          <div className="inspection-safety-box mb-4">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-600 dark:text-gray-300">
              <strong>SMART-AI Anti-Fraud Protection:</strong> Never transfer caution deposits or inspection fees in cash to any third party before physical verification and official lease issuance.
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-accent"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking Appointment..." : "Confirm Inspection Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
