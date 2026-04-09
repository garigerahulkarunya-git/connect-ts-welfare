import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, ChevronDown, ExternalLink, Landmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const logo = "/assets/images/logo.png";

const googleLanguages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृत" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली" },
  { code: "mni", name: "Manipuri", nativeName: "মৈতৈলোন্" },
  { code: "doi", name: "Dogri", nativeName: "डोगरी" },
];

const Header = () => {
  const [fontSize, setFontSize] = useState(16);
  const [currentLang, setCurrentLang] = useState(googleLanguages[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT US" },
    { to: "/schemes", label: "SCHEMES" },
    { to: "/statistics", label: "STATISTICS" },
    { to: "/gallery", label: "GALLERY" },
    { to: "/grievance", label: "GRIEVANCE" },
    { to: "/contact", label: "CONTACT US" },
  ];

  const changeGoogleLanguage = (lang: typeof googleLanguages[0]) => {
    setCurrentLang(lang);
    if (lang.code === "en") {
      document.cookie = "googtrans=; path=/; expires=" + new Date(0).toUTCString();
      document.cookie = "googtrans=; path=/; domain=." + window.location.hostname + "; expires=" + new Date(0).toUTCString();
      window.location.reload();
      return;
    }
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change"));
    } else {
      document.cookie = `googtrans=/en/${lang.code}; path=/`;
      document.cookie = `googtrans=/en/${lang.code}; path=/; domain=.${window.location.hostname}`;
      window.location.reload();
    }
  };

  const changeFontSize = (delta: number) => {
    const next = Math.max(14, Math.min(20, fontSize + delta));
    setFontSize(next);
    document.documentElement.style.fontSize = `${next}px`;
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">

      {/* ── Top Government Bar ── */}
      <div className="gov-gradient text-primary-foreground">
        <div className="w-full flex items-center justify-between py-1 px-2 sm:px-4 text-[9px] sm:text-[10px] md:text-xs font-medium">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="flex items-center gap-1"><Landmark className="h-3 w-3 sm:h-4 sm:w-4" /> GOVERNMENT OF TELANGANA</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Globe className="h-3 w-3" /> TG-CMFC OFFICIAL PORTAL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 notranslate" translate="no">
              <button onClick={() => changeFontSize(-1)} className="hover:opacity-80 font-bold px-0.5 sm:px-1">A-</button>
              <button onClick={() => { setFontSize(16); document.documentElement.style.fontSize = '16px'; }} className="hover:opacity-80 font-bold px-0.5 sm:px-1">A</button>
              <button onClick={() => changeFontSize(1)} className="hover:opacity-80 font-bold px-0.5 sm:px-1">A+</button>
            </div>
            <span>|</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="notranslate h-auto py-0 px-1 text-accent hover:text-accent font-bold gap-0.5 text-[9px] sm:text-[10px] md:text-xs" translate="no">
                  {currentLang.nativeName} <ChevronDown className="h-2.5 w-2.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="notranslate max-h-64 overflow-y-auto" translate="no">
                {googleLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeGoogleLanguage(lang)}
                    className={currentLang.code === lang.code ? "bg-accent text-accent-foreground font-bold" : ""}
                  >
                    {lang.nativeName} ({lang.name})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* ── Logo + Title + Officials Row ── same layout on all screen sizes, scaled */}
      <div className="container py-1.5 sm:py-2 md:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">

          {/* Left: Logo + Title */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
            <div className="h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center bg-white overflow-hidden shrink-0">
              <img
                src={logo}
                alt="Government of Telangana Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerText = 'T';
                  target.parentElement!.classList.add('bg-primary/5', 'text-primary', 'font-extrabold', 'text-xl');
                }}
              />
            </div>
            <div className="border-l-2 border-primary/20 pl-2 sm:pl-3 md:pl-4 min-w-0">
              <h1 className="text-[10px] sm:text-sm md:text-lg lg:text-2xl font-serif font-bold text-foreground leading-tight">
                Telangana Christian (Minorities) Finance Corporation
              </h1>
              <p className="text-[8px] sm:text-[10px] md:text-[11px] lg:text-[13px] text-muted-foreground font-medium uppercase tracking-wide">
                MINORITIES WELFARE DEPARTMENT, GOVERNMENT OF TELANGANA
              </p>
            </div>
          </Link>

          {/* Right: Officials + Rising Logo */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0">

            {/* CM + Minister photos */}
            {[
              { name: "Sri A. Revanth Reddy", title: "HON'BLE CHIEF MINISTER", photo: "/assets/images/cm.png" },
              { name: "Sri Mohammed Ali", title: "HON'BLE MINISTER FOR MW", photo: "/assets/images/minister.png" },
            ].map((person) => (
              <div key={person.name} className="flex flex-col items-center gap-0.5 sm:gap-1 text-center shrink-0">
                <div className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded bg-muted border-b-2 border-primary overflow-hidden shadow-sm">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const initials = person.name.split(" ").pop()?.charAt(0) || "";
                      target.parentElement!.innerText = initials;
                      target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'font-bold', 'text-primary');
                    }}
                  />
                </div>
                <p className="text-[7px] sm:text-[8px] md:text-[9px] font-bold text-foreground leading-tight whitespace-nowrap max-w-[48px] sm:max-w-none truncate sm:overflow-visible">{person.name}</p>
                <p className="text-[6px] sm:text-[7px] md:text-[8px] text-muted-foreground font-semibold uppercase whitespace-nowrap">{person.title}</p>
              </div>
            ))}

            {/* Telangana Rising Logo */}
            <div className="flex flex-col items-center justify-center h-8 w-8 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-24 lg:w-24 shrink-0">
              <img
                src="/assets/images/rising.png"
                alt="Telangana Rising"
                className="h-full w-full object-contain"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <nav className="bg-foreground/95">
        <div className="flex items-center pr-[72px]">

          {/* DESKTOP: all links visible */}
          <div className="hidden lg:flex flex-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-background/90 hover:bg-primary/80 hover:text-primary-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* MOBILE / TABLET: active page label */}
          <div className="lg:hidden flex-1 flex items-center">
            {navLinks.filter(l => l.to === location.pathname).map(link => (
              <span
                key={link.to}
                className="bg-primary text-primary-foreground px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                {link.label}
              </span>
            ))}
          </div>

          {/* Ministry Portal — always visible, full text on all sizes */}
          <Link
            to="https://minoritywelfare.telangana.gov.in"
            target="_blank"
            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground px-2 sm:px-3 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-[8px] sm:text-[9px] lg:text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0"
          >
            <Landmark className="h-3 w-3 lg:h-4 lg:w-4 shrink-0" />
            Ministry Portal
            <ExternalLink className="h-2.5 w-2.5 lg:h-3 lg:w-3 opacity-80" />
          </Link>

          {/* Hamburger — right side, mobile/tablet only, with gap */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden ml-2 sm:ml-3 px-3 py-2 sm:py-2.5 text-background/80 hover:bg-primary/80 hover:text-primary-foreground transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile / Tablet Dropdown Menu ── */}
      {menuOpen && (
        <div className="lg:hidden absolute left-0 right-0 bg-card border-t border-border shadow-xl z-50">
          <div className="container py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors border-b border-border/40 last:border-0 flex items-center justify-between ${location.pathname === link.to
                  ? "text-primary font-bold bg-primary/5"
                  : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
            <Link
              to="https://minoritywelfare.telangana.gov.in"
              target="_blank"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-primary uppercase tracking-wide hover:bg-muted"
            >
              <Landmark className="h-4 w-4" />
              Ministry Portal
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
