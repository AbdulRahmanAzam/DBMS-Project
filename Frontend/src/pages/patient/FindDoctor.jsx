import { useState, useEffect } from 'react';
import { doctorAPI } from '../../utils/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loading from '../../components/common/Loading';
import './FindDoctor.css';

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const specialties = ['all', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology'];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  if (loading) {
    return <Loading text="Loading doctors..." />;
  }

  return (
    <div className="find-doctor-page">
      <div className="page-header">
        <h1>Find a Doctor</h1>
        <p>Search and book appointments with verified healthcare providers</p>
      </div>

      <div className="search-section">
        <Card>
          <div className="search-controls">
            <div className="search-input">
              <Input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="specialty-filter">
              <label htmlFor="specialty">Specialty:</label>
              <select
                id="specialty"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="input-field"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>

      <div className="results-section">
        <div className="results-header">
          <h2>Available Doctors ({filteredDoctors.length})</h2>
        </div>

        {filteredDoctors.length === 0 ? (
          <Card>
            <div className="empty-state">
              <div className="empty-icon">👨‍⚕️</div>
              <h3>No doctors found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          </Card>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="doctor-card">
                <div className="doctor-avatar">
                  <span className="avatar-icon">👨‍⚕️</span>
                </div>
                <div className="doctor-info">
                  <h3>Dr. {doctor.name}</h3>
                  <div className="doctor-specialty">
                    <span className="specialty-badge">{doctor.specialty || 'General'}</span>
                  </div>
                  <div className="doctor-details">
                    {doctor.department && (
                      <div className="detail-item">
                        <span className="detail-icon">🏥</span>
                        <span>{doctor.department}</span>
                      </div>
                    )}
                    {doctor.experience && (
                      <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span>{doctor.experience} years experience</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="detail-icon">✓</span>
                      <span className="verified-text">Verified Provider</span>
                    </div>
                  </div>
                  {doctor.bio && (
                    <p className="doctor-bio">{doctor.bio}</p>
                  )}
                </div>
                <div className="doctor-actions">
                  <Button variant="primary" fullWidth>
                    Book Appointment
                  </Button>
                  <Button variant="outline" fullWidth>
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
