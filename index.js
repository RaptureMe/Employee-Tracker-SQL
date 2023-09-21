const inquirer = require("inquirer");
const queries = require('./db/queries');

const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to choose?',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
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
            default:
                break;
        }
    }
    )
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
    ])
}

menu()