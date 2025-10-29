import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import Appointments from './pages/patient/Appointments';
import FindDoctor from './pages/patient/FindDoctor';
import MedicalRecords from './pages/patient/MedicalRecords';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Patient Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/appointments"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/find-doctor"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <FindDoctor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/records"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <MedicalRecords />
                  </ProtectedRoute>
                }
              />

              {/* Doctor Routes */}
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
