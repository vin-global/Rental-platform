import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Building2,
  Sparkles,
  Heart,
  Scale,
  Bell,
  Sun,
  Moon,
  PlusCircle,
  User,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Search,
  HelpCircle,
  Info as InfoIcon,
  PhoneCall,
  LogIn
} from "lucide-react";

export const Navbar = ({ onOpenAuth }) => {
  const {
    activePage,
    navigateTo,
    favorites,
    compareList,
    notifications,
    currentRole,
    setCurrentRole,
    currentUser,
    currency,
    setCurrency,
    theme,
    setTheme
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setRoleMenuOpen(false);
    if (role === "renter") navigateTo("renter-dashboard");
    if (role === "landlord") navigateTo("landlord-dashboard");
    if (role === "admin") navigateTo("admin-dashboard");
  };

  return (
    <header className="navbar-wrapper">
      <div className="container-wide">
        <div className="navbar-content">
          {/* Logo & Brand */}
          <button
            onClick={() => navigateTo("home")}
            className="navbar-brand"
            aria-label="SMART-AI House Rental Home"
          >
            <div className="brand-icon-box">
              <Building2 size={22} className="brand-icon" />
              <span className="brand-ai-dot"></span>
            </div>
            <div className="brand-text">
              <span className="brand-title">
                SMART<span className="brand-ai-gradient">-AI</span>
              </span>
              <span className="brand-tagline">House Rental</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <button
              onClick={() => navigateTo("home")}
              className={`nav-link ${activePage === "home" ? "active" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo("listings")}
              className={`nav-link ${activePage === "listings" ? "active" : ""}`}
            >
              Find a Home
            </button>
            <button
              onClick={() => navigateTo("ai-recommendations")}
              className={`nav-link nav-link-ai ${activePage === "ai-recommendations" ? "active" : ""}`}
            >
              <Sparkles size={16} className="ai-sparkle-icon" />
              AI Recommendations
            </button>
            <button
              onClick={() => navigateTo("compare")}
              className={`nav-link ${activePage === "compare" ? "active" : ""}`}
            >
              Compare
              {compareList.length > 0 && (
                <span className="nav-badge-count">{compareList.length}</span>
              )}
            </button>
            <button
              onClick={() => navigateTo("how-it-works")}
              className={`nav-link ${activePage === "how-it-works" ? "active" : ""}`}
            >
              How It Works
            </button>
            <button
              onClick={() => navigateTo("about")}
              className={`nav-link ${activePage === "about" ? "active" : ""}`}
            >
              About
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className={`nav-link ${activePage === "contact" ? "active" : ""}`}
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons & Role Management */}
          <div className="navbar-actions">
            {/* Currency Switcher */}
            <button
              className="currency-toggle-btn"
              onClick={() => setCurrency(currency === "NGN" ? "USD" : "NGN")}
              title={`Switch Currency (Currently ${currency})`}
              aria-label="Toggle currency between NGN and USD"
            >
              <span className="currency-pill">{currency === "NGN" ? "₦ NGN" : "$ USD"}</span>
            </button>

            {/* Theme Switcher */}
            <button
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
              aria-label="Toggle theme mode"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Favorites Icon */}
            <button
              className="nav-icon-btn"
              onClick={() => {
                if (currentRole === "renter") {
                  navigateTo("renter-dashboard");
                } else {
                  navigateTo("listings");
                }
              }}
              title="Saved Homes / Wishlist"
              aria-label="Favorites"
            >
              <Heart size={19} className={favorites.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
              {favorites.length > 0 && (
                <span className="icon-badge">{favorites.length}</span>
              )}
            </button>

            {/* Notifications Popover */}
            <div className="relative-container">
              <button
                className="nav-icon-btn"
                onClick={() => setNotifOpen(!notifOpen)}
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell size={19} />
                {unreadNotifs > 0 && <span className="icon-badge icon-badge-alert">{unreadNotifs}</span>}
              </button>

              {notifOpen && (
                <div className="notif-dropdown">
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <span className="badge badge-ai">{notifications.length} Total</span>
                  </div>
                  <div className="notif-list">
                    {notifications.map((n) => (
                      <div key={n.id} className={`notif-item ${!n.read ? "unread" : ""}`}>
                        <div className="notif-item-title">{n.title}</div>
                        <div className="notif-item-msg">{n.message}</div>
                        <div className="notif-item-time">{n.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="notif-footer">
                    <button onClick={() => setNotifOpen(false)} className="btn btn-sm btn-secondary w-full">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill & Dashboard Button */}
            <div className="relative-container">
              <button
                className="role-selector-pill"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                title="Switch active role demo"
              >
                <span className={`role-dot role-dot-${currentRole}`}></span>
                <span className="role-name">
                  {currentRole === "renter" ? "Renter Mode" : currentRole === "landlord" ? "Landlord/Agent" : "Admin Mode"}
                </span>
                <ChevronDown size={14} />
              </button>

              {roleMenuOpen && (
                <div className="role-dropdown">
                  <div className="role-dropdown-title">Switch Interactive Role:</div>
                  <button
                    className={`role-option ${currentRole === "renter" ? "active" : ""}`}
                    onClick={() => handleRoleChange("renter")}
                  >
                    <User size={16} />
                    <div>
                      <div className="role-opt-title">Renter (Amina)</div>
                      <div className="role-opt-desc">Discover, save, and book inspections</div>
                    </div>
                  </button>
                  <button
                    className={`role-option ${currentRole === "landlord" ? "active" : ""}`}
                    onClick={() => handleRoleChange("landlord")}
                  >
                    <Building2 size={16} />
                    <div>
                      <div className="role-opt-title">Landlord / Agent (Chukwudi)</div>
                      <div className="role-opt-desc">Manage listings, leads, and bookings</div>
                    </div>
                  </button>
                  <button
                    className={`role-option ${currentRole === "admin" ? "active" : ""}`}
                    onClick={() => handleRoleChange("admin")}
                  >
                    <ShieldCheck size={16} />
                    <div>
                      <div className="role-opt-title">System Admin</div>
                      <div className="role-opt-desc">Verify listings and manage platform</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* List Property / Add Listing CTA */}
            {currentRole === "landlord" ? (
              <button
                className="btn btn-sm btn-accent"
                onClick={() => navigateTo("landlord-dashboard")}
              >
                <PlusCircle size={16} />
                + Add Property
              </button>
            ) : (
              <button
                className="btn btn-sm btn-accent"
                onClick={() => {
                  setCurrentRole("landlord");
                  navigateTo("landlord-dashboard");
                }}
              >
                <Building2 size={16} />
                List Property
              </button>
            )}

            {/* Dashboard Quick Link */}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                if (currentRole === "renter") navigateTo("renter-dashboard");
                else if (currentRole === "landlord") navigateTo("landlord-dashboard");
                else navigateTo("admin-dashboard");
              }}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-nav-links">
            <button
              onClick={() => {
                navigateTo("home");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
            >
              <Building2 size={18} /> Home
            </button>
            <button
              onClick={() => {
                navigateTo("listings");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
            >
              <Search size={18} /> Find a Home
            </button>
            <button
              onClick={() => {
                navigateTo("ai-recommendations");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link text-blue-600 font-semibold"
            >
              <Sparkles size={18} /> AI Recommendations
            </button>
            <button
              onClick={() => {
                navigateTo("compare");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
            >
              <Scale size={18} /> Compare Properties ({compareList.length})
            </button>
            <button
              onClick={() => {
                navigateTo("how-it-works");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
            >
              <HelpCircle size={18} /> How It Works
            </button>
            <button
              onClick={() => {
                navigateTo("about");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
            >
              <InfoIcon size={18} /> About Us
            </button>
            <button
              onClick={() => {
                navigateTo("contact");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
            >
              <PhoneCall size={18} /> Contact & Support
            </button>
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-role-badge">
              Active Mode: <strong>{currentRole.toUpperCase()}</strong>
            </div>
            <div className="mobile-btn-grid">
              <button
                className="btn btn-secondary w-full"
                onClick={() => {
                  setCurrency(currency === "NGN" ? "USD" : "NGN");
                }}
              >
                Currency: {currency}
              </button>
              <button
                className="btn btn-primary w-full"
                onClick={() => {
                  if (currentRole === "renter") navigateTo("renter-dashboard");
                  else if (currentRole === "landlord") navigateTo("landlord-dashboard");
                  else navigateTo("admin-dashboard");
                  setMobileMenuOpen(false);
                }}
              >
                Open Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
