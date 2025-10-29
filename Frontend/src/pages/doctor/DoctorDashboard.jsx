import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { appointmentAPI } from '../../utils/api';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await appointmentAPI.getAll();
      const allAppointments = response.data;
      
      const today = new Date().toDateString();
      const todayAppointments = allAppointments.filter(apt => 
        new Date(apt.date).toDateString() === today
      );

      setAppointments(todayAppointments);
      
      setStats({
        todayAppointments: todayAppointments.length,
        totalPatients: 45, // Mock data
        pendingRequests: 3, // Mock data
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
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, Dr. {user?.name}!</h1>
        <p>Your practice overview for today</p>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.todayAppointments}</h3>
            <p>Today's Appointments</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalPatients}</h3>
            <p>Total Patients</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{stats.pendingRequests}</h3>
            <p>Pending Requests</p>
          </div>
        </Card>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Today's Schedule</h2>
            <Link to="/doctor/schedule" className="view-all-link">
              View Full Schedule →
            </Link>
          </div>

          {appointments.length === 0 ? (
            <Card>
              <div className="empty-state">
                <p>No appointments scheduled for today</p>
              </div>
            </Card>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="appointment-item">
                  <div className="appointment-time">
                    <span className="time">{appointment.time || '09:00 AM'}</span>
                  </div>
                  <div className="appointment-details">
                    <h3>{appointment.patient_name || 'Patient Name'}</h3>
                    <p>{appointment.type || 'General Consultation'}</p>
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
            <Link to="/doctor/schedule" className="action-card">
              <Card hover>
                <div className="action-icon">📅</div>
                <h3>My Schedule</h3>
                <p>View and manage appointments</p>
              </Card>
            </Link>

            <Link to="/doctor/patients" className="action-card">
              <Card hover>
                <div className="action-icon">👥</div>
                <h3>My Patients</h3>
                <p>Access patient records</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
