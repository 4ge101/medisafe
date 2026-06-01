import { useLocation } from "preact-iso";

const links = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/investigations", label: "Investigations" },
  { href: "/corruption-tracker", label: "Corruption Tracker" },
  { href: "/district-reports", label: "District Reports" },
  { href: "/fact-check", label: "Fact Check" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { path } = useLocation();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          aria-current={path === href ? "page" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}