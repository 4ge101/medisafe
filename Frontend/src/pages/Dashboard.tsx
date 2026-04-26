import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../App';
// import './Dashboard.css';

type Appointment = {
  id: number;
  doctor?: string;
  patient?: string;
  specialty?: string;
  reason?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'done' | 'cancelled';
};

const FAKE_APPOINTMENTS: Appointment[] = [
  { id: 1, doctor: 'Dr. Patel', specialty: 'Cardiology', date: 'May 5, 2025', time: '10:00 AM', status: 'upcoming' },
  { id: 2, doctor: 'Dr. Chen', specialty: 'General Practice', date: 'Apr 20, 2025', time: '2:30 PM', status: 'done' },
  { id: 3, doctor: 'Dr. Williams', specialty: 'Dermatology', date: 'Mar 12, 2025', time: '11:00 AM', status: 'cancelled' },
];

const DOCTOR_APPOINTMENTS: Appointment[] = [
  { id: 1, patient: 'Alice Johnson', reason: 'Annual Checkup', date: 'May 5, 2025', time: '10:00 AM', status: 'upcoming' },
  { id: 2, patient: 'Bob Smith', reason: 'Follow-up visit', date: 'May 5, 2025', time: '11:30 AM', status: 'upcoming' },
  { id: 3, patient: 'Carol White', reason: 'Lab results review', date: 'Apr 30, 2025', time: '3:00 PM', status: 'done' },
];

type Props = {
  user: User;
};

function Dashboard({ user }: Props) {
  const navigate = useNavigate();
  const isDoctor = user.role === 'doctor';

  const appointments = isDoctor ? DOCTOR_APPOINTMENTS : FAKE_APPOINTMENTS;
  const upcoming = appointments.filter(a => a.status === 'upcoming');

  return (
    <div className="dashboard">
      <div className="dash-header">
        <h1>Hello, {isDoctor ? 'Dr. ' : ''}{user.name} 👋</h1>
        <p>{isDoctor ? "Here's your schedule overview" : "Here's your health overview"}</p>
      </div>

      <div className="dash-stats">
        <div className="stat-card">
          <div className="stat-label">Upcoming</div>
          <div className="stat-num">{upcoming.length}</div>
          <div className="stat-sub">appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total</div>
          <div className="stat-num">{appointments.length}</div>
          <div className="stat-sub">all time</div>
        </div>
        {!isDoctor && (
          <div className="stat-card">
            <div className="stat-label">Blood Type</div>
            <div className="stat-num" style={{ fontSize: '24px' }}>A+</div>
            <div className="stat-sub">on file</div>
          </div>
        )}
      </div>

      {!isDoctor && (
        <div className="dash-quick-actions">
          <button className="btn-primary" onClick={() => navigate('/book')}>
            📅 Book Appointment
          </button>
          <button className="btn-outline" onClick={() => navigate('/records')}>
            📋 View My Records
          </button>
        </div>
      )}

      <div className="dash-section">
        <h2>{isDoctor ? "Today's Patients" : 'Your Appointments'}</h2>

        {appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No appointments yet</p>
            <button className="btn-primary" onClick={() => navigate('/book')}>
              Book your first one
            </button>
          </div>
        ) : (
          <div className="appointment-list">
            {appointments.map(apt => (
              <div className="apt-card" key={apt.id}>
                <div className="apt-info">
                  <h4>{isDoctor ? apt.patient : apt.doctor}</h4>
                  <p>{isDoctor ? apt.reason : apt.specialty} — {apt.date} at {apt.time}</p>
                </div>
                <span className={`apt-badge ${apt.status}`}>
                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;