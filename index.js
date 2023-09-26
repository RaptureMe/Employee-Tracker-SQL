const inquirer = require("inquirer");
const queries = require('./db/queries');
const logo = require('asciiart-logo');

init();

function init() {
    const menuLogo = logo({ name: "Employee Manager" }).render();

    console.log(menuLogo);
}

const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to choose?',
            choices: ["view all employees","view all departments", "view all roles", "add a department", "add a role", "add an employee", "update an employee role"],
            name: 'menu'
        }
    ]).then((response) => {
        switch (response.menu) {
            case "view all departments":
                departments()
                break;
            case "view all roles":
                roles()
                break;
            case "view all employees":
                employees()
                break;
            case "add a department":
                userDepartment()
                break;
            case "add a role":
                userRole()
                break;
            case "add an employee":
                userEmployee()
                break;
            case "update an employee role":
                updateEmployee()
                break;
            default:
                break;
        }
    })
};

function departments() {
    queries.getAllDepartments().then(([departments]) => {
        console.table(departments)
    }).then(() => {
        menu()
    })
}

function roles() {
    queries.getAllRoles().then(([roles]) => {
        console.table(roles)
    }).then(() => {
        menu()
    })
}

function employees() {
    queries.getAllEmployees().then(([employees]) => {
        console.table(employees)
    }).then(() => {
        menu()
    })
}

function userDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'name'
        }
    ]).then((name) => {
        queries.addDepartment(name).then(() => {
            console.log(name + "department has been added!")
        }).then(() => {
            menu()
        })
    })
}

function userRole() {
    queries.getAllDepartments().then(([departments]) => {
        const departmentChoices = departments.map((department) => {
            return { value: department.id, name: department.name }
        })
        // console.log(departmentChoices)
        inquirer.prompt([
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is this roles salary?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Here are the departments to choose from:',
                name: 'department_id',
                choices: departmentChoices

            }
        ]).then((role) => {
            queries.addRole(role).then(() => {
                console.log(role.title + "Role has been added!")
            }).then(() => {
                menu()
            })
        })
    })
}

function userEmployee() {
    queries.getAllRoles().then(([roles]) => {
        const roleChoices = roles.map((role) => {
            return { value: role.id, name: role.title }
        })
        queries.getAllEmployees().then(([employees]) => {
            const managerChoices = employees.map((employee) => {
                return { value: employee.id, name: employee.first_name + " " + employee.last_name }
            })
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is employees first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'What is employees last name?',
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: 'What role is the employee:',
                    name: 'role_id',
                    choices: roleChoices

                },
                {
                    type: 'list',
                    message: 'Who is this employees manager:',
                    name: 'manager_id',
                    choices: [...managerChoices, { value: null, name: "No Manager" }]
                }
            ]).then((employee) => {
                queries.addEmployee(employee).then(() => {
                    console.log(employee.first_name + " " + employee.last_name + " " + "Employee has been added!")
                }).then(() => {
                    menu()
                })
            })
        })
    })
}

function updateEmployee() {
    queries.getAllRoles().then(([roles]) => {
        const roleChoices = roles.map((role) => {
            return { value: role.id, name: role.title }
        })
        queries.getAllEmployees().then(([employees]) => {
            const employeeChoices = employees.map((employee) => {
                return { value: employee.id, name: employee.first_name + " " + employee.last_name }
            })

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'What employee would you like to change:',
                    name: 'employee_id',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    message: 'What is the employees new role:',
                    name: 'role_id',
                    choices: roleChoices
                }
            ]).then((res) => {
                queries.updateEmployee(res.role_id, res.employee_id).then(() => {
                    console.log("Employee has been changed!")
                }).then(() => {
                    menu()
                })
            })
        })
    })
}

menu ();