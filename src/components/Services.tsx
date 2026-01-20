import { motion } from 'framer-motion';
import { Building2, Home, Paintbrush, Lightbulb, Hammer, ClipboardCheck, Layers, Wrench, UtensilsCrossed, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Import images
import construction1 from '@/assets/construction-1.jpeg';
import construction2 from '@/assets/construction-2.jpeg';
import construction3 from '@/assets/construction-3.jpeg';
import popCeiling1 from '@/assets/pop-ceiling-1.jpeg';
import popCeiling2 from '@/assets/pop-ceiling-2.jpeg';
import lighting2 from '@/assets/lighting-2.jpeg';
import lighting3 from '@/assets/lighting-3.jpeg';

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  image: string;
}

const services: Service[] = [
  {
    id: 'building-construction',
    icon: Building2,
    title: 'Building Construction',
    shortDesc: 'Complete construction from foundation to finishing',
    description: 'Das GH Ltd offers comprehensive building construction services that cover every phase of your project—from laying the foundation to delivering the final keys. Our experienced engineers and skilled craftsmen work together to ensure structural integrity, timely delivery, and exceptional quality that exceeds industry standards.',
    benefits: [
      'End-to-end project management',
      'Quality materials and skilled labor',
      'Strict adherence to building codes',
      'Transparent pricing and timelines',
    ],
    image: construction2,
  },
  {
    id: 'real-estate',
    icon: Home,
    title: 'Real Estate Services',
    shortDesc: 'Property development and investment solutions',
    description: 'Navigate the Ghanaian property market with confidence. Our real estate division provides expert guidance on property acquisition, land documentation, and investment opportunities. Whether you\'re buying, selling, or developing, we ensure secure transactions and maximum value for your investment.',
    benefits: [
      'Property valuation and assessment',
      'Land title verification',
      'Investment advisory services',
      'Development partnerships',
    ],
    image: construction1,
  },
  {
    id: 'building-plan',
    icon: Ruler,
    title: 'Building Plan Design',
    shortDesc: 'Professional architectural planning and design',
    description: 'Transform your vision into detailed architectural plans that balance aesthetics, functionality, and budget. Our design team creates comprehensive building plans that comply with local regulations while maximizing space utilization and natural lighting for comfortable living or working environments.',
    benefits: [
      'Custom residential and commercial designs',
      'Permit-ready documentation',
      'Space optimization strategies',
      '3D visualization available',
    ],
    image: construction3,
  },
  {
    id: 'pop-ceiling',
    icon: Layers,
    title: 'POP Ceiling Installation',
    shortDesc: 'Elegant plaster of Paris ceiling designs',
    description: 'Elevate your interiors with our stunning POP (Plaster of Paris) ceiling installations. From sleek modern designs to elaborate traditional patterns, our artisans create ceiling masterpieces that add depth, character, and elegance to any room. Each installation features integrated lighting options for dramatic effect.',
    benefits: [
      'Custom design patterns',
      'LED lighting integration',
      'Durable, crack-resistant finish',
      'Quick installation process',
    ],
    image: popCeiling1,
  },
  {
    id: 'painting',
    icon: Paintbrush,
    title: 'Painting Services',
    shortDesc: 'Interior and exterior painting excellence',
    description: 'A professional paint job transforms spaces and protects surfaces. Das GH Ltd delivers flawless painting services for both interior and exterior applications. We use premium paints that resist Ghana\'s tropical climate, ensuring vibrant colors and long-lasting protection for years to come.',
    benefits: [
      'Premium weather-resistant paints',
      'Color consultation services',
      'Surface preparation included',
      'Residential and commercial projects',
    ],
    image: popCeiling2,
  },
  {
    id: 'kitchen-cabinet',
    icon: UtensilsCrossed,
    title: 'Kitchen Cabinet Installation',
    shortDesc: 'Custom kitchen cabinetry solutions',
    description: 'Your kitchen deserves cabinets that combine beauty with functionality. We design and install custom kitchen cabinetry using quality materials and modern hardware. From space-saving solutions for compact kitchens to luxury installations, we create storage solutions that make cooking a pleasure.',
    benefits: [
      'Custom designs to fit any space',
      'Quality wood and hardware',
      'Soft-close mechanisms',
      'Counter and sink integration',
    ],
    image: lighting2,
  },
  {
    id: 'lighting-systems',
    icon: Lightbulb,
    title: 'Lighting Systems',
    shortDesc: 'Modern lighting design and installation',
    description: 'Illuminate your spaces with style and efficiency. Our lighting specialists design and install comprehensive lighting systems—from ambient recessed lighting and elegant chandeliers to functional task lighting and energy-efficient LED solutions that reduce electricity costs while enhancing ambiance.',
    benefits: [
      'Energy-efficient LED solutions',
      'Ambient and accent lighting',
      'Smart lighting options',
      'Complete electrical integration',
    ],
    image: lighting3,
  },
  {
    id: 'renovation',
    icon: Hammer,
    title: 'Renovation Services',
    shortDesc: 'Complete home and office renovations',
    description: 'Breathe new life into existing structures with our comprehensive renovation services. Whether you\'re updating a single room or transforming an entire building, we manage the entire process—from demolition to reconstruction—ensuring minimal disruption and maximum improvement to your property.',
    benefits: [
      'Complete structural assessments',
      'Modern upgrades and improvements',
      'Timeline-conscious execution',
      'Budget management included',
    ],
    image: construction1,
  },
  {
    id: 'interior-finishing',
    icon: Wrench,
    title: 'Interior Finishing',
    shortDesc: 'Premium interior completion and detailing',
    description: 'The finishing touches make all the difference. Das GH Ltd excels in interior finishing—flooring, wall treatments, trim work, and fixtures that complete your space with sophistication. We source quality materials and employ skilled craftsmen who understand that details create perfection.',
    benefits: [
      'Quality flooring installation',
      'Wall treatments and textures',
      'Trim and molding work',
      'Fixture installation',
    ],
    image: popCeiling1,
  },
  {
    id: 'project-supervision',
    icon: ClipboardCheck,
    title: 'Project Supervision',
    shortDesc: 'Professional construction oversight',
    description: 'Building your own project? Let our experienced supervisors ensure everything is done right. We provide professional project supervision services that monitor quality, manage contractors, verify materials, and keep your construction on schedule and within budget—giving you peace of mind.',
    benefits: [
      'Daily site monitoring',
      'Quality control checks',
      'Contractor coordination',
      'Progress reporting',
    ],
    image: construction3,
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold-600 font-medium text-sm tracking-widest uppercase mb-3 block">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Comprehensive Construction & Interior Services
          </h2>
          <p className="text-muted-foreground text-lg">
            From the ground up to the finishing touches, Das GH Ltd provides end-to-end 
            solutions for all your building and design needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="service-card h-full bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-800/80 via-navy-800/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-navy-800" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-gold-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-4">
                    {service.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <a href="#contact">
                    <Button variant="ghost" size="sm" className="group/btn text-gold-600 hover:text-gold-700 p-0">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Ready to start your project? Let's discuss your requirements.
          </p>
          <a
            href="https://wa.me/233240384380"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="gold" size="lg">
              Get a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
