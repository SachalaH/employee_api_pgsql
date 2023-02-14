const express = require("express");
const {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  getEmployeesWithinDate,
} = require("./controllers");
const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getOneEmployee);
router.post("/", addEmployee);
router.get("/:from_date/:to_date/:dept_id", getEmployeesWithinDate);

module.exports = router;
