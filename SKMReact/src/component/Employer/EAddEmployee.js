import React, { useState } from 'react';
import './EAddEmployee.css';
function EAddEmployee({ userToken }) {
  const SERVER_URL = "http://127.0.0.1:5000";
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '', // New password field
    confirmPassword: '' // New confirm password field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const response = await fetch(`${SERVER_URL}/EmployerAddEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        name: formData.name,
        user_name: formData.username,
        password: formData.password // Include password in request payload
      })
    });

    if (response.ok) {
      console.log("Employee added successfully!");
      setFormData({ name: '', username: '', password: '', confirmPassword: '' });
    } else {
      console.error('Failed to add employee:', await response.json());
    }
  };

  return (
    <div className="e-add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EAddEmployee;
