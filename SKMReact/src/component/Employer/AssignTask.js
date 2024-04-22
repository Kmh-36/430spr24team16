import React, { useState } from 'react';
import axios from 'axios';
import './AssignTask.css';
function AssignTask({userToken}) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [employeeId, setEmployeeId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [contribution, setContribution] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAssignTask = async (event) => {
    event.preventDefault();

    if (!employeeId || !taskId || !contribution) {
      setError('All fields are required');
      return;
    }

    const taskAssignmentData = {
      employee_id: employeeId,
      task_id: taskId,
      contribution: contribution,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/assign_task`, taskAssignmentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setMessage(response.data.Message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data : 'Error assigning task');
    }
  };

  return (
    <div className="assign-task-container">
      <h2>Assign Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleAssignTask}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <div>
          <label>Task ID:</label>
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </div>
        <div>
          <label>Contribution:</label>
          <input
            type="number"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
          />
        </div>
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
}

export default AssignTask;
