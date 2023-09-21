const connection = require('../connection')

class DataBase {
    constructor(connection) {
        this.connection = connection
    }

    getAllDepartments(){
        return this.connection.promise().query("SELECT * FROM department")
    }

    getAllRoles(){
        return this.connection.promise().query("SELECT * FROM role")
    }

    getAllEmployees(){
        return this.connection.promise().query("SELECT * FROM employee")
    }

    addDepartment(userDepartment){
        return this.connection.promise().query("INSERT INTO department SET ?", userDepartment)
    }

    addRole(userRole){
        return this.connection.promise().query("INSERT INTO role SET ?", userRole)
    }

    addEmployee(userEmployee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", userEmployee)
    }
}


module.exports = new DataBase(connection)