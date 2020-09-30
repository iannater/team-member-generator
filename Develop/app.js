const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "Please enter the Managers Name",
    },

    {
        type: "input",
        name: "managerID",
        message: "Please enter the Managers work ID Number",
    },

    {
        type: "input",
        name: "managerEmail",
        message: "Please enter the Managers work email address",
    },

    {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter the managers office number",
    },
];

const employeeQuestions = [
    {
        type: "input",
        name: "employeeName",
        message: "Please enter the employees name",
    },

    {
        type: "input",
        name: "managerID",
        message: "Please enter the employees work ID number",
    },

    {
        type: "input",
        name: "managerEmail",
        message: "Please enter the employees work email address",
    },

    {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter the managers office number",
    },
]

const teamQuestions = [{
    type: "list",
    name: "employeeType",
    message: " Please select which type of employee you would like to create",
    choices: ["intern", "engineer", "I am done adding team members"]
}]



function createTeam(){
        inquire.prompt(teamQuestions)
        .then(teamRes => {
          
            switch (teamRes.employeeType) {
                case "engineer": 
                    //call fucntion to ask enginner questions
                    break;
                case "intern":
                //to ask intern question internInfo();
                    break;
                default:
                /// function will help build our team
                    break;
            }
        })
};



function managerInfo(){
    inquirer.prompt(managerQuestions)
    .then(responses => {
       
        const manager = new Manager(responses.managerName, responses.managerID, responses.managerEmail, responses.managerOfficeNumber)
        console.log("New manager", manager)
        team.push(manager);
        createTeam();
        //call a function thats going to ask if you want to 
        // - create and enginer
        //- create intern
        //- stop makinga team
    })
};

managerInfo();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
