import { useState, useEffect } from 'react';
import { labAPI } from '../../utils/api';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import './MedicalRecords.css';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, lab, prescriptions, visits

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      // In a real app, you'd fetch from multiple endpoints
      const labResponse = await labAPI.getAll();
      setRecords(labResponse.data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Loading medical records..." />;
  }

  return (
    <div className="medical-records-page">
      <div className="page-header">
        <h1>Medical Records</h1>
        <p>View your verified health records</p>
      </div>

      <div className="records-tabs">
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Records
        </button>
        <button
          className={`tab-btn ${activeTab === 'lab' ? 'active' : ''}`}
          onClick={() => setActiveTab('lab')}
        >
          Lab Results
        </button>
        <button
          className={`tab-btn ${activeTab === 'prescriptions' ? 'active' : ''}`}
          onClick={() => setActiveTab('prescriptions')}
        >
          Prescriptions
        </button>
        <button
          className={`tab-btn ${activeTab === 'visits' ? 'active' : ''}`}
          onClick={() => setActiveTab('visits')}
        >
          Visit History
        </button>
      </div>

      <div className="records-content">
        {records.length === 0 ? (
          <Card>
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No records found</h3>
              <p>Your medical records will appear here once available</p>
            </div>
          </Card>
        ) : (
          <div className="records-grid">
            {records.map((record, index) => (
              <Card key={record.id || index} className="record-card">
                <div className="record-header">
                  <div className="record-type">
                    <span className="type-icon">🔬</span>
                    <span className="type-label">Lab Result</span>
                  </div>
                  <span className="verified-badge">
                    <span className="badge-icon">✓</span>
                    Verified
                  </span>
                </div>
                
                <div className="record-body">
                  <h3>{record.test_name || 'Medical Record'}</h3>
                  <div className="record-info">
                    <div className="info-row">
                      <span className="info-label">Date:</span>
                      <span className="info-value">
                        {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    {record.doctor_name && (
                      <div className="info-row">
                        <span className="info-label">Doctor:</span>
                        <span className="info-value">Dr. {record.doctor_name}</span>
                      </div>
                    )}
                    {record.result && (
                      <div className="info-row">
                        <span className="info-label">Result:</span>
                        <span className="info-value">{record.result}</span>
                      </div>
                    )}
                  </div>
                  
                  {record.notes && (
                    <div className="record-notes">
                      <p>{record.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="record-actions">
                  <button className="action-btn">View Details</button>
                  <button className="action-btn">Download</button>
                  <button className="action-btn">Share</button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
