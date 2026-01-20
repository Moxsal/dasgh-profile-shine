import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

// Import images
import construction1 from '@/assets/construction-1.jpeg';
import construction2 from '@/assets/construction-2.jpeg';
import construction3 from '@/assets/construction-3.jpeg';
import popCeiling1 from '@/assets/pop-ceiling-1.jpeg';
import popCeiling2 from '@/assets/pop-ceiling-2.jpeg';
import lighting1 from '@/assets/lighting-1.jpeg';
import lighting2 from '@/assets/lighting-2.jpeg';
import lighting3 from '@/assets/lighting-3.jpeg';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Residential Construction',
    category: 'Building Construction',
    image: construction1,
  },
  {
    id: 2,
    title: 'Multi-Story Building Project',
    category: 'Building Construction',
    image: construction2,
  },
  {
    id: 3,
    title: 'Foundation & Structural Work',
    category: 'Building Construction',
    image: construction3,
  },
  {
    id: 4,
    title: 'Luxury Bedroom POP Ceiling',
    category: 'POP Ceiling',
    image: popCeiling1,
  },
  {
    id: 5,
    title: 'Elegant Hall Ceiling Design',
    category: 'POP Ceiling',
    image: popCeiling2,
  },
  {
    id: 6,
    title: 'Modern Wall Lighting',
    category: 'Lighting Systems',
    image: lighting1,
  },
  {
    id: 7,
    title: 'Designer Ceiling Lights',
    category: 'Lighting Systems',
    image: lighting2,
  },
  {
    id: 8,
    title: 'Contemporary LED Fixtures',
    category: 'Lighting Systems',
    image: lighting3,
  },
];

const categories = ['All', 'Building Construction', 'POP Ceiling', 'Lighting Systems'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-navy-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-3 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gold-50 mb-6">
            Projects That Speak for Themselves
          </h2>
          <p className="text-gold-100/70 text-lg">
            Browse through our completed projects and see the quality and craftsmanship 
            that Das GH Ltd delivers to every client.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'gold-gradient text-navy-800 shadow-gold'
                  : 'bg-navy-700 text-gold-100/80 hover:bg-navy-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(project)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-gold-50 font-serif font-medium mt-1">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-navy-900/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-gold-100 hover:text-gold-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="text-gold-400 text-sm uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h3 className="text-gold-50 font-serif text-xl mt-1">
                {selectedImage.title}
              </h3>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;
