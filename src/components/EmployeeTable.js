// En EmployeeTable.js
import React, { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeTable = ({ onEdit, onDelete }) => {
  const { employees } = useContext(EmployeeContext);

  return (
    <div className="table-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
              <td className="action-buttons">
                <button onClick={() => onEdit(employee)}>Edit</button>
                <button onClick={() => onDelete(employee.employeeId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

