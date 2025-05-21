const fs = require('node:fs');
const readline = require('node:readline');
const {stdin: input, stdout: output} = require('node:process');
const { dir } = require('node:console');
const { resolve } = require('node:path');
const { rejects } = require('node:assert');
const rl = readline.createInterface({input,output});

//membuat folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}


//membuat contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

//skema pertanyaan menggunakan promise
const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (jawaban) => {
            resolve(jawaban);
        });
    });
};

const simpanContact = (nama, email, noHP) => {
     //memasukan ke file contacts.json
    const contact = {nama,email,noHP};
    const fileBuffer = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(fileBuffer);

    contacts.push(contact);

    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    rl.close();
};

module.exports = {tulisPertanyaan, simpanContact};