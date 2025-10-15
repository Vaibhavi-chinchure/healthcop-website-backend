const employeeService = require("../services/employeeService");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const newEmployee = await employeeService.addEmployee({ name, email, phone });
    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
