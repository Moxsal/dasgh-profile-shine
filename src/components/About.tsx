import { motion } from 'framer-motion';
import { CheckCircle, Target, Eye, Shield } from 'lucide-react';
import construction1 from '@/assets/construction-1.jpeg';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We use only premium materials and employ skilled craftsmen who take pride in delivering excellence.',
    },
    {
      icon: Target,
      title: 'On-Time Delivery',
      description: 'We understand the importance of deadlines and work diligently to complete projects on schedule.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear communication and honest pricing ensure you\'re always informed about your project\'s progress.',
    },
  ];

  const features = [
    'Licensed and insured construction company',
    'Experienced team of engineers and craftsmen',
    'Modern equipment and quality materials',
    'Comprehensive project management',
    'Competitive and transparent pricing',
    'After-project support and warranty',
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={construction1}
                alt="Das GH Ltd Construction Site"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 gold-gradient rounded-2xl -z-0 opacity-20" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-gold-500/30 rounded-2xl -z-0" />
            
            {/* Experience Badge */}
            <div className="absolute bottom-8 left-8 bg-navy-800 text-gold-50 p-6 rounded-xl shadow-lg z-20">
              <div className="text-4xl font-serif font-bold text-gold-400">7+</div>
              <div className="text-sm text-gold-100/70">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-gold-600 font-medium text-sm tracking-widest uppercase mb-3 block">
              About Das GH Ltd
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
              Building Ghana's Future, One Project at a Time
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Das GH Ltd is a leading construction and real estate company in Ghana, 
              dedicated to transforming visions into reality. With 7+ years of experience, 
              over 2,000 successful projects, and 900+ satisfied clients, we've built a 
              reputation for delivering exceptional quality, innovative designs, and reliable 
              service across residential and commercial projects.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From initial concept and architectural planning to construction, interior 
              finishing, and project supervision, we provide comprehensive solutions that 
              make your building journey seamless and satisfying.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl gold-gradient flex items-center justify-center">
                <value.icon className="w-8 h-8 text-navy-800" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
