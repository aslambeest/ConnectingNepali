// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginUI from './pages/LoginUI';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from './pages/Reset-Password';

// Services
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
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login-ui" element={<LoginUI />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Optional Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Service Routes */}
        <Route path="/services/airport-pickup-settlement-help" element={<AirportPage />} />
        <Route path="/services/housing-assistance" element={<HousingPage />} />
        <Route path="/services/sin-bank-id-setup" element={<SinBankPage />} />
        <Route path="/services/student-support" element={<StudentPage />} />
        <Route path="/services/job-connection" element={<JobPage />} />
        <Route path="/services/community-support" element={<CommunityPage />} />
        <Route path="/services/language-support" element={<LanguagePage />} />
        <Route path="/services/nepali-directory" element={<DirectoryPage />} />
        <Route path="/services/legal-immigration-help" element={<LegalPage />} />
        <Route path="/services/new-to-canada" element={<NewCanada />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-xl text-red-600">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
