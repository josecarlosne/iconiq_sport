import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EventsListing from './pages/events-listing';
import UserLogin from './pages/user-login';
import SponsorshipHub from './pages/sponsorship-hub';
import LandingPage from './pages/landing-page';
import UserProfileManagement from './pages/user-profile-management';
import CommunityDashboard from './pages/community-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CommunityDashboard />} />
        <Route path="/events-listing" element={<EventsListing />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/sponsorship-hub" element={<SponsorshipHub />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/community-dashboard" element={<CommunityDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
