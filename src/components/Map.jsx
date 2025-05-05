import { motion } from 'framer-motion';

const Map = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card overflow-hidden"
    >
      <h3 className="text-2xl font-bold mb-4">Our Location</h3>
      <div className="aspect-video rounded-lg overflow-hidden border border-surface-300 dark:border-surface-600">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.4733933767!2d-0.24168096582978775!3d51.52855824164938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1715203045171!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </motion.div>
  );
};

export default Map;