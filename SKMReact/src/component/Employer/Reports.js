import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reports.css';  // Import the CSS file

function Reports({ userToken }) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [employeeTasksReport, setEmployeeTasksReport] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/Reports`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
        setEmployeeTasksReport(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Error fetching reports');
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="employee-table-container">
      <h2>Reports</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {Object.keys(employeeTasksReport).map((employeeName) => {
        const tasks = employeeTasksReport[employeeName];
        const firstTask = tasks[0] || {};
        return (
          <div key={employeeName}>
            <h3>{employeeName} - (Username: {firstTask.employee_user_name}, ID: {firstTask.employee_id})</h3>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Task Status</th>
                  <th>Project Name</th>
                  <th>Project Manager</th>
                  <th>Project Status</th>
                  <th>Due Date</th>
                  <th>Contribution</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.task_id}>
                    <td>{task.task_name}</td>
                    <td>{task.task_status ? 'Done' : 'Pending'}</td>
                    <td>{task.project_name}</td>
                    <td>{task.project_manager}</td>
                    <td>{task.project_status ? 'Done' : 'Pending'}</td>
                    <td>{task.due_date}</td>
                    <td>{task.contribution}</td>
                    <td>{task.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default Reports;
