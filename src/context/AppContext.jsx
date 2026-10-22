import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_PROPERTIES } from "../data/mockProperties";
import confetti from "canvas-confetti";

const AppContext = createContext();

// Sample Initial Users for easy role switching
export const DEMO_USERS = {
  renter: {
    id: "user-renter-1",
    role: "renter",
    name: "Amina Yusuf",
    email: "amina.y@example.com",
    avatar: "/avatars/avatar-1.svg",
    phone: "+234 802 333 4455",
    occupation: "Senior Product Designer",
    city: "Port Harcourt",
    verified: true,
    joinedDate: "March 2024"
  },
  landlord: {
    id: "user-landlord-1",
    role: "landlord",
    name: "Chukwudi Nwosu",
    agency: "PrimeShield Realty & Asset Management",
    email: "chukwudi.n@primeshield.ng",
    avatar: "/avatars/avatar-2.svg",
    phone: "+234 803 456 7890",
    city: "Port Harcourt",
    verified: true,
    joinedDate: "January 2023",
    rating: 4.9,
    totalListings: 12
  },
  admin: {
    id: "user-admin-1",
    role: "admin",
    name: "SMART-AI System Admin",
    email: "admin@smartairental.ng",
    avatar: "/avatars/avatar-admin.svg",
    phone: "+234 800 762 7824",
    city: "Lagos",
    verified: true,
    joinedDate: "System Genesis"
  }
};

export const AppProvider = ({ children }) => {
  // Properties State (Persisted in localStorage, refreshed when stock images are purged)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem("smart_rental_properties_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasOld = parsed.some((p) =>
          p.images?.some((img) => img.includes("unsplash.com"))
        );
        if (!hasOld && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    localStorage.removeItem("smart_rental_properties");
    return MOCK_PROPERTIES;
  });

  // Current User Role ("renter" | "landlord" | "admin")
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem("smart_rental_role") || "renter";
  });

  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.renter;

  // Currency & Exchange Rate (1 USD = 1450 NGN)
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("smart_rental_currency") || "NGN";
  });
  const USD_RATE = 1450;

  // Theme (Light / Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("smart_rental_theme") || "light";
  });

  // Favorites (Property IDs)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("smart_rental_favorites");
    return saved ? JSON.parse(saved) : ["prop-1", "prop-3"];
  });

  // Compare Tray (Up to 4 property IDs)
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem("smart_rental_compare");
    return saved ? JSON.parse(saved) : ["prop-1", "prop-4"];
  });

  // Inspections
  const [inspections, setInspections] = useState(() => {
    const saved = localStorage.getItem("smart_rental_inspections");
    return saved ? JSON.parse(saved) : [
      {
        id: "insp-101",
        propertyId: "prop-1",
        propertyTitle: "Luxury 2-Bedroom Serviced Apartment with Smart Home Tech",
        propertyLocation: "Port Harcourt",
        propertyPrice: 1450000,
        propertyImage: "/properties/property-bungalow-steps.jpg",
        date: "2026-08-22",
        timeSlot: "11:00 AM - 12:00 PM",
        renterName: "Amina Yusuf",
        renterEmail: "amina.y@example.com",
        renterPhone: "+234 802 333 4455",
        status: "Approved", // "Pending" | "Approved" | "Completed" | "Cancelled"
        notes: "Interested in the solar inverter capacity and parking arrangement.",
        agentName: "Chukwudi Nwosu",
        createdAt: "2026-08-15"
      },
      {
        id: "insp-102",
        propertyId: "prop-2",
        propertyTitle: "Contemporary 4-Bedroom Semi-Detached Duplex with BQ",
        propertyLocation: "Lekki Phase 1, Lagos",
        propertyPrice: 6500000,
        propertyImage: "/properties/property-living-dining.jpg",
        date: "2026-08-25",
        timeSlot: "02:00 PM - 03:00 PM",
        renterName: "Amina Yusuf",
        renterEmail: "amina.y@example.com",
        renterPhone: "+234 802 333 4455",
        status: "Pending",
        notes: "Weekend family inspection.",
        agentName: "Folake Adeleke",
        createdAt: "2026-08-16"
      }
    ];
  });

  // Rental Applications
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("smart_rental_applications");
    return saved ? JSON.parse(saved) : [
      {
        id: "app-201",
        propertyId: "prop-1",
        propertyTitle: "Luxury 2-Bedroom Serviced Apartment with Smart Home Tech",
        status: "Under Review", // "Under Review" | "Approved" | "Declined"
        moveInDate: "2026-09-01",
        leaseTerm: "12 Months",
        monthlyIncome: 650000,
        employment: "Senior Product Designer at Fintech Co",
        createdAt: "2026-08-14"
      }
    ];
  });

  // In-App Messages / Chat Threads
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("smart_rental_conversations");
    return saved ? JSON.parse(saved) : [
      {
        id: "conv-1",
        propertyId: "prop-1",
        agentName: "Chukwudi Nwosu",
        agentAvatar: "/avatars/avatar-2.svg",
        propertyTitle: "Luxury 2-Bedroom Serviced Apartment (Port Harcourt)",
        unread: 1,
        messages: [
          {
            id: "msg-1",
            sender: "renter",
            text: "Hello Chukwudi, I love the apartment on Peter Odili Road. Does the rent include the annual service charge?",
            timestamp: "Yesterday, 4:15 PM"
          },
          {
            id: "msg-2",
            sender: "agent",
            text: "Hello Amina! The base rent is ₦1.45M/yr, and the service charge is ₦150k annually which covers the 24/7 security and solar maintenance. Would you like to view it this Saturday?",
            timestamp: "Yesterday, 4:22 PM"
          },
          {
            id: "msg-3",
            sender: "agent",
            text: "I have confirmed your inspection appointment for Saturday at 11:00 AM!",
            timestamp: "Today, 9:30 AM"
          }
        ]
      }
    ];
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("smart_rental_notifications");
    return saved ? JSON.parse(saved) : [
      {
        id: "notif-1",
        title: "Inspection Approved",
        message: "Your inspection for 2-Bed Serviced Apartment (Port Harcourt) has been confirmed for Aug 22, 11:00 AM.",
        type: "success",
        read: false,
        time: "10 mins ago"
      },
      {
        id: "notif-2",
        title: "New AI Recommendation",
        message: "We found a new 2-bedroom home under ₦1.5M in Port Harcourt matching your solar backup preference.",
        type: "ai",
        read: false,
        time: "2 hours ago"
      },
      {
        id: "notif-3",
        title: "Price Drop Alert",
        message: "One of your saved properties in Bodija, Ibadan was reduced by ₦100,000/yr.",
        type: "info",
        read: true,
        time: "1 day ago"
      }
    ];
  });

  // Reported Listings (for Admin Moderation)
  const [reportedListings, setReportedListings] = useState(() => {
    const saved = localStorage.getItem("smart_rental_reports");
    return saved ? JSON.parse(saved) : [
      {
        id: "rep-1",
        propertyId: "prop-7",
        propertyTitle: "Spacious 3-Bedroom Flat in Gated GRA Neighborhood",
        reason: "Duplicate listing / Inaccurate pricing",
        reportedBy: "Kelechi Obi",
        status: "Pending Investigation",
        date: "2026-08-15"
      }
    ];
  });

  // Search History & Saved NLP Searches
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("smart_rental_search_history");
    return saved ? JSON.parse(saved) : [
      "Find me a 2-bedroom apartment in Port Harcourt under ₦1.5 million with parking",
      "Duplex in Lekki Phase 1 with swimming pool",
      "Studio in Yaba under 1 million with fast internet"
    ];
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Active View / Page Route State
  const [activePage, setActivePage] = useState("home"); // "home" | "listings" | "property-detail" | "ai-recommendations" | "compare" | "renter-dashboard" | "landlord-dashboard" | "admin-dashboard" | "about" | "how-it-works" | "contact" | "faq"
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("smart_rental_properties_v2", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("smart_rental_role", currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem("smart_rental_currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("smart_rental_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("smart_rental_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("smart_rental_compare", JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem("smart_rental_inspections", JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem("smart_rental_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("smart_rental_conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("smart_rental_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("smart_rental_reports", JSON.stringify(reportedListings));
  }, [reportedListings]);

  useEffect(() => {
    localStorage.setItem("smart_rental_search_history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Toast Function
  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Currency Formatter Helper
  const formatPrice = (priceInNGN) => {
    if (currency === "USD") {
      const usd = Math.round(priceInNGN / USD_RATE);
      return `$${usd.toLocaleString()}`;
    }
    return `₦${priceInNGN.toLocaleString()}`;
  };

  // Favorites Toggle
  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(propertyId);
      if (isFav) {
        showToast("Removed from saved favorites", "warning");
        return prev.filter((id) => id !== propertyId);
      } else {
        showToast("Added to saved favorites!", "success");
        return [...prev, propertyId];
      }
    });
  };

  // Compare Toggle (Max 4)
  const toggleCompare = (propertyId) => {
    setCompareList((prev) => {
      if (prev.includes(propertyId)) {
        showToast("Removed from comparison list", "warning");
        return prev.filter((id) => id !== propertyId);
      } else {
        if (prev.length >= 4) {
          showToast("You can compare a maximum of 4 properties at once.", "warning");
          return prev;
        }
        showToast("Added to comparison! Click Compare to view side-by-side.", "success");
        return [...prev, propertyId];
      }
    });
  };

  // Book Inspection
  const bookInspection = (bookingData) => {
    const newInspection = {
      id: `insp-${Date.now().toString().slice(-4)}`,
      ...bookingData,
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0]
    };

    setInspections((prev) => [newInspection, ...prev]);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    showToast("Inspection scheduled successfully! Agent notified.", "success");

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Inspection Requested",
      message: `Your appointment request for ${bookingData.propertyTitle} on ${bookingData.date} is pending agent confirmation.`,
      type: "info",
      read: false,
      time: "Just now"
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Update Inspection Status (Landlord / Admin)
  const updateInspectionStatus = (inspectionId, newStatus) => {
    setInspections((prev) =>
      prev.map((item) => (item.id === inspectionId ? { ...item, status: newStatus } : item))
    );
    showToast(`Inspection status updated to ${newStatus}`, "success");
  };

  // Add New Property (Landlord)
  const addProperty = (newPropData) => {
    const newProp = {
      id: `prop-${Date.now().toString().slice(-4)}`,
      viewsCount: 0,
      favoritesCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      verificationStatus: "Verified",
      isFeatured: false,
      isNewlyListed: true,
      reviews: [],
      ...newPropData
    };

    setProperties((prev) => [newProp, ...prev]);
    showToast("🎉 Property listed successfully on SMART-AI!", "success");

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    } catch (e) {}

    return newProp.id;
  };

  // Delete Property
  const deleteProperty = (propertyId) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setFavorites((prev) => prev.filter((id) => id !== propertyId));
    setCompareList((prev) => prev.filter((id) => id !== propertyId));
    showToast("Property removed from listing catalog.", "info");
  };

  // Update/Edit Existing Property (Admin / Landlord)
  const updateProperty = (propertyId, updatedData) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, ...updatedData } : p))
    );
    showToast("Property details updated successfully!", "success");
  };

  // Reset to initial mock database
  const resetPropertiesToDefault = () => {
    setProperties(MOCK_PROPERTIES);
    localStorage.setItem("smart_rental_properties_v2", JSON.stringify(MOCK_PROPERTIES));
    showToast("Properties reset to default catalog.", "info");
  };

  // Verify Property (Admin)
  const verifyProperty = (propertyId, status = "Verified") => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, verificationStatus: status } : p))
    );
    showToast(`Property status updated to ${status}.`, "success");
  };

  // Report Property
  const reportProperty = (propertyId, reason) => {
    const prop = properties.find((p) => p.id === propertyId);
    const newReport = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      propertyId,
      propertyTitle: prop ? prop.title : "Unknown Property",
      reason,
      reportedBy: currentUser.name,
      status: "Pending Investigation",
      date: new Date().toISOString().split("T")[0]
    };
    setReportedListings((prev) => [newReport, ...prev]);
    showToast("Report submitted to moderation team for review.", "warning");
  };

  // Send Chat Message
  const sendMessage = (conversationId, messageText, targetPropertyId = null, agentInfo = null) => {
    if (!messageText.trim()) return;

    let targetConv = conversations.find((c) => c.id === conversationId || (targetPropertyId && c.propertyId === targetPropertyId));

    if (!targetConv && targetPropertyId) {
      // Create new conversation
      const prop = properties.find((p) => p.id === targetPropertyId);
      targetConv = {
        id: `conv-${Date.now()}`,
        propertyId: targetPropertyId,
        agentName: agentInfo?.name || prop?.agent?.name || "Verified Agent",
        agentAvatar: agentInfo?.avatar || prop?.agent?.avatar || "/avatars/avatar-2.svg",
        propertyTitle: prop?.title || "Property Inquiry",
        unread: 0,
        messages: []
      };
    }

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: currentRole === "landlord" ? "agent" : "renter",
      text: messageText,
      timestamp: "Just now"
    };

    const updatedConv = {
      ...targetConv,
      messages: [...(targetConv?.messages || []), userMsg]
    };

    setConversations((prev) => {
      const exists = prev.some((c) => c.id === updatedConv.id);
      if (exists) {
        return prev.map((c) => (c.id === updatedConv.id ? updatedConv : c));
      } else {
        return [updatedConv, ...prev];
      }
    });

    // Auto-reply simulation for demo responsiveness
    if (currentRole === "renter") {
      setTimeout(() => {
        const autoReply = {
          id: `msg-${Date.now() + 1}`,
          sender: "agent",
          text: `Thank you for reaching out, ${currentUser.name}! I received your message about this property. Let me know if you would like to schedule a physical walkthrough or need any lease documentation.`,
          timestamp: "Just now"
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === updatedConv.id
              ? { ...c, messages: [...c.messages, autoReply], unread: c.unread + 1 }
              : c
          )
        );
        showToast("New reply received from agent!", "info");
      }, 2500);
    }
  };

  // Add Review to Property
  const addPropertyReview = (propertyId, reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: currentUser.name,
      rating: reviewData.rating || 5,
      date: "Just now",
      comment: reviewData.comment
    };

    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? { ...p, reviews: [newRev, ...(p.reviews || [])] }
          : p
      )
    );
    showToast("Review submitted successfully! Thank you for your feedback.", "success");
  };

  // Record Search Query in history
  const recordSearch = (query) => {
    if (!query || typeof query !== "string") return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 8);
    });
  };

  // Navigation Helper
  const navigateTo = (page, propertyId = null, filterOptions = null) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActivePage(page);
    if (propertyId) setSelectedPropertyId(propertyId);
    if (filterOptions) setActiveFilters(filterOptions);
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        setProperties,
        currentRole,
        setCurrentRole,
        currentUser,
        currency,
        setCurrency,
        formatPrice,
        theme,
        setTheme,
        favorites,
        toggleFavorite,
        compareList,
        toggleCompare,
        inspections,
        bookInspection,
        updateInspectionStatus,
        applications,
        conversations,
        sendMessage,
        notifications,
        reportedListings,
        reportProperty,
        verifyProperty,
        deleteProperty,
        addProperty,
        updateProperty,
        resetPropertiesToDefault,
        addPropertyReview,
        searchHistory,
        recordSearch,
        toasts,
        showToast,
        activePage,
        setActivePage,
        selectedPropertyId,
        setSelectedPropertyId,
        activeSearchQuery,
        setActiveSearchQuery,
        activeFilters,
        setActiveFilters,
        navigateTo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
