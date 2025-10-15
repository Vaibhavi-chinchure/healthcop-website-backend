const pool = require("../config/db");
const queries = require("../constants/employeeQueries");

exports.addEmployee = async ({ name, email, phone }) => {
  const [result] = await pool.query(queries.INSERT_EMPLOYEE, [name, email, phone]);
  return { employee_id: result.insertId, name, email, phone };
};

exports.getEmployees = async () => {
  const [rows] = await pool.query(queries.GET_EMPLOYEES);
  return rows;
};
