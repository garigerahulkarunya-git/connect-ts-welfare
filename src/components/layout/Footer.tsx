import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gov-gradient text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-4">TGCMFC</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Telangana Christian Minorities Finance Corporation is dedicated to the socio-economic
              development of Christian minorities in Telangana through various welfare schemes and programs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/schemes" className="hover:opacity-100 hover:underline">All Schemes</Link></li>
              <li><Link to="/apply" className="hover:opacity-100 hover:underline">Apply for Scheme</Link></li>
              <li><Link to="/grievance" className="hover:opacity-100 hover:underline">File Grievance</Link></li>
              <li><Link to="/about" className="hover:opacity-100 hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 hover:underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 hover:underline">RTI</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">Annual Reports</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">Tenders</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Minorities Bhawan, 5th Floor, Nampally, Hyderabad - 500001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+914023456789" className="hover:underline">040-2345-6789</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@tgcmfc.gov.in" className="hover:underline">info@tgcmfc.gov.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} Telangana Christian Minorities Finance Corporation. All rights reserved.</p>
          <p className="mt-1">Designed & Developed for the Government of Telangana</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
