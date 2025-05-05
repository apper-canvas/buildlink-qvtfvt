import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

export default function Home({ toast }) {
  // Define icon components
  const BuildingIcon = getIcon('Building');
  const PieChartIcon = getIcon('PieChart');
  const FileTextIcon = getIcon('FileText');
  const UsersIcon = getIcon('Users');
  const CalendarIcon = getIcon('Calendar');
  const CheckSquareIcon = getIcon('CheckSquare');

  // Project data for demo
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Heritage Tower Construction",
      location: "Downtown Metro",
      status: "inProgress",
      progress: 35,
      startDate: new Date(2023, 8, 15),
      targetEndDate: new Date(2024, 5, 30),
      budget: 2750000,
      team: ["John Builder", "Maria Architect", "Carlos Engineer"],
      description: "30-story commercial tower with retail space on the ground floor and office spaces.",
    },
    {
      id: 2,
      name: "Riverside Apartments",
      location: "Waterfront District",
      status: "planning",
      progress: 10,
      startDate: new Date(2023, 11, 5),
      targetEndDate: new Date(2024, 10, 15),
      budget: 1850000,
      team: ["Emma Developer", "Alex Engineer", "Sam Contractor"],
      description: "Luxury apartment complex with 45 units, underground parking, and communal gardens.",
    },
    {
      id: 3,
      name: "Greenfield Shopping Mall",
      location: "Suburban Junction",
      status: "permitting",
      progress: 15,
      startDate: new Date(2023, 9, 20),
      targetEndDate: new Date(2024, 8, 10),
      budget: 3500000,
      team: ["David Manager", "Lisa Designer", "Paul Supervisor"],
      description: "Modern shopping mall with 60 retail spaces, food court, and entertainment complex.",
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'planning': return 'bg-blue-500';
      case 'permitting': return 'bg-yellow-500';
      case 'inProgress': return 'bg-green-500';
      case 'onHold': return 'bg-red-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'planning': return 'Planning';
      case 'permitting': return 'Permitting';
      case 'inProgress': return 'In Progress';
      case 'onHold': return 'On Hold';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const handleProjectUpdate = (updatedProject) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    toast.success(`${updatedProject.name} updated successfully!`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                Streamline Your Construction Projects
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 text-blue-100"
              >
                Connect, collaborate, and complete projects on time and within budget with BuildLink's comprehensive management platform.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <a href="#projects" className="btn-secondary text-center">
                  Explore Projects
                </a>
                <a href="#features" className="btn bg-white text-primary hover:bg-blue-50 text-center">
                  View Features
                </a>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Construction project management" 
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-surface-800 p-4 rounded-xl shadow-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckSquareIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-surface-800 dark:text-white font-semibold">Project Tracking</p>
                    <p className="text-surface-500 text-sm">Real-time updates</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-50 dark:from-surface-900 to-transparent"></div>
      </section>

      {/* Key features section */}
      <section id="features" className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Construction Management</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Our platform provides all the tools you need to manage complex construction projects from planning to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="card hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5">
                <PieChartIcon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Project Dashboard</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Real-time progress tracking, budget monitoring, and timeline visualization in one central location.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="card hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-5">
                <FileTextIcon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Document Management</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Store, share, and control versions of blueprints, permits, contracts, and other critical documents.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="card hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-5">
                <UsersIcon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Connect all stakeholders in one platform with messaging, notifications, and permission controls.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main feature section */}
      <section className="py-16 bg-white dark:bg-surface-800">
        <div className="container-custom">
          <MainFeature toast={toast} />
        </div>
      </section>

      {/* Projects section */}
      <section id="projects" className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Active Projects</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              View and manage your ongoing construction projects in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map(project => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -5 }}
                className="card hover:shadow-lg border border-surface-200 dark:border-surface-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <BuildingIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>

                <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-surface-100 dark:bg-surface-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-surface-500 dark:text-surface-400 text-xs mb-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Start Date</span>
                    </div>
                    <p className="font-medium">{format(project.startDate, 'MMM dd, yyyy')}</p>
                  </div>
                  <div className="bg-surface-100 dark:bg-surface-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-surface-500 dark:text-surface-400 text-xs mb-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Target End</span>
                    </div>
                    <p className="font-medium">{format(project.targetEndDate, 'MMM dd, yyyy')}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-surface-500 dark:text-surface-400 mb-1">Budget</div>
                    <div className="font-semibold">${project.budget.toLocaleString()}</div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-sm"
                    onClick={() => {
                      // Simulate a project update
                      const updatedProject = {
                        ...project,
                        progress: Math.min(100, project.progress + 5)
                      };
                      handleProjectUpdate(updatedProject);
                    }}
                  >
                    Update Status
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}