const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected")
    initialQuestions();
});


const initialQuestions = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Remove employee", "Update employee role", "Update employee manager", "View all roles"],
            name: "initialSelection"
        }
    ]).then(function (answer) {
        console.log(answer.initialSelection);
        if (answer.initialSelection === "View all employees") {
            allEmployees();
        } else if (answer.initialSelection === "View all employees by department") {
            allByDepartment();
        } else if (answer.initialSelection === "View all employees by manager") {
            allByManager();
        } else if (answer.initialSelection === "Add employee") {
            addEmployee();
        } else if (answer.initialSelection === "Remove employee") {
            removeEmployee();
        } else if (answer.initialSelection === "Update employee role") {
            updateRole();
        } else if (answer.initialSelection === "Update employee manager") {
            updateManager();
        } else {
            allRoles();
        };
    });
};

function allEmployees() {
    connection.query("SELECT * FROM employee", function(res, err){
        if(err) throw err;
    })
}

function allByDepartment() {

}

function allByManager() {

}

function addEmployee() {

}

function removeEmployee() {

}

function updateRole() {

}

function updateManager() {

}




