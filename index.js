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

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected")
    initialQuestions();
});


const initialQuestions = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Update employee role", "View all employees by role"],
            name: "initialSelection"
        }
    ]).then(function (answer) {
        if (answer.initialSelection === "View all employees") {
            allEmployees();
        } else if (answer.initialSelection === "View all employees by department") {
            allByDepartment();
        } else if (answer.initialSelection === "View all employees by manager") {
            allByManager();
        } else if (answer.initialSelection === "Add employee") {
            addEmployee();
        } else if (answer.initialSelection === "Update employee role") {
            updateRole();
        } else if (answer.initialSelection === "Update employee manager") {
            updateManager();
        } else {
            allRoles();
        };
    });
};

function runQuery(query) {
    connection.query(query, function (err, res) {
        if (err) throw err;
        return res;
    })
};

const baseQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id";

function allEmployees() {
    runQuery(baseQuery);
};

function allByDepartment() {
    const query = baseQuery + " ORDER BY department";
    runQuery(query);
};

function allByManager() {
    const query = baseQuery + " ORDER BY employee.manager_id";
    runQuery(query);
};

function allRoles() {
    const query = baseQuery + " ORDER BY role.title"
    runQuery(query);
};

function addEmployee() {
    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: "newFName"
        },
        {
            message: "What is the new employee's last name?",
            name: "newLName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Salesperson",
                "Sales lead", 
                "Lead engineer", 
                "Software Engineer", 
                "Accountant", 
                "Legal Lead", 
                "Lawyer"
            ],
            name: "newRole"
        }
    ])
    .then(function(answers){
        let roles_id = selectRole(answers.newRole);
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answers.newFName,
            last_name: answers.newLName,
            role_id: roles_id,
            manager_id: null
        })
    });
    
}

function selectRole(name) {
    const query = "SELECT id FROM role WHERE title = '" + name + "'";
    console.log(runQuery(query));
    return parseInt(runQuery(query).id);
    
}


function updateRole() {

}






