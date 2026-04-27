import { Link, useLocation } from "react-router-dom";
import type { User } from "../App";
import "../styles/Navbar.css";

type Props = {
  user: User | null;
  logout: () => void;
};

function Navbar({ user, logout }: Props) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Medi<span>Safe</span>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/dashboard" className={isActive("/dashboard")}>
                Dashboard
              </Link>
            </li>

            {user.role === "patient" && (
              <>
                <li>
                  <Link to="/book" className={isActive("/book")}>
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link to="/records" className={isActive("/records")}>
                    My Records
                  </Link>
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={isActive("/login")}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={isActive("/register")}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {user && (
        <div className="navbar-user">
          <span className="user-badge">
            {user.role === "doctor" ? "🩺 Dr." : "👤"} {user.name}
          </span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
