import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT US" },
  { to: "/schemes", label: "SCHEMES" },
  { to: "/apply", label: "APPLY" },
  { to: "/grievance", label: "GRIEVANCE" },
  { to: "/media", label: "MEDIA" },
  { to: "/contact", label: "CONTACT US" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const location = useLocation();

  const changeFontSize = (delta: number) => {
    const next = Math.max(14, Math.min(20, fontSize + delta));
    setFontSize(next);
    document.documentElement.style.fontSize = `${next}px`;
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top Government Bar */}
      <div className="gov-gradient text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-[11px] md:text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">🏛 GOVERNMENT OF TELANGANA</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Globe className="h-3 w-3" /> TG-CMFC OFFICIAL PORTAL
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">Screen Reader Access</span>
            <span className="hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => changeFontSize(-1)} className="hover:opacity-80 font-bold">A-</button>
              <span className="font-bold">A</span>
              <button onClick={() => changeFontSize(1)} className="hover:opacity-80 font-bold">A+</button>
            </div>
            <span className="hidden md:inline">|</span>
            <span className="text-accent">English</span>
          </div>
        </div>
      </div>

      {/* Logo + Officials Row */}
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30 text-primary font-extrabold text-xl">
              T
            </div>
            <div>
              <h1 className="text-base md:text-lg font-extrabold text-foreground leading-tight">
                Telangana Christian (Minorities) Finance Corporation
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                Minorities Welfare Department, Government of Telangana
              </p>
            </div>
          </Link>

          {/* Officials thumbnails (desktop) */}
          <div className="hidden xl:flex items-center gap-5">
            {[
              { name: "Sri A. Revanth Reddy", title: "HON'BLE CHIEF MINISTER" },
              { name: "Sri Mohammed Ali", title: "HON'BLE MINISTER FOR MW" },
            ].map((person) => (
              <div key={person.name} className="flex items-center gap-2 text-right">
                <div>
                  <p className="text-xs font-semibold text-foreground">{person.name}</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{person.title}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center text-sm font-bold text-primary">
                  {person.name.split(" ").pop()?.charAt(0)}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="xl:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden lg:block bg-foreground/95">
        <div className="container">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground"
                      : "text-background/90 hover:bg-primary/80 hover:text-primary-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-card animate-fade-in">
          <div className="container py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/apply" onClick={() => setMobileOpen(false)}>
              <Button className="w-full mt-2">Apply Now</Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
