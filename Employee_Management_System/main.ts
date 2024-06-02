import inquirer from "inquirer";
import chalk from "chalk";

interface Employee {
    EmployeeID: number;
    EmployeeName: string;
    EmployeeSalary: number
}

let collectionOfEmployee: Employee[] = [];

async function main() {
    console.log("\n")
    console.log(chalk.bold.bgCyan("******** Welcome To Employee Management System ********"));
    console.log("\n");

    let selectedOption = await inquirer.prompt([
        {
            message: "Please Select an Option",
            name: "userSelectedOption",
            type: "list",
            choices: [
                "Add Employee",
                "View Employee",
                "Delete Employee",
                "Update Employee",
                "Exit"
            ]
        }
    ]);


    switch (selectedOption.userSelectedOption) {
        case "Add Employee":
            addEmployee();
            break;
        case "View Employee":
            viewAllEmployee();
            break;
        case "Delete Employee":
            deleteEmployee();
            break;
        case "Update Employee":
            UpdateEmployee();
            break;
        default:
            console.log("\n")
            console.log(chalk.bgGreen.bold("**** Thanyou :) ****"))
            console.log("\n")
            process.exit();
    }

}

async function addEmployee() {
    console.log("\n");
    let EmployeeDetails = await inquirer.prompt([
        {
            name: "EmployeeID",
            message: "Please Enter Your ID",
            type: "number"
        },
        {
            name: "EmployeeName",
            message: "Please Enter Your Name",
            type: "input"
        },
        {
            name: "EmployeeSalary",
            message: "Please Enter Your Salary",
            type: "number"
        }
    ]);

    collectionOfEmployee.push(
        {
            EmployeeID: EmployeeDetails.EmployeeID,
            EmployeeName: EmployeeDetails.EmployeeName,
            EmployeeSalary: EmployeeDetails.EmployeeSalary
        }
    )
    console.log("\n");
    console.log(chalk.bgMagenta.bold("********* Employee Added Successfully **********"))
    console.log("\n");
    console.log(collectionOfEmployee[collectionOfEmployee.length - 1]);

    main();
}

async function viewAllEmployee() {
    console.log("\n")
    console.log(chalk.bgYellow.bold("********** View All Employee *********"))
    console.log("\n")
    for (let i = 0; i < collectionOfEmployee.length; i++) {
        console.log(collectionOfEmployee[i]);
        console.log("\n")
    }
    main();
}

async function deleteEmployee() {
    let EmployeeDetails = await inquirer.prompt([
        {
            name: "EmployeeID",
            type: "number",
            message: "Please Enter Your ID"
        }
    ])
    collectionOfEmployee = collectionOfEmployee.filter((x) => x.EmployeeID != EmployeeDetails.EmployeeID);
    console.log("\n")
    console.log(chalk.bgRedBright.bold("******** Employee Deleted Successfully ******"));
    console.log("\n")

    main();
}

async function UpdateEmployee() {
    let EmployeeDetails = await inquirer.prompt([
        {
            name: "EmployeeID",
            type: "number",
            message: "Please Enter Your ID"
        }
    ])

    let employee = collectionOfEmployee.find((x) => x.EmployeeID === EmployeeDetails.EmployeeID);

    if (employee) {
        let UpdateDetails = await inquirer.prompt([
            {
                name: "EmployeeName",
                message: "Please Enter Your New Name",
                type: "input"
            },
            {
                name: "EmployeeSalary",
                message: "Please Enter Your New Salary",
                type: "number"
            }
        ])

        employee.EmployeeName = UpdateDetails.EmployeeName;
        employee.EmployeeSalary = UpdateDetails.EmployeeSalary;
        console.log("\n")
        console.log(chalk.bgBlue.bold("*****:) Employee Update Successfully ****"))
        console.log("\n")
        console.log(employee);

    } else{
        console.log("\n")
        console.log(chalk.red.bold("****** :( Employee Not Found *****"))
        console.log("\n")
    }
    main();

}



main();