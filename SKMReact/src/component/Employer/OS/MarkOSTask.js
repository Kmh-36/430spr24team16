import React, { useState } from 'react';
import axios from 'axios';
import './MarkOSTask.css';

function MarkOSTask({ userToken }) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [contributorUserName, setContributorUserName] = useState('');
  const [taskId, setTaskId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleMarkTask = async (event) => {
    event.preventDefault();

    if (!contributorUserName || !taskId) {
      setError('All fields are required');
      return;
    }

    const taskData = {
      contributor_user_name: contributorUserName,
      task_id: taskId,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/Mark_OS_Task`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setMessage(response.data.message);
      setError('');
      setContributorUserName('');
      setTaskId('');
    } catch (error) {
      setError(error.response ? error.response.data : 'Error marking task');
    }
  };

  return (
    <div className="mark-os-task-container">
      <h2>Mark OS Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleMarkTask}>
        <div>
          <label>Contributor Username:</label>
          <input
            type="text"
            value={contributorUserName}
            onChange={(e) => setContributorUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Task ID:</label>
          <input
            type="number"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </div>
        <button type="submit">Mark Task</button>
      </form>
    </div>
  );
}

export default MarkOSTask;
