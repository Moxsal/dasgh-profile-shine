import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'WhatsApp / Phone',
      value: '+233 24 038 4380',
      link: 'https://wa.me/233240384380',
      action: 'Chat on WhatsApp',
    },
    {
      icon: Mail,
      title: 'Email Address',
      value: 'dasghlimited@gmail.com',
      link: 'mailto:dasghlimited@gmail.com',
      action: 'Send Email',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Ghana, West Africa',
      link: null,
      action: null,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon - Sat: 8:00 AM - 6:00 PM',
      link: null,
      action: null,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-navy-800">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gold-50 mb-6">
              Let's Build Something Great Together
            </h2>
            <p className="text-gold-100/70 text-lg leading-relaxed mb-8">
              Ready to start your construction or renovation project? Contact Das GH Ltd today 
              for a free consultation. Our team is ready to discuss your needs, provide expert 
              advice, and deliver a detailed quote.
            </p>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-navy-700/50 backdrop-blur rounded-xl p-5 border border-gold-500/10"
                >
                  <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center mb-3">
                    <info.icon className="w-5 h-5 text-navy-800" />
                  </div>
                  <h3 className="text-gold-50 font-medium mb-1">{info.title}</h3>
                  <p className="text-gold-100/70 text-sm mb-2">{info.value}</p>
                  {info.link && (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors"
                    >
                      {info.action} →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <div className="w-full bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-8 sm:p-10 text-center shadow-gold">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-navy-800/20 flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-navy-800" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy-800 mb-4">
                Get a Free Quote Today
              </h3>
              <p className="text-navy-700 mb-8">
                Send us a message on WhatsApp and receive a detailed quote within 24 hours. 
                No obligations, just expert advice tailored to your project needs.
              </p>
              <a
                href="https://wa.me/233240384380?text=Hello%20Das%20GH%20Ltd,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="navy" size="xl" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5" />
                  WhatsApp: +233 24 038 4380
                </Button>
              </a>
              <p className="text-navy-700/70 text-sm mt-4">
                Or email us at{' '}
                <a href="mailto:dasghlimited@gmail.com" className="underline font-medium">
                  dasghlimited@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
