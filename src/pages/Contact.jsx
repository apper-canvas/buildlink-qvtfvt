import { useEffect } from 'react';
    document.title = 'Contact Us - Buildcon Constructions';
                    <p className="text-surface-600 dark:text-surface-400">info@buildconconstructions.com</p>
      document.title = 'Buildcon Constructions';
                Buildcon Constructions is a leading construction and development company with over 15 years of experience in commercial, residential, and industrial projects. Our team of skilled professionals is dedicated to delivering high-quality construction services on time and within budget.

const Contact = ({ toast }) => {
                We pride ourselves on our attention to detail, innovative solutions, and commitment to client satisfaction. Whether you're planning a new build, renovation, or seeking consultation, our experts are ready to assist you every step of the way.
  useEffect(() => {
    document.title = 'Contact Us - BuildLink';
    return () => {
      document.title = 'BuildLink';
    };
  }, []);

  // Get icons
  const MapPinIcon = getIcon('MapPin');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const ClockIcon = getIcon('Clock');
  const LinkedinIcon = getIcon('Linkedin');
  const FacebookIcon = getIcon('Facebook');
  const TwitterIcon = getIcon('Twitter');
  const InstagramIcon = getIcon('Instagram');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-16"
    >
      <div className="container-custom">
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Have questions about our services or want to start a project? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Company Info Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">About BuildLink</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                BuildLink is a leading construction and development company with over 15 years of experience in commercial, residential, and industrial projects. Our team of skilled professionals is dedicated to delivering high-quality construction services on time and within budget.
              </p>
              <p className="text-surface-600 dark:text-surface-400">
                We pride ourselves on our attention to detail, innovative solutions, and commitment to client satisfaction. Whether you're planning a new build, renovation, or seeking consultation, our experts are ready to assist you every step of the way.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Visit Us</p>
                    <p className="text-surface-600 dark:text-surface-400">
                      123 Construction Avenue,<br />
                      Building City, BC 10001,<br />
                      United States
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <PhoneIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Call Us</p>
                    <p className="text-surface-600 dark:text-surface-400">(555) 123-4567</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <MailIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Email Us</p>
                    <p className="text-surface-600 dark:text-surface-400">info@buildlink.com</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <ClockIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Opening Hours</p>
                    <p className="text-surface-600 dark:text-surface-400">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-surface-600 dark:text-surface-400">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-surface-600 dark:text-surface-400">Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>
            <Map />
          </motion.div>
          <ContactForm toast={toast} />
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;