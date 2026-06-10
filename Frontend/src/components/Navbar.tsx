import { useLocation } from "preact-iso";
import "../styles/Navbar.css";

const secondaryLinks = [
  { href: "/about", label: "About" },
  { href: "/newsletters", label: "Newsletters" },
  { href: "/podcast", label: "Podcast" },
  { href: "/contact", label: "Have a Tip?" },
];

const reportingTopics = [
  { href: "/news", label: "Latest News" },
  { href: "/investigations", label: "Investigations" },
  { href: "/corruption-tracker", label: "Corruption Tracker" },
];

export default function Navbar() {
  const { path } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand">
          <a href="/" className="navbar-logo">
            GraftWatch
          </a>
          <span className="navbar-tagline">
            Investigative Journalism
            <br />
            in the Public Interest
          </span>
        </div>
        <div className="navbar-actions">
          <button className="navbar-menu-btn">☰ Menu</button>
          <button className="navbar-search-btn">⌕</button>
          <button className="navbar-donate-btn">Donate</button>
        </div>
      </div>
      <div className="navbar-secondary">
        <div className="navbar-reporting">
          <span className="reporting-label">Reporting On</span>
          {reportingTopics.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="navbar-links">
          {secondaryLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
