import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const logo = "/assets/images/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t("nav_home") },
    { to: "/about", label: t("nav_about") },
    { to: "/schemes", label: t("nav_schemes") },
    { to: "/apply", label: t("nav_apply") },
    { to: "/grievance", label: t("nav_grievance") },
    { to: "/media", label: t("nav_media") },
    { to: "/contact", label: t("nav_contact") },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

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
            <span className="flex items-center gap-1">🏛 {t("header_govt_telangana")}</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Globe className="h-3 w-3" /> {t("header_portal_title")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">{t("header_screen_reader")}</span>
            <span className="hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => changeFontSize(-1)} className="hover:opacity-80 font-bold">A-</button>
              <span className="font-bold">A</span>
              <button onClick={() => changeFontSize(1)} className="hover:opacity-80 font-bold">A+</button>
            </div>
            <span className="hidden md:inline">|</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto py-0 px-1 text-accent hover:text-accent font-bold gap-1">
                  {currentLanguage.nativeName} <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={i18n.language === lang.code ? "bg-accent text-accent-foreground font-bold" : ""}
                  >
                    {lang.nativeName} ({lang.name})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Logo + Officials Row */}
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-white border-2 border-primary/20 overflow-hidden shadow-sm">
              <img 
                src={logo} 
                alt="Government of Telangana Logo" 
                className="h-full w-full object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerText = 'T';
                  target.parentElement!.classList.add('bg-primary/10', 'text-primary', 'font-extrabold', 'text-xl');
                }}
              />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-extrabold text-foreground leading-tight uppercase">
                {t("header_govt")} - {t("header_corp_name")}
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                {t("header_dept_name")}, {t("header_govt")}
              </p>
            </div>
          </Link>

          {/* Officials thumbnails (desktop) */}
          <div className="hidden xl:flex items-center gap-5">
            {[
              { 
                name: t("header_official_cm_name"), 
                title: t("header_official_cm_title"),
                photo: "/assets/images/cm.png" 
              },
              { 
                name: t("header_official_min_name"), 
                title: t("header_official_min_title"),
                photo: "/assets/images/minister.png" 
              },
            ].map((person) => (
              <div key={person.name} className="flex items-center gap-2 text-right">
                <div>
                  <p className="text-xs font-semibold text-foreground">{person.name}</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{person.title}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center text-sm font-bold text-primary overflow-hidden">
                  <img 
                    src={person.photo} 
                    alt={person.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const initials = person.name.includes(" ") ? person.name.split(" ").pop()?.charAt(0) : person.name.charAt(0);
                      target.parentElement!.innerText = initials || "";
                    }}
                  />
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
              <Button className="w-full mt-2">{t("nav_apply_now")}</Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
