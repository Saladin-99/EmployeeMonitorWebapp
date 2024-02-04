// Table.jsx

import React from 'react';

const Table = ({ employeeData }) => {
  console.log('Received employeeData in Table:', employeeData);

  return (
    <table className="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          {/* Add more table headers based on your employeeData structure */}
        </tr>
      </thead>
      <tbody>
        {employeeData.map((employee, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.isOn}</td>
            {/* Add more table cells based on your employeeData structure */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
