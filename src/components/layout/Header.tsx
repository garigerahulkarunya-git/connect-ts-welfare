import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/schemes", label: "Schemes" },
  { to: "/apply", label: "Apply" },
  { to: "/grievance", label: "Grievance" },
  { to: "/media", label: "Media" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      {/* Top bar */}
      <div className="gov-gradient text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-xs md:text-sm">
          <span>Government of Telangana</span>
          <a href="tel:+914023456789" className="flex items-center gap-1 hover:underline">
            <Phone className="h-3 w-3" /> Helpline: 040-2345-6789
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            T
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold leading-tight text-foreground md:text-base">
              TGCMFC
            </h1>
            <p className="text-[10px] text-muted-foreground md:text-xs">
              Telangana Christian Minorities Finance Corporation
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/apply" className="hidden md:block">
            <Button size="sm">Apply Now</Button>
          </Link>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-card animate-fade-in">
          <div className="container py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
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
