const express = require("express");
const {
  getAllDepartments,
  getOneDepartment,
  addDepartment,
} = require("./controllers");

const router = express.Router();

router.get("/", getAllDepartments);
router.get("/:id", getOneDepartment);
router.post("/", addDepartment);

module.exports = router;
