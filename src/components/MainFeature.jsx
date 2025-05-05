import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function MainFeature({ toast }) {
  // Define icon components
  const PlusIcon = getIcon('Plus');
  const XIcon = getIcon('X');
  const Loader2Icon = getIcon('Loader2');
  const ArrowRightIcon = getIcon('ArrowRight');
  const InfoIcon = getIcon('Info');
  const AlertCircleIcon = getIcon('AlertCircle');
  const CheckCircleIcon = getIcon('CheckCircle');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Foundation inspection", 
      description: "Complete inspection of foundation work with city inspector",
      dueDate: "2023-12-15", 
      status: "pending", 
      priority: "high",
      assignedTo: "John Builder"
    },
    { 
      id: 2, 
      title: "Electrical wiring", 
      description: "Install electrical wiring for first floor according to approved plans",
      dueDate: "2023-12-20", 
      status: "inProgress", 
      priority: "medium",
      assignedTo: "Maria Electrician"
    },
    { 
      id: 3, 
      title: "Order plumbing fixtures", 
      description: "Source and order all plumbing fixtures for bathrooms and kitchen",
      dueDate: "2023-12-10", 
      status: "completed", 
      priority: "low",
      assignedTo: "Carlos Procurement"
    }
  ]);
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    assignedTo: "",
    status: "pending"
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'critical': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300';
    }
  };
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'border-yellow-500';
      case 'inProgress': return 'border-blue-500';
      case 'completed': return 'border-green-500';
      case 'delayed': return 'border-red-500';
      default: return 'border-surface-300 dark:border-surface-600';
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'inProgress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'delayed': return 'Delayed';
      default: return 'Unknown';
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!newTask.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!newTask.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!newTask.dueDate) {
      errors.dueDate = "Due date is required";
    }
    
    if (!newTask.assignedTo.trim()) {
      errors.assignedTo = "Assignment is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTaskWithId = {
        ...newTask,
        id: Date.now()
      };
      
      setTasks(prevTasks => [...prevTasks, newTaskWithId]);
      setIsLoading(false);
      setIsModalOpen(false);
      toast.success("Task created successfully!");
      
      // Reset form
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        assignedTo: "",
        status: "pending"
      });
      setFormErrors({});
    }, 1000);
  };
  
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    
    toast.info(`Task status updated to ${getStatusText(newStatus)}`);
  };
  
  const filterTasks = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Task Management</h2>
        <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
          Keep your construction project on track by managing tasks and assignments in one place.
        </p>
      </div>
      
      {/* Task Board */}
      <div className="bg-surface-50 dark:bg-surface-800 rounded-2xl shadow-soft p-4 md:p-6 lg:p-8 border border-surface-200 dark:border-surface-700">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold">Project Tasks</h3>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Task</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Column */}
          <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-4">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              Pending
              <span className="ml-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-0.5 rounded-full">
                {filterTasks('pending').length}
              </span>
            </h4>
            
            <div className="space-y-4">
              <AnimatePresence>
                {filterTasks('pending').map(task => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white dark:bg-surface-700 rounded-lg p-4 shadow-sm border-l-4 ${getStatusClass(task.status)}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{task.title}</h5>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">{task.description}</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-surface-500 dark:text-surface-400">Due: {task.dueDate}</span>
                      <select 
                        className="text-xs bg-surface-100 dark:bg-surface-600 border-0 rounded-lg px-2 py-1"
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filterTasks('pending').length === 0 && (
                <div className="text-center py-6 text-surface-500 dark:text-surface-400 text-sm">
                  No pending tasks
                </div>
              )}
            </div>
          </div>
          
          {/* In Progress Column */}
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              In Progress
              <span className="ml-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full">
                {filterTasks('inProgress').length}
              </span>
            </h4>
            
            <div className="space-y-4">
              <AnimatePresence>
                {filterTasks('inProgress').map(task => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white dark:bg-surface-700 rounded-lg p-4 shadow-sm border-l-4 ${getStatusClass(task.status)}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{task.title}</h5>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">{task.description}</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-surface-500 dark:text-surface-400">Due: {task.dueDate}</span>
                      <select 
                        className="text-xs bg-surface-100 dark:bg-surface-600 border-0 rounded-lg px-2 py-1"
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filterTasks('inProgress').length === 0 && (
                <div className="text-center py-6 text-surface-500 dark:text-surface-400 text-sm">
                  No tasks in progress
                </div>
              )}
            </div>
          </div>
          
          {/* Completed Column */}
          <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Completed
              <span className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded-full">
                {filterTasks('completed').length}
              </span>
            </h4>
            
            <div className="space-y-4">
              <AnimatePresence>
                {filterTasks('completed').map(task => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white dark:bg-surface-700 rounded-lg p-4 shadow-sm border-l-4 ${getStatusClass(task.status)}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{task.title}</h5>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">{task.description}</p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-surface-500 dark:text-surface-400">Due: {task.dueDate}</span>
                      <select 
                        className="text-xs bg-surface-100 dark:bg-surface-600 border-0 rounded-lg px-2 py-1"
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filterTasks('completed').length === 0 && (
                <div className="text-center py-6 text-surface-500 dark:text-surface-400 text-sm">
                  No completed tasks
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Add New Task</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="title" className="label">
                      Task Title
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className={`input ${formErrors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                      value={newTask.title}
                      onChange={handleInputChange}
                      placeholder="Enter task title"
                    />
                    {formErrors.title && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircleIcon className="w-4 h-4 mr-1" />
                        {formErrors.title}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="label">
                      Description
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      className={`input ${formErrors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                      value={newTask.description}
                      onChange={handleInputChange}
                      placeholder="Describe the task..."
                    ></textarea>
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircleIcon className="w-4 h-4 mr-1" />
                        {formErrors.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dueDate" className="label">
                        Due Date
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className={`input ${formErrors.dueDate ? 'border-red-500 dark:border-red-500' : ''}`}
                        value={newTask.dueDate}
                        onChange={handleInputChange}
                      />
                      {formErrors.dueDate && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircleIcon className="w-4 h-4 mr-1" />
                          {formErrors.dueDate}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="label">Priority Level</label>
                      <select
                        id="priority"
                        name="priority"
                        className="input"
                        value={newTask.priority}
                        onChange={handleInputChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="assignedTo" className="label">
                      Assigned To
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="assignedTo"
                      name="assignedTo"
                      className={`input ${formErrors.assignedTo ? 'border-red-500 dark:border-red-500' : ''}`}
                      value={newTask.assignedTo}
                      onChange={handleInputChange}
                      placeholder="Team member name"
                    />
                    {formErrors.assignedTo && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircleIcon className="w-4 h-4 mr-1" />
                        {formErrors.assignedTo}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center pt-2">
                    <InfoIcon className="w-4 h-4 text-surface-500 dark:text-surface-400 mr-2" />
                    <p className="text-xs text-surface-500 dark:text-surface-400">
                      All fields marked with an asterisk (*) are required.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-outline"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon className="w-5 h-5 animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Create Task</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Interactive Help Tip */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 md:p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 md:mb-0">
            <InfoIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-2">How to use the task board</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-3">
              This interactive task management board helps you organize and track construction tasks by status. You can add new tasks, update their status, and visualize your workflow.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-white dark:bg-surface-700 px-3 py-1.5 rounded-lg text-sm">
                <ArrowRightIcon className="w-4 h-4 mr-1.5 text-blue-500" />
                <span>Add new tasks with the "Add Task" button</span>
              </div>
              <div className="flex items-center bg-white dark:bg-surface-700 px-3 py-1.5 rounded-lg text-sm">
                <ArrowRightIcon className="w-4 h-4 mr-1.5 text-blue-500" />
                <span>Change status using the dropdown</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}