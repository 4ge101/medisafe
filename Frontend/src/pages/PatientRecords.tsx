import React from 'react';
import type { User } from '../App';
// import './PatientRecords.css';

type Prescription = {
  name: string;
  dose: string;
  active: boolean;
};

type HealthData = {
  bloodType: string;
  dob: string;
  height: string;
  weight: string;
  allergies: string[];
  conditions: string[];
  prescriptions: Prescription[];
};

const health: HealthData = {
  bloodType: 'A+',
  dob: 'March 14, 1990',
  height: '5\'10"',
  weight: '172 lbs',
  allergies: ['Penicillin', 'Pollen', 'Shellfish'],
  conditions: ['Mild Hypertension', 'Seasonal Allergies'],
  prescriptions: [
    { name: 'Lisinopril', dose: '10mg — once daily', active: true },
    { name: 'Cetirizine', dose: '10mg — as needed', active: true },
    { name: 'Amoxicillin', dose: '500mg — course completed', active: false },
  ],
};

type Props = {
  user: User;
};

function PatientRecords({ user }: Props) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading...</p>;

  return (
    <div className="records-page">
      <h1>Health Records</h1>
      <p className="subtitle">Your personal medical information on file</p>

      <div className="records-grid">
        <div className="record-card">
          <h3>Basic Info</h3>
          <div className="record-item">
            <span className="label">Blood Type</span>
            <span className="value">{health.bloodType}</span>
          </div>
          <div className="record-item">
            <span className="label">Date of Birth</span>
            <span className="value">{health.dob}</span>
          </div>
          <div className="record-item">
            <span className="label">Height</span>
            <span className="value">{health.height}</span>
          </div>
          <div className="record-item">
            <span className="label">Weight</span>
            <span className="value">{health.weight}</span>
          </div>
        </div>

        <div className="record-card">
          <h3>Allergies</h3>
          <div style={{ marginBottom: '16px' }}>
            {health.allergies.map(a => (
              <span className="allergy-tag" key={a}>⚠️ {a}</span>
            ))}
          </div>

          <h3>Conditions</h3>
          {health.conditions.map(c => (
            <div className="record-item" key={c}>
              <span className="label">•</span>
              <span className="value" style={{ fontWeight: 400 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', paddingBottom: '10px', borderBottom: '2px solid var(--gray-200)' }}>
          Current Prescriptions
        </h2>
        {health.prescriptions.map(p => (
          <div className="prescription-card" key={p.name}>
            <div>
              <div className="med-name">💊 {p.name}</div>
              <div className="med-dose">{p.dose}</div>
            </div>
            {p.active && <span className="med-active">Active</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientRecords;