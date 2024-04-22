import React from 'react';
import './Owner.css';
import OAddEmployee from './OAddEmployee'; 

function Owner({ userToken2, logout }) {
  console.log(userToken2)
  return (
    <div className="owner-container">
      <header className="header">
        <div className="navbar">
          <h1>Owner Portal</h1>
          {/* Logout button */}
          <button onClick={logout}>Logout</button>
        </div>
        <p>Add Employees to Your Company</p>
      </header>
      <main className="main-content">
        <div className="wrapper">
          <OAddEmployee 
            usertoken2={userToken2}
          />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 SKM. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Owner;
