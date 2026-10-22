import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Search,
  Scale,
  Calendar,
  CheckCircle,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  Lock
} from "lucide-react";

/**
 * About Page
 */
export const AboutPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="static-page-wrapper">
      <section className="static-hero-section">
        <div className="container text-center">
          <span className="badge badge-ai mb-3">
            <Sparkles size={14} /> Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Transforming House Rentals with <br />
            <span className="text-gradient-amber">Intelligent AI & Absolute Trust</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            SMART-AI was founded to solve Nigeria's most frustrating housing challenges: fake listings, exorbitant hidden caution fees, and unverified agents.
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Core Values */}
        <div className="grid-cols-3 mb-16">
          <div className="value-card">
            <div className="value-icon bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              <Sparkles size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Neural Matchmaking
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We replace tedious filter searches with natural-language discovery and lifestyle compatibility scoring.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              100% In-Person Verification
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Every property on our platform is physically inspected, document-checked, and geo-located by our team.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400">
              <Lock size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Zero Hidden Caution Fees
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Transparent, upfront breakdowns of caution deposits and annual service charges before you book.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="p-8 bg-surface-section rounded-2xl border border-gray-200 dark:border-gray-800 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Built for Modern Tenants & Professional Landlords
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Whether you are a tech worker in Port Harcourt seeking 24/7 solar backup, an executive relocating to Abuja Maitama, or a growing family in Lekki, SMART-AI simplifies your journey from discovery to inspection to key handover.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo("listings")}
          >
            Explore Verified Listings
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * How It Works Page
 */
export const HowItWorksPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="static-page-wrapper">
      <section className="static-hero-section">
        <div className="container text-center">
          <span className="badge badge-ai mb-3">
            <Award size={14} /> The SMART-AI Experience
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            How Renting Works on SMART-AI
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            From smart prompt search to verified in-person walkthroughs and digital leasing.
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="step-detailed-card">
            <div className="step-badge">1</div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                Natural-Language & Lifestyle AI Search
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Type queries like <em>\"Find me a 2-bedroom in Port Harcourt under ₦1.5 million with parking\"</em>. Our NLP system identifies your budget ceiling, bedroom needs, and priority amenities instantly.
              </p>
            </div>
          </div>

          <div className="step-detailed-card">
            <div className="step-badge">2</div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                Review Compatibility & Compare Options
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Check AI safety scores, power reliability indexes, and side-by-side matrices across up to 4 homes to make an informed, data-driven decision.
              </p>
            </div>
          </div>

          <div className="step-detailed-card">
            <div className="step-badge">3</div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                Schedule Verified In-Person Walkthrough
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pick your preferred date and time slot. Meet the licensed property manager on-site for a complete walkthrough of the amenities and facilities.
              </p>
            </div>
          </div>

          <div className="step-detailed-card">
            <div className="step-badge">4</div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                Direct Transparent Agreement & Move In
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Review your digital tenancy agreement with zero hidden markups or unauthorized agent fees. Settle in with peace of mind.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            className="btn btn-accent btn-lg"
            onClick={() => navigateTo("listings")}
          >
            Start Your Property Search Now
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * FAQ Page
 */
export const FaqPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does the AI natural language search work?",
      a: "Our AI engine parses natural English sentences to automatically detect your desired city (e.g. Port Harcourt, Lagos, Abuja), budget limit (e.g. under ₦1.5M), bedroom requirements, and lifestyle amenities (e.g. 24/7 solar backup, parking). It matches these against our verified property database in real-time."
    },
    {
      q: "How does SMART-AI verify landlords and properties?",
      a: "Every listing displaying the green 'Verified' badge has undergone on-site physical inspection by our field agents, title/deed cross-referencing, and identity verification of the property manager or landlord. This eliminates fake listings and duplicate broker scams."
    },
    {
      q: "Are inspection appointments completely free?",
      a: "Yes! Booking an in-person inspection via SMART-AI is 100% free of charge. You simply choose your preferred date and time slot, and the verified agent will meet you at the property."
    },
    {
      q: "How does the 30% Rent-to-Income Affordability rule work?",
      a: "Financial wellness standards recommend allocating no more than 30% of your gross annual income towards housing. Our built-in Affordability Calculator computes your ideal budget bracket to ensure you live comfortably without financial strain."
    },
    {
      q: "How can I list my property as a landlord or agent?",
      a: "Click 'List Property' in the navigation bar or switch to Landlord mode. You can publish your property using our intuitive multi-step wizard, set pricing, upload high-res photos, and manage tenant inspection bookings directly from your dashboard."
    }
  ];

  return (
    <div className="static-page-wrapper">
      <section className="static-hero-section">
        <div className="container text-center">
          <span className="badge badge-ai mb-3">
            <HelpCircle size={14} /> Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Everything you need to know about search, inspections, AI matchmaking, and listing properties.
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="faq-accordion-card"
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
            >
              <div className="flex items-center justify-between font-bold text-base text-gray-900 dark:text-white cursor-pointer py-1">
                <span>{faq.q}</span>
                {openIdx === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {openIdx === idx && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Contact Us Page
 */
export const ContactPage = () => {
  const { showToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message sent! Our support team will reply within 2 hours.", "success");
  };

  return (
    <div className="static-page-wrapper">
      <section className="static-hero-section">
        <div className="container text-center">
          <span className="badge badge-ai mb-3">
            <Mail size={14} /> Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Contact SMART-AI Support
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Have questions about a listing, property verification, or partnership? We're here to assist you.
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Official Contact Hubs
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our support and property verification teams operate across Port Harcourt, Lagos, and Abuja.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">Headquarters</div>
                  <div className="text-xs text-gray-500">Peter Odili Corridor, Trans-Amadi, Port Harcourt, Rivers State</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <Phone size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">Direct Phone Line</div>
                  <div className="text-xs text-gray-500">+234 (0) 800 762 7824 (Mon - Sat, 8am - 6pm)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <Mail size={20} className="text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">Email Inquiries</div>
                  <div className="text-xs text-gray-500">support@smartairental.ng • listings@smartairental.ng</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Thank You, {name}!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Your message has been assigned to our customer team. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="e.g. Amina Yusuf"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-control"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <Send size={16} /> Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
