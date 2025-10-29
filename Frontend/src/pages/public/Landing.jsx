import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Smart Health Care Verification System</h1>
          <p className="hero-subtitle">
            Secure, reliable, and verified healthcare management at your fingertips
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-hero btn-primary-hero">
              Get Started
            </Link>
            <Link to="/login" className="btn-hero btn-secondary-hero">
              Login
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <span className="hero-icon">🏥</span>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Authentication</h3>
              <p>Role-based access control protecting sensitive health data</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Appointment Scheduling</h3>
              <p>Easy booking and management of healthcare appointments</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Verified Records</h3>
              <p>Access to verified and authenticated medical records</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Find Doctors</h3>
              <p>Search and connect with verified healthcare providers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Health Analytics</h3>
              <p>Visualize your health data trends over time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Responsive</h3>
              <p>Access your health information from any device</p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>For Patients</h3>
              <ul>
                <li>Centralized access to all medical records</li>
                <li>Easy appointment booking</li>
                <li>Secure sharing with trusted providers</li>
                <li>24/7 access to your health data</li>
              </ul>
            </div>
            <div className="benefit-item">
              <h3>For Doctors</h3>
              <ul>
                <li>Comprehensive patient history</li>
                <li>Efficient schedule management</li>
                <li>Verified medical information</li>
                <li>Streamlined patient communication</li>
              </ul>
            </div>
            <div className="benefit-item">
              <h3>For Healthcare Facilities</h3>
              <ul>
                <li>Reduced administrative overhead</li>
                <li>Improved data accuracy</li>
                <li>Better patient outcomes</li>
                <li>Compliance with healthcare standards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of patients and healthcare providers using our platform</p>
          <Link to="/register" className="btn-hero btn-primary-hero">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
