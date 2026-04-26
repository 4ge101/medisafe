import React from 'react';
import type { User } from '../App';
// import './BookAppointment.css';

type Doctor = {
  id: number;
  name: string;
  specialty: string;
};

const DOCTORS: Doctor[] = [
  { id: 1, name: 'Dr. Patel', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Chen', specialty: 'General Practice' },
  { id: 3, name: 'Dr. Williams', specialty: 'Dermatology' },
  { id: 4, name: 'Dr. Nguyen', specialty: 'Pediatrics' },
];

type Props = {
  user: User;
};

function BookAppointment({ user }: Props) {
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(null);
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert('Please pick a doctor first');
      return;
    }

    setLoading(true);

    await new Promise(r => setTimeout(r, 1000));

    console.log('Booking:', { doctor: selectedDoctor, date, time, reason, patientId: user.id });

    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="book-page">
        <div className="success-box">
          <div className="success-icon">✅</div>
          <h3>Appointment Booked!</h3>
          <p>
            Your appointment with {selectedDoctor.name} on {date} at {time} has been confirmed.
            You'll receive a reminder before your visit.
          </p>
          <br />
          <button className="btn-primary" onClick={() => setDone(false)}>
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="book-page">
      <h1>Book Appointment</h1>
      <p className="subtitle">Choose a doctor and pick your preferred time</p>

      <div className="book-card">
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Choose a Doctor</label>
            <div className="doctor-grid">
              {DOCTORS.map(doc => (
                <button
                  type="button"
                  key={doc.id}
                  className={`doctor-option ${selectedDoctor?.id === doc.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <div className="doc-name">🩺 {doc.name}</div>
                  <div className="doc-spec">{doc.specialty}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Preferred Time</label>
            <select value={time} onChange={e => setTime(e.target.value)} required>
              <option value="">Pick a time slot</option>
              <option>9:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>2:00 PM</option>
              <option>3:00 PM</option>
              <option>4:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Reason for Visit (optional)</label>
            <input
              type="text"
              placeholder="e.g. Regular checkup, back pain..."
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary form-submit" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;