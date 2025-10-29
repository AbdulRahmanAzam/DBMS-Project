import { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help and answer any questions you might have</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                Have questions about our platform? Need technical support? Want to
                learn more about our services? We'd love to hear from you!
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="detail-icon">📧</div>
                  <div>
                    <h3>Email</h3>
                    <p>support@smarthealthcare.com</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">📞</div>
                  <div>
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">📍</div>
                  <div>
                    <h3>Address</h3>
                    <p>123 Healthcare Ave<br/>Medical District, MD 12345</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">🕐</div>
                  <div>
                    <h3>Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              
              {submitted && (
                <div className="success-banner">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />

                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  required
                />

                <div className="input-group">
                  <label htmlFor="message" className="input-label">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    rows="6"
                    className="input-field"
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth>
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
