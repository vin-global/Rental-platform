import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Star, X, MessageSquareHeart } from "lucide-react";

export const LeaveReviewModal = ({ property, onClose }) => {
  const { addPropertyReview } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addPropertyReview(property.id, {
      rating,
      comment
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="mb-4">
          <span className="badge badge-ai mb-2">
            <MessageSquareHeart size={13} /> Community Feedback
          </span>
          <h2 id="review-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
            Leave a Property Review
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Share your inspection or tenancy experience with other prospective renters.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Star Selector */}
          <div className="form-group text-center py-2">
            <label className="form-label mb-2">Your Rating</label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    size={28}
                    className={`${
                      (hoverRating || rating) >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500 font-semibold mt-1 inline-block">
              {rating === 5
                ? "5.0 - Exceptional Experience"
                : rating === 4
                ? "4.0 - Very Good"
                : rating === 3
                ? "3.0 - Average"
                : "Below Average"}
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Your Review & Comments</label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-control"
              placeholder="How was the environment, water pressure, solar backup, security, and agent professionalism?"
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
            <button type="submit" className="btn btn-sm btn-primary">
              Submit Verified Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
