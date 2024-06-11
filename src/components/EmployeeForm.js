import React, { useState, useEffect } from 'react';
import axios from 'axios';

const protocol = process.env.REACT_APP_PROTOCOL || 'http';
const domain = process.env.REACT_APP_DOMAIN || 'localhost';
const port = process.env.REACT_APP_PORT || '3000';
const baseURL = `${protocol}://${domain}:${port}/dev`;

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    employeeId: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        position: employee.position,
        employeeId: employee.employeeId
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = employee
      ? axios.put(`${baseURL}/employees/${employee.employeeId}`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          position: formData.position
        })
      : axios.post(`${baseURL}/employees`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          employeeId: parseInt(formData.employeeId, 10),
          position: formData.position,
        });

    apiCall
      .then(response => {
        onSave(); 
      })
      .catch(error => console.error('Error saving employee:', error));
  };

  const subtitle = employee ? "Edit Employee" : "New Employee";

  return (
    <div className="form-container">
      <h2 className="subtitle">{subtitle}</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="card">
          {!employee && (
            <>
              <div className="form-row">
                <label className="form-label">Employee ID:</label>
                <input className="form-input" type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} maxLength={5} required />
              </div>
              <hr className="hr-divider" />
            </>
          )}

          <div className="form-row">
            <label className="form-label">First Name:</label>
            <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} maxLength={20} required />
            <label className="form-label">Last Name:</label>
            <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} maxLength={20} required />
            <label className="form-label">Position:</label>
            <input className="form-input" type="text" name="position" value={formData.position} onChange={handleChange} maxLength={15} required />
          </div>

          <hr className="hr-divider" />

          <div className="form-buttons">
            <button className="form-button primary" type="submit">Save</button>
            <button className="form-button secondary" type="button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
