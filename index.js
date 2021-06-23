const qrcode = require('qrcode-terminal');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { Client } = require('whatsapp-web.js');
/* const name = require("./name"); */

const client = new Client();

let phone;
let iterations;
let body;
let disturbanceFlag = false;

function doNotDisturb() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Do not disturb ON/OFF",
            choices: [
                "On",
                "Off"
            ]
        }
    ]).then(answer => {
        if (answer.options == "On") {

            console.log("");
            console.log("Do not disturb is " + chalk.bold.red("ON"));
            console.log("");

            disturbanceFlag = true;

        } else if (answer.options == "Off") {

            console.log("");
            console.log("Do not disturb is " + chalk.bold.red("OFF"));
            console.log("");

            disturbanceFlag = false;

        }

        menu();

    })
}

function disturbSomeone() {
    inquirer.prompt([
        {
            type: "number",
            name: "phone",
            message: "Who do you want to spam today?"
        }
    ]).then(answer => {
        phone = answer.phone + "@c.us";
        
        inquirer.prompt([
            {
                type: "number",
                name: "iterations",
                message: "How many times do you want to spam the victim?"
            }
        ]).then(answer => {
            iterations = answer.iterations;

            inquirer.prompt([
                {
                    type: "input",
                    name: "body",
                    message: "What do you want to tell the victim?"
                }
            ]).then(answer => {
                body = answer.body;
                console.log(chalk.bold("Here we go..."));

                for (let i = 0; i <= iterations; i++) {
                    client.sendMessage(phone, body);
                }

                console.log("");
                console.log(chalk.bold("It's done."));
                menu();
            })

        })
    })
}

function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What do you want to do?",
            choices: [
                "Do not disturb",
                "Disturb someone"
            ]
        }
    ]).then(answer => {
        if (answer.options == "Do not disturb") {
            doNotDisturb();
        } else if (answer.options == "Disturb someone") {
            disturbSomeone();
        }
    })
}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log("");
    console.log(chalk.bgWhite.bold.black("SPAM-INADOR-3000"));
    console.log("");
    menu();
});

client.initialize();

if (disturbanceFlag == true) {
    client.on("message", function(message) {
        for (let i = 0; i <= 10; i++) {
            client.sendMessage(message.from, "Do not disturb meee");
        }
    })
}

