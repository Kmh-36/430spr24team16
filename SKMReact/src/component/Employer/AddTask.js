import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css';

function AddTask({userToken}) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [taskName, setTaskName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!taskName || !projectName) {
      setError('All fields are required');
      return;
    }

    const taskData = {
      task_name: taskName,
      project_name: projectName,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/add_task`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data : 'Error adding task');
    }
  };

  return (
    <div className="add-task-container">
      <h2>Add Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleAddTask}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
