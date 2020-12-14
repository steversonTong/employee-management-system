var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
});

connection.connect(function(err) {
    if(err) throw err;
    promptQuestions();
    
});

function promptQuestions () {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department, role, or employee.",
            "View departments, roles, or employees.",
            "Update an employee.",
            "exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Add a department, role, or employee.":
                addQuestions();
                break;
            
            case "View departments, roles, or employees.":
                viewQuestions();
                break;
            
            case "Update an employee.":
                updateQuestions();
                break;
            
            case "exit":
                connection.end();
                break;
        }
    });
}

function addQuestions () {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to add?",
        choices: [
            "Add a department.",
            "Add a role.",
            "Add an employee.",
            "back"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Add a department.":
            addDepartment();
            break;
            
            case "Add a role.":
            addRole();
            break;
            
            case "Add a employee.":
            addEmployee();
            break;
            
            case "back":
            promptQuestions();
            break;
        }
    });
}

function viewQuestions () {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to view?",
        choices: [
            "View a department.",
            "View a role.",
            "View an employee.",
            "back"
        ]
    })
    .then(async function(answer) {
        switch (answer.action) {
            case "View a department.":
            viewDepartment();
            break;
            
            case "View a role.":
            viewRole();
            break;
            
            case "View a employee.":
            viewEmployee();
            break;
            
            case "back":
            promptQuestions();
            break;
        }
    });
}

function updateQuestions () {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to update?",
            choices: [
                "Update an employee.",
                "back"
            ]
        })
        .then(async function(answer) {
            switch (answer.action) {
                case "Update a department.":
                updateDepartment();
                break;
                
                case "Update a role.":
                updateRole();
                break;
                
                case "Update a employee.":
                updateEmployee();
                break;
                
                case "back":
                promptQuestions();
                break;
            }
        });
}

function addRole() {
    const questions = [
        {
            type : 'input',
            name : 'title',
            message : 'What is the title of this role?'
        },
        {
            type : 'number',
            name : 'salary',
            message : 'What is the salary of this role?'
        },
        {
            type : 'number',
            name : 'departmentID',
            message : 'What is the department ID this role is associated with?'
        }
    ];
    askMultipleQuestions(questions, (answers)=> {        
        askAgain("Would you like to add another?", () => {
            addRole();
        });
    });
}

function addDepartment() {
    askOneQuestion("What is the name of the department you want to add?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Would you like to add another?", () => {
            addDepartment();
        });
    });
}

function addEmployee() {
    askOneQuestion("What is the name of the employee you want to add?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Would you like to add another?", () => {
            addEmployee();
        });
    });
}

function viewRole(itemToView) {
    askOneQuestion("What is the name of the role you want to view?", (answer)=> {
        console.log(answer.userInput);

        askAgain("Would you like to view another?", () => {
            viewRole();
        });
    });
}

function viewDepartment(itemToView) {
    var query = "SELECT id, name FROM departments";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        promptQuestions();
    });
    askOneQuestion("What is the name of the department you want to view?", (answer)=> {
        console.log(answer.userInput);

        askAgain("Would you like to view another?", () => {
            viewDepartment();
        });
    });
}

function viewEmployee(itemToView) {
    askOneQuestion("What is the name of the employee you want to view?", (answer)=> {
        console.log(answer.userInput);

        askAgain("Would you like to view another?", () => {
            viewEmployee();
        });
    });
}

function updateRole(itemToUpdate) {
    askOneQuestion("What is the name of the role you want to update?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Would you like to update another?", () => {
            updateRole();
        });
    });
}

function updateDepartment(itemToUpdate) {
    askOneQuestion("What is the name of the department you want to update?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Would you like to update another?", () => {
            updateDepartment();
        });
    });
}

function updateEmployee(itemToUpdate) {
    askOneQuestion("What is the name of the employee you want to update?", (answer)=> {
        console.log(answer.userInput);
        
        askAgain("Would you like to update another?", () => {
            updateEmployee();
        });
    });
}

function askAgain (question, callback) {
    inquirer.prompt({
        name: "answer",
        type: "confirm",
        message : question
    }).then(function (answer) {
        if(answer.answer)
        {
            callback();
        }
        else
        {
            promptQuestions();
        }
    });

}

function askOneQuestion(question, callback) {
    inquirer.prompt({
        name: "userInput",
        type: "input",
        message: question
    })
    .then((answer) => callback(answer));
}

function askMultipleQuestions(questionsArray, callback) {
    inquirer.prompt(questionsArray)
    .then((answer) => callback(answer));
}