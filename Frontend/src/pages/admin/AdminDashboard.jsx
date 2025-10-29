import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1250,
    totalPatients: 890,
    totalDoctors: 125,
    pendingVerifications: 8,
  });

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage and monitor the healthcare platform</p>
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">🏥</div>
          <div className="stat-content">
            <h3>{stats.totalPatients}</h3>
            <p>Patients</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <h3>{stats.totalDoctors}</h3>
            <p>Doctors</p>
          </div>
        </Card>

        <Card className="stat-card alert">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{stats.pendingVerifications}</h3>
            <p>Pending Verifications</p>
          </div>
        </Card>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Quick Actions</h2>
        </div>
        
        <div className="quick-actions">
          <Link to="/admin/users" className="action-card">
            <Card hover>
              <div className="action-icon">👥</div>
              <h3>User Management</h3>
              <p>Manage patients and doctors</p>
            </Card>
          </Link>

          <Link to="/admin/verification" className="action-card">
            <Card hover>
              <div className="action-icon">✓</div>
              <h3>Verification Portal</h3>
              <p>Verify doctor registrations</p>
            </Card>
          </Link>

          <Link to="/admin/reports" className="action-card">
            <Card hover>
              <div className="action-icon">📊</div>
              <h3>Reports</h3>
              <p>View analytics and reports</p>
            </Card>
          </Link>

          <Link to="/admin/settings" className="action-card">
            <Card hover>
              <div className="action-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Platform configuration</p>
            </Card>
          </Link>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Activity</h2>
        </div>
        
        <Card>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-content">
                <p className="activity-text">New patient registered: John Doe</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">✓</div>
              <div className="activity-content">
                <p className="activity-text">Doctor verification approved: Dr. Sarah Smith</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📅</div>
              <div className="activity-content">
                <p className="activity-text">125 appointments scheduled today</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
