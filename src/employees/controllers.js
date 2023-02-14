const pool = require("../../db");
const { getDepartmentById } = require("../departments/queries");
const {
  getEmployees,
  getEmployeeById,
  getEmployeeByEmail,
  createEmployee,
  getEmployeesByDate,
} = require("./queries");

const getAllEmployees = (req, res) => {
  pool.query(getEmployees, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getOneEmployee = (req, res) => {
  const id = req.params.id;
  pool.query(getEmployeeById, [id], (err, results) => {
    if (err) throw err;
    if (results.rows.length > 0) {
      res.status(200).json(results.rows);
    } else {
      res.status(404).send("Employee NOT FOUND.");
    }
  });
};

const addEmployee = (req, res) => {
  const { name, dob, email, join, gender, dept } = req.body;

  pool.query(getEmployeeByEmail, [email], (err, results) => {
    if (err) throw err;
    if (results.rows.length > 0) {
      res.status(409).send("Email already exists.");
    } else {
      pool.query(getDepartmentById, [dept], (err, results) => {
        if (results.rows.length > 0) {
          pool.query(
            createEmployee,
            [name, dob, email, join, gender, dept],
            (err, results) => {
              if (err) throw err;
              res.status(200).send(results.rows);
            }
          );
        } else {
          res.status(404).send("Invalid Department.");
        }
      });
    }
  });
};

const getEmployeesWithinDate = (req, res) => {
  const { from_date, to_date, dept_id } = req.params;
  pool.query(
    getEmployeesByDate,
    [from_date, to_date, dept_id],
    (err, results) => {
      if (err) throw err;
      res.status(200).send(results.rows);
    }
  );
};

module.exports = {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  getEmployeesWithinDate,
};
