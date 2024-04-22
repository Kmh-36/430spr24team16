import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectsAndTasksEmployee.css';

function ProjectsAndTasksEmployee({ userToken }) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [projectsAndTasks, setProjectsAndTasks] = useState([]);
  const [updatedProgress, setUpdatedProgress] = useState({ taskId: null, progress: null });

  const fetchProjectsAndTasks = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/Projects_and_Tasks_Employee`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setProjectsAndTasks(response.data);
    } catch (error) {
      console.error('Error fetching projects and tasks:', error);
    }
  };

  const handleUpdateProgress = async () => {
    try {
      await axios.post(`${SERVER_URL}/update_progress`, { task_id: updatedProgress.taskId, progress: updatedProgress.progress }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      // Refresh projects and tasks after progress update
      fetchProjectsAndTasks();
      // Reset updatedProgress state
      setUpdatedProgress({ taskId: null, progress: null });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    fetchProjectsAndTasks();
  }, []);

  const handleInputChange = (taskId, progress) => {
    setUpdatedProgress({ taskId, progress });
  };

  return (
    <div className="container">
      <h1>Projects and Tasks</h1>
      <button className="confirm-button" onClick={fetchProjectsAndTasks}>Refresh Projects and Tasks</button>
      {projectsAndTasks.map((project) => (
        <div className={`project ${project.status ? 'completed' : ''}`} key={project.project_id}>
          <h2>Project Name: {project.project_name}</h2>
          <p>Manager: {project.project_manager}</p>
          <p>Due Date: {project.due_date}</p>
          <p>Status: {project.status ? 'Completed' : 'Incomplete'}</p>
          <ul>
            {project.tasks.map((task) => (
              <li className={`task ${task.status ? 'completed' : ''}`} key={task.task_id}>
                <strong>Task Name: {task.task_name}</strong>
                <p>Status: {task.status ? 'Completed' : 'Incomplete'}</p>
                <p>Progress: {task.progress}%</p>
                <input
                  className="progress-input-slider"
                  type="number"
                  min="0"
                  max="100"
                  value={updatedProgress.taskId === task.task_id ? updatedProgress.progress : task.progress}
                  onChange={(e) => handleInputChange(task.task_id, parseInt(e.target.value))}
                />
                <button className="confirm-button" onClick={handleUpdateProgress} disabled={updatedProgress.taskId !== task.task_id}>
                  Confirm
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectsAndTasksEmployee;
