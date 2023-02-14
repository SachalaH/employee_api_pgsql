const pool = require("../../db");
const {
  getDepartments,
  getDepartmentById,
  getDepartmentByName,
  createDepartment,
} = require("./queries");

// Function to fetch all the departments
const getAllDepartments = (req, res) => {
  pool.query(getDepartments, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

// Function to fetch a particular department
const getOneDepartment = (req, res) => {
  const id = req.params.id;
  pool.query(getDepartmentById, [id], (err, results) => {
    if (err) throw err;
    if (results.rows.length > 0) {
      res.status(200).json(results.rows);
    } else {
      res.status(404).send("Department NOT FOUND.");
    }
  });
};

// Function to add a department
const addDepartment = (req, res) => {
  const { d_name, emp_count } = req.body;
  pool.query(getDepartmentByName, [d_name], (err, results) => {
    if (err) throw err;
    if (results.rows.length > 0) {
      res.status(409).send("Department already exists.");
    } else {
      pool.query(createDepartment, [d_name, emp_count], (err, results) => {
        if (err) throw err;
        res.status(200).send(results.rows);
      });
    }
  });
};

module.exports = {
  getAllDepartments,
  getOneDepartment,
  addDepartment,
};
