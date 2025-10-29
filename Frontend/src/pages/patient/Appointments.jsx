import { useState, useEffect } from 'react';
import { appointmentAPI } from '../../utils/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await appointmentAPI.cancel(appointmentId);
      // Refresh appointments
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const filterAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filter === 'upcoming') {
      return appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= today && apt.status !== 'cancelled';
      });
    } else if (filter === 'past') {
      return appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate < today || apt.status === 'completed';
      });
    }
    return appointments;
  };

  if (loading) {
    return <Loading text="Loading appointments..." />;
  }

  const filteredAppointments = filterAppointments();

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>My Appointments</h1>
        <p>View and manage your healthcare appointments</p>
      </div>

      <div className="appointments-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
          onClick={() => setFilter('past')}
        >
          Past
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <Card>
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No appointments found</h3>
            <p>You don't have any {filter !== 'all' ? filter : ''} appointments yet.</p>
          </div>
        </Card>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div className="appointment-date">
                  <span className="date-day">
                    {new Date(appointment.date).getDate()}
                  </span>
                  <span className="date-month">
                    {new Date(appointment.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="date-year">
                    {new Date(appointment.date).getFullYear()}
                  </span>
                </div>
                <span className={`status-badge status-${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-body">
                <h3>Dr. {appointment.doctor_name || 'Unknown'}</h3>
                <div className="appointment-info">
                  <div className="info-item">
                    <span className="info-icon">🕐</span>
                    <span>{appointment.time || 'Time TBD'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📋</span>
                    <span>{appointment.type || 'General Consultation'}</span>
                  </div>
                  {appointment.notes && (
                    <div className="info-item">
                      <span className="info-icon">📝</span>
                      <span>{appointment.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="appointment-actions">
                {appointment.status === 'scheduled' && (
                  <>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" size="small">
                      Reschedule
                    </Button>
                  </>
                )}
                {appointment.status === 'completed' && (
                  <Button variant="outline" size="small">
                    View Details
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
