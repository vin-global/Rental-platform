import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Building2,
  Sparkles,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Heart,
  CheckCircle
} from "lucide-react";

export const Footer = () => {
  const { navigateTo, setCurrentRole } = useApp();

  return (
    <footer className="footer-wrapper">
      {/* Top Banner: Landlord CTA */}
      <div className="footer-cta-banner">
        <div className="container">
          <div className="footer-cta-content">
            <div className="footer-cta-text">
              <span className="badge badge-featured mb-2">Are you a Landlord or Real Estate Agent?</span>
              <h3 className="footer-cta-title">List Your Properties with SMART-AI Today</h3>
              <p className="footer-cta-desc">
                Reach thousands of verified, pre-screened tenants, automate inspection appointments, and get AI-matched renters directly to your dashboard.
              </p>
            </div>
            <div className="footer-cta-actions">
              <button
                className="btn btn-accent btn-lg"
                onClick={() => {
                  setCurrentRole("landlord");
                  navigateTo("landlord-dashboard");
                }}
              >
                List Your Property Free <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Col */}
            <div className="footer-brand-col">
              <div className="footer-logo">
                <div className="brand-icon-box">
                  <Building2 size={22} className="text-white" />
                  <span className="brand-ai-dot"></span>
                </div>
                <span className="brand-title text-white">
                  SMART<span className="brand-ai-gradient">-AI</span>
                </span>
              </div>
              <p className="footer-brand-bio">
                The next-generation AI-powered house rental marketplace connecting verified renters and landlords across Nigeria. Intelligent natural-language discovery, fraud prevention, and seamless bookings.
              </p>
              <div className="footer-badge-trust">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>100% Physical Property & Agent Verification</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-col">
              <h4 className="footer-heading">Platform</h4>
              <ul className="footer-link-list">
                <li>
                  <button onClick={() => navigateTo("listings")} className="footer-link">
                    Find a Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("ai-recommendations")} className="footer-link">
                    AI Matchmaker
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("compare")} className="footer-link">
                    Property Comparison
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("how-it-works")} className="footer-link">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("renter-dashboard")} className="footer-link">
                    Renter Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Popular Locations */}
            <div className="footer-links-col">
              <h4 className="footer-heading">Popular Hubs</h4>
              <ul className="footer-link-list">
                <li>
                  <button
                    onClick={() => navigateTo("listings", null, { location: "Port Harcourt" })}
                    className="footer-link"
                  >
                    Port Harcourt Rentals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("listings", null, { location: "Lagos" })}
                    className="footer-link"
                  >
                    Lekki & Ikoyi Apartments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("listings", null, { location: "Abuja" })}
                    className="footer-link"
                  >
                    Abuja Maitama Penthouses
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("listings", null, { location: "Ibadan" })}
                    className="footer-link"
                  >
                    Ibadan Bodija Homes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("listings", null, { location: "Enugu" })}
                    className="footer-link"
                  >
                    Enugu GRA Flats
                  </button>
                </li>
              </ul>
            </div>

            {/* Company & Support */}
            <div className="footer-links-col">
              <h4 className="footer-heading">Company & Help</h4>
              <ul className="footer-link-list">
                <li>
                  <button onClick={() => navigateTo("about")} className="footer-link">
                    About SMART-AI
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("contact")} className="footer-link">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("faq")} className="footer-link">
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("admin-dashboard")} className="footer-link text-blue-400">
                    Admin Portal Demo
                  </button>
                </li>
              </ul>
              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <Mail size={14} /> support@smartairental.ng
                </div>
                <div className="footer-contact-item">
                  <Phone size={14} /> +234 (0) 800 762 7824
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2026 SMART-AI House Rental Technologies Ltd. All rights reserved.
            </div>
            <div className="footer-bottom-tags">
              <span className="footer-tag">🔒 End-to-End Encrypted</span>
              <span className="footer-tag">⚡ Powered by Advanced AI</span>
              <span className="footer-tag">🇳🇬 Nigerian Real Estate Standard</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
