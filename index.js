const qrcode = require('qrcode-terminal');
const inquirer = require('inquirer');
const chalk = require('chalk');
/* const name = require("./name"); */

const { Client } = require('whatsapp-web.js');
const client = new Client();

let phone;
let iterations;
let body;

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log("");
    console.log(chalk.bgWhite.bold.black("SPAMAITOR-3000"));
    console.log("");
    start();
});

client.initialize();

function start() {
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
                console.log("Here we go...");

                for (let i = 0; i <= iterations; i++) {
                    client.sendMessage(phone, body);
                }

                console.log("It's done.")
                start();
            })

        })
    })
}






