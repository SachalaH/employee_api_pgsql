// Dotenv module to store app secrets and URIs
require("dotenv").config();
// Initializing the express app
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000 || process.env.PORT;
// Routers
const employeeRouter = require("./src/employees/router");
const departmentRouter = require("./src/departments/router");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initial routes
app.get("/", (req, res) => {
  res.send("The Employees API.");
});

// Essential Routes
app.use("/api/employees", employeeRouter);
app.use("/api/departments", departmentRouter);
// Listening for the requests
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
