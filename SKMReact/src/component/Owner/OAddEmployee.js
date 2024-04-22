import React, { useState } from 'react';

function OAddEmployee({ usertoken2 }) {
  const SERVER_URL = "http://127.0.0.1:5000";
  console.log(usertoken2)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    isEmployer: '0' 
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
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
  
    try {
      const isEmployer = formData.isEmployer === '1'; // Convert '1' to true, otherwise false
  
      const response = await fetch(`${SERVER_URL}/OwnerAddEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usertoken2}`
        },
        body: JSON.stringify({
          name: formData.name,
          user_name: formData.username,
          password: formData.password,
          is_employer: isEmployer // Send as true or false directly
        })
      });
  
      if (response.ok) {
        console.log("Employee added successfully!");
        setFormData({ name: '', username: '', password: '', confirmPassword: '', isEmployer: '0' });
      } else {
        console.error('Failed to add employee:', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <h2>Add Employer or Employee</h2>
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
        <label>
          Role:
          <select name="isEmployer" value={formData.isEmployer} onChange={handleChange}>
            <option value="0">Employee</option>
            <option value="1">Employer</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OAddEmployee;
