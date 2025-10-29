import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { appointmentAPI } from '../../utils/api';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    completedAppointments: 0,
    pendingRecords: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await appointmentAPI.getAll();
      const allAppointments = response.data;
      
      // Filter upcoming appointments (today and future)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const upcoming = allAppointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= today && apt.status !== 'cancelled';
      });

      setAppointments(upcoming.slice(0, 3)); // Show only next 3
      
      setStats({
        upcomingAppointments: upcoming.length,
        completedAppointments: allAppointments.filter(apt => apt.status === 'completed').length,
        pendingRecords: 2, // This would come from records API
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Loading your dashboard..." />;
  }

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's your health overview</p>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.upcomingAppointments}</h3>
            <p>Upcoming Appointments</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>{stats.completedAppointments}</h3>
            <p>Completed Visits</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.pendingRecords}</h3>
            <p>New Records</p>
          </div>
        </Card>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <Link to="/patient/appointments" className="view-all-link">
              View All →
            </Link>
          </div>

          {appointments.length === 0 ? (
            <Card>
              <div className="empty-state">
                <p>No upcoming appointments</p>
                <Link to="/patient/find-doctor" className="btn-link">
                  Schedule an appointment
                </Link>
              </div>
            </Card>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="appointment-item">
                  <div className="appointment-date">
                    <div className="date-box">
                      <span className="date-day">
                        {new Date(appointment.date).getDate()}
                      </span>
                      <span className="date-month">
                        {new Date(appointment.date).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <div className="appointment-details">
                    <h3>Dr. {appointment.doctor_name || 'Unknown'}</h3>
                    <p className="appointment-time">
                      {appointment.time || 'Time TBD'}
                    </p>
                    <p className="appointment-type">
                      {appointment.type || 'General Consultation'}
                    </p>
                  </div>
                  <div className="appointment-status">
                    <span className={`status-badge status-${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          
          <div className="quick-actions">
            <Link to="/patient/find-doctor" className="action-card">
              <Card hover>
                <div className="action-icon">👨‍⚕️</div>
                <h3>Find a Doctor</h3>
                <p>Search and book appointments</p>
              </Card>
            </Link>

            <Link to="/patient/records" className="action-card">
              <Card hover>
                <div className="action-icon">📄</div>
                <h3>Medical Records</h3>
                <p>View your health records</p>
              </Card>
            </Link>

            <Link to="/patient/appointments" className="action-card">
              <Card hover>
                <div className="action-icon">📅</div>
                <h3>My Appointments</h3>
                <p>Manage your appointments</p>
              </Card>
            </Link>

            <Link to="/patient/profile" className="action-card">
              <Card hover>
                <div className="action-icon">👤</div>
                <h3>My Profile</h3>
                <p>Update your information</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
