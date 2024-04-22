import React, { useState, useEffect } from 'react';

function ProjectsAndTasksComponent ({userToken3}) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [projectsAndTasks, setProjectsAndTasks] = useState([]);

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      console.log("Fetching Right now")
      try {
        const response = await fetch(`${SERVER_URL}/Get_OS_Proj_and_Tasks_Contributor`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken3}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProjectsAndTasks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error here
      }
    };

    // Fetch data initially
    fetchProjectsAndTasks();

    // Fetch data at regular intervals (e.g., every 5 minutes)
    const intervalId = setInterval(fetchProjectsAndTasks, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [userToken3]); // Dependency array includes userToken3 to refetch data when it changes

  return (
    <div>
      <h1>Projects and Tasks</h1>
      <ul>
        {projectsAndTasks.map(project => (
          <li key={project.project_id}>
            <h2>{project.project_name}</h2>
            <p>Project Manager: {project.project_manager}</p>
            <p>Status: {project.status ? 'Complete' : 'Incomplete'}</p>
            <ul>
              {project.tasks.map(task => (
                <li key={task.task_id}>
                  <p>Task: {task.task_name}</p>
                  <p>Status: {task.status ? 'Complete' : 'Incomplete'}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsAndTasksComponent;
