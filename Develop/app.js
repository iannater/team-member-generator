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

// This is my array of questions which I call inside of each respective function below. 
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

const engineerQuestions = [
    {
        type: "input",
        name: "engineerName",
        message: "Please enter the Engineer's Name",
    },
    {
        type: "input",
        name: "engineerID",
        message: "Please enter the Engineer's work ID Number",
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Please enter the Engineer's work email address",
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "Please enter the Engineer's GitHub username",
    },
];

const internQuestions = [
    {
        type: "input",
        name: "internName",
        message: "Please enter the intern's Name",
    },
    {
        type: "input",
        name: "internID",
        message: "Please enter the intern's work ID Number",
    },
    {
        type: "input",
        name: "internEmail",
        message: "Please enter the intern's work email address",
    },
    {
        type: "input",
        name: "internSchool",
        message: "Please enter the intern's school name",
    },
];

const teamQuestions = [{
    type: "list",
    name: "employeeType",
    message: " Please select which type of employee you would like to create",
    choices: ["intern", "engineer", "I am done adding team members"]
}]

// This is where my functions start. The first function youll see is the managerInfo(). This prompts the user with the manager questions. At the end of that function I call the create team function. This function asks the user which employees they want to create and then based on their selections calls a function for that employee which prompts them with those employees questions (intern/engineer). Once done they select I am done and this calls the build team function which makes the files.
function managerInfo() {
    inquirer.prompt(managerQuestions)
        .then(responses => {

            const manager = new Manager(responses.managerName, responses.managerID, responses.managerEmail, responses.managerOfficeNumber)
            console.log("New manager", manager)
            team.push(manager);
            createTeam();
        })
};

managerInfo();

// Function that asks the Engineer questions. This comes after the manager question and is called in the switch inside createTeam(). 
function engineerFunction() {
    inquirer.prompt(engineerQuestions)
        .then(responses => {
            // take their answers and build the new Engineer class object
            const engineer = new Engineer(responses.engineerName, responses.engineerID, responses.engineerEmail, responses.engineerGithub)
            console.log("New engineer", engineer)
            // Push that object into the team array
            team.push(engineer);
            createTeam();
        })
}
// Function that asks the Intern questions. This comes after the manager question and is called in the switch inside createTeam(). 
function internFunction() {
    inquirer.prompt(internQuestions)
        .then(responses => {
            // take their answers and build the new Intern class object
            const intern = new Intern(responses.internName, responses.internID, responses.internEmail, responses.internSchool)
            console.log("New intern", intern)
            // Push that object into the team array
            team.push(intern);
            createTeam();
        })
}


function createTeam() {
    inquirer.prompt(teamQuestions)
        .then(teamRes => {
            // Switch to ask the user what employees they want to create.
            switch (teamRes.employeeType) {
                // If they want to create an engineer then we call the engineer function which prompts them with the engineer questions
                case "engineer":
                    engineerFunction();
                    break;
                    // If they want to create an intern then we call the intern function which prompts them with the intern questions
                case "intern":
                    internFunction();
                    break;
                    // If they are done selecting employees then we call the build team function below and generate the file with their answers.
                default:
                    buildTeam();
                    break;
            }
        })
};

// This function builds the file once all employees have been entered by the user using the createTeam(). It is the last function inside of the switch.  
function buildTeam(){
    // Render the file if output doesnt exist already
    fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR);
    //This writes the file to the output folder using htmlrenderer.js
    fs.writeFileSync(outputPath, render(team));       
};

