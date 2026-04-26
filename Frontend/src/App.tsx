import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import PatientRecords from './pages/PatientRecords';

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
};

function App() {

  const [user, setUser] = React.useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register login={login} />} />

        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/book"
          element={user ? <BookAppointment user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/records"
          element={user ? <PatientRecords user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;