import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AlertTriangle, X, ShieldAlert } from "lucide-react";

export const ReportListingModal = ({ property, onClose }) => {
  const { reportProperty } = useApp();
  const [reason, setReason] = useState("Inaccurate Pricing / Fake Listing");
  const [details, setDetails] = useState("");

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    reportProperty(property.id, `${reason}: ${details || "No additional comments"}`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="mb-4">
          <span className="badge badge-status badge-status-cancelled mb-2">
            <ShieldAlert size={13} /> Trust & Safety Moderation
          </span>
          <h2 id="report-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
            Report This Property Listing
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Our integrity & fraud prevention team will investigate within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Reason for Report</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-control"
            >
              <option value="Inaccurate Pricing / Fake Listing">Inaccurate Pricing / Fake Listing</option>
              <option value="Property Already Rented / Unavailable">Property Already Rented / Unavailable</option>
              <option value="Misleading Images or Location">Misleading Images or Location</option>
              <option value="Suspected Fraud / Unverified Agent">Suspected Fraud / Unverified Agent</option>
              <option value="Duplicate Listing">Duplicate Listing</option>
              <option value="Other Policy Violation">Other Policy Violation</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Details (Optional)</label>
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="form-control"
              placeholder="Please describe what you observed during inspection or agent contact..."
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-accent">
              <AlertTriangle size={14} /> Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
