import React, { useState, useEffect, useContext, useCallback } from 'react';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import { EmployeeContext, EmployeeProvider } from './context/EmployeeContext';
import axios from 'axios';
import './index.css';


const protocol = process.env.REACT_APP_PROTOCOL || 'http';
const domain = process.env.REACT_APP_DOMAIN || 'localhost';
const port = process.env.REACT_APP_PORT || '3000';
const baseURL = `${protocol}://${domain}:${port}/dev`;

const App = () => {
  const { setEmployees } = useContext(EmployeeContext); 
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }, [setEmployees]);

  useEffect(() => {
    fetchEmployees(); 
  }, [fetchEmployees]);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`${baseURL}/employees/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSave = () => {
    fetchEmployees();
    setEditingEmployee(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setShowForm(false);
  };

  return (
    <div>
      <h1>Human Resources Administration</h1>
      {showForm ? (
        <EmployeeForm employee={editingEmployee} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <button className="create-button" onClick={() => setShowForm(true)}>Create</button>
          <EmployeeTable onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

const WrappedApp = () => (
  <EmployeeProvider>
    <App />
  </EmployeeProvider>
);

export default WrappedApp;
