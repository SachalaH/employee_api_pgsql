const getEmployees =
  "SELECT e_id, e_name , date_of_birth, date_of_join, email, gender, d_name, d_id FROM employee A INNER JOIN department B ON A.e_dept = B.d_id";
const getEmployeeById =
  "SELECT e_id, e_name , date_of_birth, date_of_join, email, gender, d_name, d_id FROM employee A  INNER JOIN department B ON A.e_dept = B.d_id WHERE A.e_id = $1";

const createEmployee =
  "INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept) values ($1,$2,$3,$4,$5,$6) RETURNING e_name, date_of_birth, email, date_of_join, gender, e_dept;";

const getEmployeeByEmail =
  "SELECT * FROM employee WHERE LOWER(email)=LOWER($1)";

const getEmployeesByDate = "SELECT emp_details($1, $2, $3);";

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  getEmployeeByEmail,
  getEmployeesByDate,
};
