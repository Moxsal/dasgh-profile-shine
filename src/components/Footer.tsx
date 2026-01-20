import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const services = [
    'Building Construction',
    'Real Estate Services',
    'Building Plan Design',
    'POP Ceiling Installation',
    'Painting Services',
    'Kitchen Cabinet Installation',
    'Lighting Systems',
    'Renovation Services',
    'Interior Finishing',
    'Project Supervision',
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-navy-900 text-gold-100/80">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                <span className="text-navy-800 font-serif font-bold text-xl">D</span>
              </div>
              <div>
                <span className="text-gold-400 font-serif font-semibold text-xl">
                  Das GH Ltd
                </span>
              </div>
            </div>
            <p className="text-gold-100/60 text-sm leading-relaxed mb-6">
              Ghana's trusted partner for construction, real estate, and interior solutions. 
              Building excellence since day one.
            </p>
            <div className="space-y-3">
              <a
                href="https://wa.me/233240384380"
                className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-500" />
                +233 24 038 4380
              </a>
              <a
                href="mailto:dasghlimited@gmail.com"
                className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-gold-500" />
                dasghlimited@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold-500" />
                Ghana, West Africa
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-gold-50 font-serif font-semibold text-lg mb-4">
              Our Services
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {services.map((service, index) => (
                <a
                  key={index}
                  href="#services"
                  className="text-sm text-gold-100/60 hover:text-gold-400 transition-colors"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-50 font-serif font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gold-100/60 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold-500/10">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gold-100/50 text-sm">
              © {new Date().getFullYear()} Das GH Ltd. All rights reserved.
            </p>
            <p className="text-gold-100/50 text-sm">
              Building Your Dreams Into Reality
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
