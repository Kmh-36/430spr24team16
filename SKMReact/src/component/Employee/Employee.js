import React from 'react';
import './Employee.css'; 
import ProjectsAndTasksEmployee from './ProjectsAndTasksEmployee';

function Employee({ userToken, logout }) {
  console.log(userToken)
  return (
    <div className="employer-container">
      <header className="header">
        <div className="navbar">
          <h1>Employee Portal</h1>
          <button onClick={logout}>Logout</button>
        </div>
        <p>Welcome Employee!</p>
      </header>

      <main className="main-content">
        <div className="wrapper">
          <ProjectsAndTasksEmployee userToken={userToken} />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 SKM. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Employee;
