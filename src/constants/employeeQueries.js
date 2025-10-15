const employeeQueries = {
  INSERT_EMPLOYEE: `
    INSERT INTO employee_info (name, email, phone)
    VALUES (?, ?, ?)
  `,
  GET_EMPLOYEES: `
    SELECT employee_id, name, email, phone
    FROM employee_info
  `
};

module.exports = employeeQueries;
