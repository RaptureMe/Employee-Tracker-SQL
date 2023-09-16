INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('HR'), ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 80000, 1), ('Software Engineer', 90000, 2), ('HR Manager', 70000, 3), ('Marketing Specialist', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Emily', 'Johnson', 3, 1), ('Michael', 'Brown', 4, 2),('Lisa', 'Williams', 2, 1), ('James', 'Jones', 2, 1), ('Linda', 'Johnson', 3, 2), ('Robert', 'Brown', 3, 2), 
('Patricia', 'Davis', 4, 3), ('Michael', 'Miller', 4, 3), ('Sarah', 'Wilson', 1, 4), ('David', 'Moore', 1, 4);

