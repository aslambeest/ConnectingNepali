import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/AuthPage';       // Registration + login
import LoginUI from './pages/LoginUI';         // Separate login page
import Dashboard from './pages/Dashboard';     // Dashboard after login
import PrivateRoute from './components/PrivateRoute'; // Wrapper for auth-protected routes
//import logo from './assets/logo.png
//import logo from './assets/Logo.png'; // If you're inside src/
import logo from './assets/logo.png';



// Dummy service detail pages
import AirportPage from './pages/services/AirportPage';
import HousingPage from './pages/services/HousingPage';
import SinBankPage from './pages/services/SinBankPage';
import StudentPage from './pages/services/StudentPage';
import JobPage from './pages/services/JobPage';
import CommunityPage from './pages/services/CommunityPage';
import LanguagePage from './pages/services/LanguagePage';
import DirectoryPage from './pages/services/DirectoryPage';
import LegalPage from './pages/services/LegalPage';
import NewCanada from './pages/services/NewCanada';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login-ui" element={<LoginUI />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Service Detail Routes */}
        <Route path="/services/airport-pickup-settlement-help" element={<AirportPage />} />
        <Route path="/services/housing-assistance" element={<HousingPage />} />
        <Route path="/services/sin-bank-id-setup" element={<SinBankPage />} />
        <Route path="/services/student-support" element={<StudentPage />} />
        <Route path="/services/job-connection" element={<JobPage />} />
        <Route path="/services/community-support" element={<CommunityPage />} />
        <Route path="/services/language-support" element={<LanguagePage />} />
        <Route path="/services/nepali-directory" element={<DirectoryPage />} />
        <Route path="/services/legal-immigration-help" element={<LegalPage />} />

        {/* Catch-all route */}
        <Route path="*" element={<div className="p-10 text-center text-xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

