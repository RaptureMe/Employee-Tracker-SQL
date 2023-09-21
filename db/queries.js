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

    updateEmployee(roleId, employeeId) {
        return this.connection.promise().query("UPDATE employee SET role_id =? WHERE id=?", [roleId, employeeId])
    }
}


module.exports = new DataBase(connection)