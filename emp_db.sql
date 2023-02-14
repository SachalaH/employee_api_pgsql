-- Create table queries for employee and department
CREATE TABLE department(d_id serial primary key,
					   d_name varchar(255) NOT NULL,
					   emp_count int
					   );

CREATE TABLE employee(e_id serial primary key,
					 e_name varchar(255) NOT NULL,
					 date_of_birth date NOT NULL,
					 email varchar(255) NOT NULL,
					 date_of_join date NOT NULL,
					 gender varchar(10) NOT NULL,
					 e_dept int NOT NULL,
					  
					 constraint dept_id foreign key(e_dept) references department(d_id)
					 );
					 



-- Department insert queries setting initial count 
INSERT into department (d_name, emp_count) values ('IT', 0);
INSERT into department (d_name, emp_count) values ('Marketing', 0);
INSERT into department (d_name, emp_count) values ('Finance', 0);
INSERT into department (d_name, emp_count) values ('Sales', 0);

-- Employee insert queries
INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept)
values ('John Doe', '1998-09-22', 'johndoe@mail.com', '2018-01-14', 'male', 1);

INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept)
values ('Jane Doe', '1990-03-14', 'janedoe@mail.com', '2018-10-31', 'female', 2);

INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept)
values ('Ansh Patel', '2000-06-26', 'anshpatel@mail.com', '2019-02-18', 'male', 3);

INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept)
values ('Jigna Shah', '1995-04-01', 'shahjigna@mail.com', '2019-01-03', 'female', 4);

INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept)
values ('Rahul Patil', '1997-12-07', 'patilrahul@mail.com', '2019-05-10', 'male', 1);

INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept)
values ('Param Jain', '1993-05-28', 'paramjain@mail.com', '2020-06-21', 'male', 4);

INSERT into employee(e_name, date_of_birth, email, date_of_join, gender, e_dept)
values ('Riya Jani', '2000-10-21', 'janiriya@mail.com', '2020-05-14', 'female', 3);


-- Select queries to check
SELECT * from department
SELECT * from employee 

-- Function to execute the trigger
CREATE or replace FUNCTION inc_count() RETURNS trigger AS $department_emp_count$
BEGIN
	UPDATE department 
	SET emp_count = emp_count + 1
	WHERE d_id = NEW.e_dept;
	RETURN NEW;
END;
$department_emp_count$ LANGUAGE plpgsql;


-- Creating a trigger to increase count of employees in a department
CREATE TRIGGER department_emp_count AFTER INSERT ON employee
FOR EACH ROW execute Procedure inc_count();


-- Function to return employees in a department based on time they have joined in JSON format
CREATE OR REPLACE FUNCTION emp_details(from_date date, to_date date, d_id int)
RETURNS json AS $$
BEGIN
	RETURN(SELECT array_to_json(array_agg(row_to_json(emp))) 
	FROM (SELECT * from employee WHERE e_dept = d_id AND date_of_join >= from_date AND date_of_join <= to_date) emp);

END;
$$ LANGUAGE plpgsql;

-- Testing the function
SELECT emp_details('2020-01-01', '2023-02-14', 2);


-- JOIN Query to get employee details
SELECT e_id, e_name , date_of_birth, date_of_join, email, gender, d_name
FROM employee A 
INNER JOIN department B
ON A.e_dept = B.d_id
-- optional where clause
-- WHERE A.e_id = 6;

