const getDepartments = "SELECT * FROM department";
const getDepartmentById = "SELECT * FROM department WHERE d_id = $1";
const createDepartment =
  "INSERT into department (d_name, emp_count) values ($1, $2) RETURNING d_name, emp_count, d_id;";
const getDepartmentByName =
  "SELECT * FROM department WHERE LOWER(d_name) = LOWER($1)";

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  getDepartmentByName,
};
