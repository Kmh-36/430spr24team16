import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OSProjectsAndTasksEmployer.css';

function OSProjectsAndTasksEmployer({ userToken }) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [projectsAndTasks, setProjectsAndTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/Get_OS_Proj_and_Tasks_Employer`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
        setProjectsAndTasks(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : 'Error fetching projects and tasks');
      }
    };

    fetchProjectsAndTasks();
  }, [userToken]);

  return (
    <div className="container">
      <h2>OS Projects and Tasks</h2>
      {error && <p className="error">{error}</p>}
      {projectsAndTasks.map(project => (
        <div className="project" key={project.project_id}>
          <h3 className="project-name">{project.project_name}</h3>
          <p>Project Manager: {project.project_manager}</p>
          <p>Status: {project.status ? 'Done' : 'Pending'}</p>
          <ul>
            {project.tasks.map(task => (
              <li className="task" key={task.task_id}>
                <span className="task-name">{task.task_name} (ID: {task.task_id})</span> - <span className="task-detail"> {task.status ? `Done by ${task.contributor}` : 'Pending'}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OSProjectsAndTasksEmployer;
