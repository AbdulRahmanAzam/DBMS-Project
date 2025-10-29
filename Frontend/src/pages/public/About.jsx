import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About Smart Healthcare Verification System</h1>
          <p>Your trusted partner in healthcare management</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to revolutionize healthcare management by providing a secure,
              reliable, and user-friendly platform that connects patients with healthcare
              providers while ensuring the integrity and verification of medical records.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Vision</h2>
            <p>
              We envision a world where healthcare information is easily accessible,
              secure, and verified, enabling better patient outcomes and more efficient
              healthcare delivery. We strive to be the leading platform for healthcare
              verification and management.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="offer-grid">
              <div className="offer-item">
                <h3>🔒 Secure Data Management</h3>
                <p>
                  Advanced encryption and security measures to protect your sensitive
                  health information.
                </p>
              </div>
              <div className="offer-item">
                <h3>✓ Verified Records</h3>
                <p>
                  All medical records are verified for authenticity, ensuring you have
                  access to accurate health information.
                </p>
              </div>
              <div className="offer-item">
                <h3>👥 Connected Care</h3>
                <p>
                  Seamless connection between patients and healthcare providers for
                  better care coordination.
                </p>
              </div>
              <div className="offer-item">
                <h3>📊 Health Analytics</h3>
                <p>
                  Comprehensive health analytics and visualizations to help you
                  understand your health trends.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Why Trust Us?</h2>
            <ul className="trust-list">
              <li>HIPAA-compliant platform ensuring patient privacy</li>
              <li>Role-based access control for data security</li>
              <li>Verified healthcare providers</li>
              <li>24/7 secure access to your health records</li>
              <li>Transparent data handling policies</li>
              <li>Continuous security updates and monitoring</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
