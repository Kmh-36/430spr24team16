import React, { useState } from 'react';
import axios from 'axios';

function UpdateProgress({userToken}) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [taskId, setTaskId] = useState('');
  const [progress, setProgress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProgress = async (event) => {
    event.preventDefault();

    if (!taskId || !progress) {
      setError('All fields are required');
      return;
    }

    const progressValue = parseInt(progress);

    if (isNaN(progressValue) || progressValue < 0 || progressValue > 100) {
      setError('Progress must be an integer between 0 and 100');
      return;
    }

    const progressData = {
      task_id: taskId,
      progress: progressValue,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/update_progress`, progressData, {
        headers: {
          'Content-Type': 'application/json',
          // Assuming you handle authentication elsewhere and have access to the token
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error updating progress');
    }
  };

  return (
    <div>
      <h2>Update Progress</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleUpdateProgress}>
        <div>
          <label>Task ID:</label>
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </div>
        <div>
          <label>Progress (%):</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <button type="submit">Update Progress</button>
      </form>
    </div>
  );
}

export default UpdateProgress;
