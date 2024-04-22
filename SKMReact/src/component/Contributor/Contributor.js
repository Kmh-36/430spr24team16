import React from 'react';
import './Contributor.css'; 
import ProjectsAndTasksComponent from './ProjectsAndTasksComponent ';

function Contributor({ userToken3, logout }) {
  console.log(userToken3)
  return (
    <div className="employer-container">
      <header className="header">
        <div className="navbar">
          <h1>Contributor Portal</h1>
          <button onClick={logout}>Logout</button>
        </div>
        <p>Welcome Contributor!</p>
      </header>

      <main className="main-content">
        <div className="wrapper">
          <ProjectsAndTasksComponent userToken3={userToken3} />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 SKM. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contributor;
