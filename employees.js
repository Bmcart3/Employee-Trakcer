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
        selectionChecker(answer);
    });
};

async function selectionChecker(data) {
    // let newType;
    // let question;
    // let newChoices;
    // let newName;
    if (data.initialSelection == "View all employees") {
        allEmployees();
    } else if (data.initialSelection == "View all employees by department") {
        allByDepartment();
    } else if (data.initialSelection == "View all employees by manager") {
        allByManager();
    } else if (data.initialSelection == "Add employee") {
        addEmployee();
    } else if (data.initialSelection == "Remove employee") {
        removeEmployee();
    } else if (data.initialSelection == "Update employee role") {
        updateRole();
    } else if (data.initialSelection == "Update employee manager") {
        updateManager();
    } else {
        allRoles();
    };
    // const response = await inquirer.prompt([
    //     {
    //         type: newType,
    //         message: question,
    //         choices: newChoices,
    //         name: newName
    //     }
    // ]);
};

// function allEmployees() {

// }

// function allByDepartment() {

// }

// function allByManager() {

// }

// function addEmployee() {

// }

// function removeEmployee() {

// }

// function updateRole() {

// }

// function updateManager() {

// }




