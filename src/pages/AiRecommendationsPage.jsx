import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { PropertyCard } from "../components/common/PropertyCard";
import {
  calculateAiMatchScore,
  calculateAffordability
} from "../services/aiService";
import {
  Sparkles,
  Calculator,
  Sliders,
  CheckCircle,
  HelpCircle,
  MapPin,
  Coins,
  SunMedium,
  Wifi,
  Car,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export const AiRecommendationsPage = ({ onScheduleClick }) => {
  const { properties, formatPrice, navigateTo } = useApp();

  // Questionnaire / Profile State
  const [budgetMax, setBudgetMax] = useState(2500000);
  const [monthlyIncome, setMonthlyIncome] = useState(600000);
  const [preferredCity, setPreferredCity] = useState("Port Harcourt");
  const [bedrooms, setBedrooms] = useState("2");
  const [requiresSolar, setRequiresSolar] = useState(true);
  const [requiresParking, setRequiresParking] = useState(true);
  const [remoteWorker, setRemoteWorker] = useState(true);
  const [petFriendly, setPetFriendly] = useState(false);

  // Active Tab ("wizard" | "affordability")
  const [activeTab, setActiveTab] = useState("wizard");

  // Calculate Matches
  const scoredProperties = useMemo(() => {
    const userProfile = {
      budgetMax,
      preferredCity,
      bedrooms,
      requiresSolar,
      requiresParking,
      remoteWorker,
      petFriendly
    };

    return properties
      .map((property) => {
        const matchData = calculateAiMatchScore(property, userProfile);
        return {
          ...property,
          aiScore: matchData.score,
          aiReasons: matchData.reasons,
          aiRating: matchData.rating
        };
      })
      .sort((a, b) => b.aiScore - a.aiScore);
  }, [
    properties,
    budgetMax,
    preferredCity,
    bedrooms,
    requiresSolar,
    requiresParking,
    remoteWorker,
    petFriendly
  ]);

  // Affordability calculation
  const affordabilityData = useMemo(() => {
    return calculateAffordability(monthlyIncome);
  }, [monthlyIncome]);

  return (
    <div className="ai-page-wrapper">
      {/* Header Banner */}
      <section className="ai-page-header">
        <div className="container">
          <div className="ai-page-header-content">
            <span className="badge badge-ai mb-2">
              <Sparkles size={14} /> Intelligent Real Estate Engine
            </span>
            <h1 className="ai-page-title">
              AI Matchmaker & Lifestyle Recommendation Hub
            </h1>
            <p className="ai-page-subtitle">
              Our neural matching algorithms analyze your income, remote work needs, power reliability, and location to rank every property specifically for your lifestyle.
            </p>

            {/* Tab Buttons */}
            <div className="ai-tab-switcher mt-6">
              <button
                className={`ai-tab-btn ${activeTab === "wizard" ? "active" : ""}`}
                onClick={() => setActiveTab("wizard")}
              >
                <Sparkles size={16} /> AI Lifestyle Matchmaker
              </button>
              <button
                className={`ai-tab-btn ${
                  activeTab === "affordability" ? "active" : ""
                }`}
                onClick={() => setActiveTab("affordability")}
              >
                <Calculator size={16} /> Rent-to-Income Affordability Calculator
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        {activeTab === "wizard" ? (
          /* Matchmaker Wizard & Scored Results */
          <div className="ai-matchmaker-grid">
            {/* Left Questionnaire Panel */}
            <aside className="ai-form-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Sliders size={18} className="text-blue-500" />
                  <span>Lifestyle Profile</span>
                </h3>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  Live Recalculation
                </span>
              </div>

              {/* Preferred City */}
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={14} className="inline mr-1 text-blue-500" /> Target City
                </label>
                <select
                  value={preferredCity}
                  onChange={(e) => setPreferredCity(e.target.value)}
                  className="form-control"
                >
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Lagos">Lagos (Lekki / Ikoyi / VI)</option>
                  <option value="Abuja">Abuja (Maitama / Jabi)</option>
                  <option value="Ibadan">Ibadan (Bodija)</option>
                  <option value="Enugu">Enugu (GRA)</option>
                </select>
              </div>

              {/* Max Annual Budget */}
              <div className="form-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="form-label mb-0">Annual Rent Ceiling</label>
                  <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                    {formatPrice(budgetMax)}
                  </span>
                </div>
                <input
                  type="range"
                  min={800000}
                  max={15000000}
                  step={100000}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Bedrooms */}
              <div className="form-group">
                <label className="form-label">Bedrooms Needed</label>
                <div className="flex gap-2">
                  {["1", "2", "3", "4", "5"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBedrooms(b)}
                      className={`btn btn-sm flex-1 ${
                        bedrooms === b ? "btn-primary" : "btn-secondary"
                      }`}
                    >
                      {b} {b === "1" ? "Bed" : "Beds"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Checkboxes */}
              <div className="form-group border-t border-gray-100 dark:border-gray-800 pt-4">
                <label className="form-label mb-2">Priority Features (Weighted)</label>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresSolar}
                      onChange={(e) => setRequiresSolar(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>⚡ 24/7 Solar Backup Power Essential</span>
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresParking}
                      onChange={(e) => setRequiresParking(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>🚗 Dedicated Secure Parking</span>
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remoteWorker}
                      onChange={(e) => setRemoteWorker(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>💻 Remote Work / Fiber Internet Ready</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Right Matched Properties List */}
            <main className="ai-results-col">
              <div className="ai-results-header mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Ranked AI Matches ({scoredProperties.length})
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Calculated using weighted multi-variable regression against your profile.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {scoredProperties.map((prop, idx) => (
                  <div key={prop.id} className="ai-matched-card">
                    {/* Top Score Banner */}
                    <div className="ai-match-score-header">
                      <div className="flex items-center gap-2">
                        <span className="ai-rank-badge">#{idx + 1}</span>
                        <div>
                          <div className="text-xs text-gray-400">Match Compatibility</div>
                          <div className="text-lg font-bold text-white">
                            {prop.aiScore}% Match — {prop.aiRating}
                          </div>
                        </div>
                      </div>

                      <div className="ai-score-bar-wrap">
                        <div
                          className="ai-score-bar-fill"
                          style={{
                            width: `${prop.aiScore}%`,
                            background:
                              prop.aiScore >= 90
                                ? "linear-gradient(90deg, #10B981, #34D399)"
                                : prop.aiScore >= 75
                                ? "linear-gradient(90deg, #3B82F6, #60A5FA)"
                                : "linear-gradient(90deg, #F59E0B, #FBBF24)"
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Property Card Body */}
                    <div className="ai-matched-body">
                      <div className="ai-matched-img-wrap">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="ai-matched-img"
                        />
                        <span className="ai-city-tag">{prop.location.city}</span>
                      </div>

                      <div className="ai-matched-info">
                        <div className="flex items-baseline justify-between mb-1">
                          <h3
                            className="font-bold text-base text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer truncate"
                            onClick={() => navigateTo("property-detail", prop.id)}
                          >
                            {prop.title}
                          </h3>
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400 font-heading shrink-0 ml-2">
                            {formatPrice(prop.price)}/yr
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 mb-2">
                          {prop.location.address} • {prop.specs.bedrooms} Beds • {prop.specs.bathrooms} Baths • {prop.specs.sizeSqft} sqft
                        </div>

                        {/* AI Rationale Bullets */}
                        <div className="ai-rationale-box">
                          <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                            Why this fits you:
                          </div>
                          <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                            {prop.aiReasons?.map((reason, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Actions */}
                        <div className="ai-matched-actions mt-3">
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => onScheduleClick && onScheduleClick(prop)}
                          >
                            Schedule Inspection
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => navigateTo("property-detail", prop.id)}
                          >
                            View Details <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        ) : (
          /* Affordability Calculator View */
          <div className="affordability-container max-w-4xl mx-auto">
            <div className="affordability-card glass-panel">
              <div className="text-center mb-8">
                <span className="badge badge-ai mb-2">
                  <Calculator size={14} /> Financial Intelligence
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Smart Rent-to-Income Guidance Calculator
                </h2>
                <p className="text-sm text-gray-500 max-w-xl mx-auto mt-1">
                  Based on international wealth advisory standards and the proven 30% gross income rule to prevent rental stress.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Income Input Side */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <label className="form-label text-base font-bold mb-2">
                    Your Monthly Gross Income (₦)
                  </label>
                  <div className="input-with-icon mb-4">
                    <Coins size={18} className="input-icon" />
                    <input
                      type="number"
                      step={50000}
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                      className="form-control text-lg font-bold"
                      placeholder="e.g. 600000"
                    />
                  </div>

                  <div className="text-xs text-gray-500 mb-6">
                    Annual Gross Income:{" "}
                    <strong>{formatPrice(affordabilityData.annualIncome)}</strong>
                  </div>

                  {/* Preset Income Buttons */}
                  <div className="text-xs font-semibold text-gray-400 mb-2">
                    Quick presets:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[350000, 600000, 1200000, 2500000].map((inc) => (
                      <button
                        key={inc}
                        type="button"
                        onClick={() => setMonthlyIncome(inc)}
                        className="btn btn-sm btn-secondary"
                      >
                        {formatPrice(inc)}/mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Breakdown Side */}
                <div className="space-y-4">
                  {/* Recommended Standard (30%) */}
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                        ★ Recommended Max Rent (30% Rule)
                      </span>
                      <span className="badge badge-verified">Optimal</span>
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-300 font-heading">
                      {formatPrice(affordabilityData.recommendedMaxAnnual)}
                      <span className="text-xs text-gray-500 font-normal"> /year</span>
                    </div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                      Equal to approx. {formatPrice(affordabilityData.recommendedMaxMonthly)} per month
                    </div>
                  </div>

                  {/* Conservative Tier (25%) */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-blue-700 dark:text-blue-300 font-semibold">
                        Conservative Budget (25%)
                      </div>
                      <div className="text-xs text-gray-500">Allows maximum savings rate</div>
                    </div>
                    <div className="font-bold text-blue-800 dark:text-blue-300">
                      {formatPrice(affordabilityData.conservativeMaxAnnual)}/yr
                    </div>
                  </div>

                  {/* Stretch Tier (35%) */}
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
                        Upper Limit Stretch (35%)
                      </div>
                      <div className="text-xs text-gray-500">Only for high-end prime locations</div>
                    </div>
                    <div className="font-bold text-amber-800 dark:text-amber-300">
                      {formatPrice(affordabilityData.stretchMaxAnnual)}/yr
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Guidance Box */}
              <div className="mt-8 p-4 bg-navy-900 text-white rounded-xl">
                <div className="flex items-center gap-2 mb-1 text-amber-400 font-bold text-sm">
                  <Sparkles size={16} /> AI Market Recommendation for your bracket:
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {affordabilityData.guidance}
                </p>
                <div className="mt-4">
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => {
                      setBudgetMax(affordabilityData.recommendedMaxAnnual);
                      setActiveTab("wizard");
                    }}
                  >
                    View Properties Under {formatPrice(affordabilityData.recommendedMaxAnnual)} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
