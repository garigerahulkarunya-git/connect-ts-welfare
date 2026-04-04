import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-foreground/95 text-background/80">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* About */}
            <div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-extrabold text-lg mb-4">
                T
              </div>
              <p className="text-sm leading-relaxed">
                {t("footer_about_text")}
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-bold text-background uppercase tracking-wider text-sm mb-5">{t("footer_location_title")}</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>{t("footer_address")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a href="tel:04023391067" className="hover:text-background transition-colors">040-23391067 / 68</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a href="mailto:tgcmfc@gmail.com" className="hover:text-background transition-colors">tgcmfc@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Other Portals */}
            <div>
              <h4 className="font-bold text-background uppercase tracking-wider text-sm mb-5">{t("footer_portals_title")}</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-background transition-colors">{t("footer_portal_state")}</a></li>
                <li><a href="#" className="hover:text-background transition-colors">{t("footer_portal_mwd")}</a></li>
                <li><a href="#" className="hover:text-background transition-colors">{t("footer_portal_cgg")}</a></li>
                <li><a href="#" className="hover:text-background transition-colors">{t("footer_portal_epass")}</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-bold text-background uppercase tracking-wider text-sm mb-5">{t("footer_follow_title")}</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-background" />
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-sky-500 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-background" />
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="YouTube">
                  <Youtube className="h-5 w-5 text-background" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-foreground text-background/50 py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] uppercase tracking-wider font-medium">
          <p>© {new Date().getFullYear()} {t("footer_copyright")}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-background transition-colors">{t("footer_privacy")}</a>
            <a href="#" className="hover:text-background transition-colors">{t("footer_terms")}</a>
            <a href="#" className="hover:text-background transition-colors">{t("footer_sitemap")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
