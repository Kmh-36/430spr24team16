import React, { useState } from 'react';
import axios from 'axios';
import './AddProject.css';

function AddProject({userToken}) {
  console.log(userToken)
  const SERVER_URL = "http://127.0.0.1:5000";
  const [projectName, setProjectName] = useState('');
  const [projectManagerUsername, setProjectManagerUsername] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddProject = async (event) => {
    event.preventDefault();

    if (!projectName || !projectManagerUsername || !dueDate) {
      setError('All fields are required');
      return;
    }

    const projectData = {
      project_name: projectName,
      project_manager_username: projectManagerUsername,
      due_date: dueDate,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/add_Project`, projectData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setMessage(response.data.Message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data : 'Error adding project');
    }
  };

  return (
    <div className="add-project-container">
      <h2>Add Project</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleAddProject}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <label>Project Manager Username:</label>
          <input
            type="text"
            value={projectManagerUsername}
            onChange={(e) => setProjectManagerUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
