import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectsAndTasksEmployer.css'; // Import your CSS file

function ProjectsAndTasksEmployer({ userToken }) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [projectsAndTasks, setProjectsAndTasks] = useState([]);
  const [error, setError] = useState(null);

  const fetchProjectsAndTasks = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/Projects_and_Tasks_Employer`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      console.log(response.data)
      setProjectsAndTasks(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error fetching reports');
    }
  };

  useEffect(() => {
    fetchProjectsAndTasks();
  }, [userToken]);
  
  

  return (
    <div className="container">
      {error && <div className="error">Error: {error}</div>}
      <ul>
        {projectsAndTasks.map(project => (
          <li key={project.project_id} className="project">
            <div className="project-name">Project Name: {project.project_name}</div>
            <div>Project Manager: {project.project_manager}</div>
            <div>Status: {project.status ? 'Completed' : 'Pending'}</div> {/* Render based on status */}
            <ul>
              {project.tasks.map(task => (
                <li key={task.task_id} className="task">
                  <div className="task-name">Task Name: {task.task_name}</div>
                  <div>Status: {task.status ? 'Completed' : 'Pending'}</div> {/* Render based on status */}
                  <div className="task-detail">Task Contribution: {task.contribution}</div>
                  <div className="task-detail">Task Progress: {task.progress}</div>
                  <div className="task-detail">Employee Username: {task.employee_username}</div>
                  <div className="task-detail">Employee Name: {task.employee_name}</div>
                  <div className="task-detail">Employee ID: {task.employee_id}</div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsAndTasksEmployer;
