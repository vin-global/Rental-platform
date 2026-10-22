import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ToastContainer } from "./components/common/ToastContainer";
import { SmartAiChatWidget } from "./components/ai/SmartAiChatWidget";

// Pages
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { AiRecommendationsPage } from "./pages/AiRecommendationsPage";
import { ComparePage } from "./pages/ComparePage";
import { RenterDashboardPage } from "./pages/RenterDashboardPage";
import { LandlordDashboardPage } from "./pages/LandlordDashboardPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AboutPage, HowItWorksPage, FaqPage, ContactPage } from "./pages/StaticPages";

// Modals
import { ScheduleInspectionModal } from "./components/modals/ScheduleInspectionModal";
import { ContactAgentModal } from "./components/modals/ContactAgentModal";
import { ReportListingModal } from "./components/modals/ReportListingModal";
import { LeaveReviewModal } from "./components/modals/LeaveReviewModal";
import { EditPropertyModal } from "./components/modals/EditPropertyModal";

const AppContent = () => {
  const { activePage } = useApp();

  // Active Modals state
  const [scheduleModalProp, setScheduleModalProp] = useState(null);
  const [contactModalProp, setContactModalProp] = useState(null);
  const [reportModalProp, setReportModalProp] = useState(null);
  const [reviewModalProp, setReviewModalProp] = useState(null);
  const [editModalProp, setEditModalProp] = useState(null);

  // Render current page
  const renderCurrentPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage onScheduleClick={(prop) => setScheduleModalProp(prop)} />;
      case "listings":
        return <ListingsPage onScheduleClick={(prop) => setScheduleModalProp(prop)} />;
      case "property-detail":
        return (
          <PropertyDetailPage
            onScheduleClick={(prop) => setScheduleModalProp(prop)}
            onContactClick={(prop) => setContactModalProp(prop)}
            onReportClick={(prop) => setReportModalProp(prop)}
            onReviewClick={(prop) => setReviewModalProp(prop)}
            onEditClick={(prop) => setEditModalProp(prop)}
          />
        );
      case "ai-recommendations":
        return (
          <AiRecommendationsPage
            onScheduleClick={(prop) => setScheduleModalProp(prop)}
          />
        );
      case "compare":
        return (
          <ComparePage
            onScheduleClick={(prop) => setScheduleModalProp(prop)}
          />
        );
      case "renter-dashboard":
        return (
          <RenterDashboardPage
            onScheduleClick={(prop) => setScheduleModalProp(prop)}
          />
        );
      case "landlord-dashboard":
        return (
          <LandlordDashboardPage
            onEditClick={(prop) => setEditModalProp(prop)}
          />
        );
      case "admin-dashboard":
        return (
          <AdminDashboardPage
            onEditClick={(prop) => setEditModalProp(prop)}
          />
        );
      case "about":
        return <AboutPage />;
      case "how-it-works":
        return <HowItWorksPage />;
      case "faq":
        return <FaqPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onScheduleClick={(prop) => setScheduleModalProp(prop)} />;
    }
  };

  return (
    <div className="app-container">
      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Body */}
      <main className="main-content">{renderCurrentPage()}</main>

      {/* Floating AI Assistant Co-pilot */}
      <SmartAiChatWidget />

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      {scheduleModalProp && (
        <ScheduleInspectionModal
          property={scheduleModalProp}
          onClose={() => setScheduleModalProp(null)}
        />
      )}

      {contactModalProp && (
        <ContactAgentModal
          property={contactModalProp}
          onClose={() => setContactModalProp(null)}
        />
      )}

      {reportModalProp && (
        <ReportListingModal
          property={reportModalProp}
          onClose={() => setReportModalProp(null)}
        />
      )}

      {reviewModalProp && (
        <LeaveReviewModal
          property={reviewModalProp}
          onClose={() => setReviewModalProp(null)}
        />
      )}

      {editModalProp && (
        <EditPropertyModal
          property={editModalProp}
          onClose={() => setEditModalProp(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
