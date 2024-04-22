import React, { useState, useEffect } from 'react';
import './EmployeeList.css';

function EmployeeList({ userToken }) {
    const [employees, setEmployees] = useState([]);
    const SERVER_URL = "http://127.0.0.1:5000";

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/Get_Employees`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${userToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error.message);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    return (
        <div className="employee-table-container">
            <h2>Employee List</h2>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.employee_id}>
                            <td>{employee.employee_username}</td>
                            <td>{employee.employee_name}</td>
                            <td>{employee.employee_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
