import React from 'react';
import './Employer.css'; 
import AddProject from './AddProject'; 
import AddTask from './AddTask'; 
import AssignTask from './AssignTask'; 
import EAddEmployee from './EAddEmployee'; 
import Reports from './Reports';
import ProjectsAndTasksEmployer from './ProjectsAndTasksEmployer' 
import axios from 'axios';
import EmployeeList from './EmployeeList';
import AddOSProject from './OS/AddOSProject';
import AddOSTask from './OS/AddOSTask'; 
import MarkOSTask from './OS/MarkOSTask';
import OSProjectsAndTasksEmployer from './OS/OSProjectsAndTasksEmployer';

function Employer({ userToken, logout }) {
  console.log(userToken)
  return (
    <div className="employer-container">
      <header className="header">
        <div className="navbar">
          <h1>Employer Portal</h1>
          <button onClick={logout}>Logout</button>
        </div>
        <p>Welcome Employer!</p>
      </header>

      <main className="main-content">
      <div className="wrapper">
          <EmployeeList userToken={userToken} />
        </div>
        <div className="wrapper">
          <ProjectsAndTasksEmployer userToken={userToken} />
        </div>
        <div className="wrapper">
          <AddProject userToken={userToken} />
        </div>
        <div className="wrapper">
           <AddTask userToken={userToken} />
        </div>
        <div className="wrapper">
          <EAddEmployee userToken={userToken} />
        </div>
        <div className="wrapper">
          <AssignTask userToken={userToken} />
        </div>
        <div className="wrapper">
          <Reports userToken={userToken} />
        </div>
        <hr className='seperator'></hr>
        <h2>Contributer</h2>
        <div className="wrapper">
           <AddOSProject userToken={userToken} />
        </div>
        <div className="wrapper">
          <AddOSTask userToken={userToken} />
        </div>
        <div className="wrapper">
          <MarkOSTask userToken={userToken} />
        </div>
        <div className="wrapper">
          <OSProjectsAndTasksEmployer userToken={userToken} />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 SKM. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Employer;
