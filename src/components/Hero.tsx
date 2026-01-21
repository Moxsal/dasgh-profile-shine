import { motion } from 'framer-motion';
import { ArrowRight, Phone, Building2, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-construction.jpg';

const Hero = () => {
  const stats = [
    { icon: Building2, value: '2,000+', label: 'Projects Completed' },
    { icon: Users, value: '900+', label: 'Happy Clients' },
    { icon: Award, value: '7+', label: 'Years Experience' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Das GH Ltd Construction Site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative container-custom pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-gold-400 font-medium text-sm tracking-widest uppercase mb-4">
              Ghana's Trusted Construction Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-gold-50 leading-tight mb-6"
          >
            Building Your Dreams{' '}
            <span className="text-gradient-gold">Into Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gold-100/80 leading-relaxed mb-8 max-w-2xl"
          >
            From architectural design to final finishing, Das GH Ltd delivers exceptional 
            construction and interior solutions. We transform visions into stunning structures 
            that stand the test of time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a href="#services">
              <Button variant="hero" size="xl">
                Explore Our Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a
              href="https://wa.me/233240384380"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero-outline" size="xl">
                <Phone className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8 sm:gap-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-gold-50">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gold-100/60">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gold-100/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-gold-400/40 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 bg-gold-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
