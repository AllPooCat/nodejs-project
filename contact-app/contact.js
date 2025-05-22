const fs = require('node:fs');
// const readline = require('node:readline');
const {stdin: input, stdout: output} = require('node:process');
const { dir } = require('node:console');
const { resolve } = require('node:path');
const { rejects } = require('node:assert');
// const rl = readline.createInterface({input,output});
const chalk = require('chalk');
const validator = require('validator');

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
// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(pertanyaan, (jawaban) => {
//             resolve(jawaban);
//         });
//     });
// };

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
     //memasukan ke file contacts.json
    const contact = {nama,email,noHP};
    // const fileBuffer = fs.readFileSync('data/contacts.json','utf-8');
    // const contacts = JSON.parse(fileBuffer);
    const contacts = loadContact();

    //cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold(
                `Kontak dengan nama ${nama} sudah terdaftar, gunakan nama lain!!!`
            )    
        );
        return false;
    }

    //cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
            chalk.red.inverse.bold(
                `Tuliskan e-mail dengan benar!!!`
            )    
            );
        return false;
        }
    }

    contacts.push(contact);

    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log('terima kasih sudah memasukan data!');
    // rl.close();
};

const listContact = () => {
    const contacts = loadContact();
    console.log(
        chalk.blue.inverse.bold(
            `Daftar Contact:`
        )    
    );
    contacts.forEach((contact, i) => {
        console.log(`${i+1}.${contact.nama}-${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama === nama);
    // console.log(cekContact);
    if (!contact) {
        console.log(
            chalk.red.inverse.bold(
                `Kontak dengan nama ${nama} tidak terdaftar, gunakan nama lain!!!`
            )    
        );
        return false;
    };

    console.log(chalk.blue.inverse.bold(contact.nama));
    if (contact.email) {
        console.log(contact.email);
    }
    console.log(contact.noHP);
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (contacts.length === newContacts.length) {
        console.log(
            chalk.red.inverse.bold(
                `Kontak dengan nama ${nama} tidak terdaftar, gunakan nama lain!!!`
            )    
        );
        return false;
    };

    fs.writeFileSync(dataPath, JSON.stringify(newContacts));
    console.log(
        chalk.red.inverse.bold(
            `Kontak dengan nama ${nama} telah dihapus!!!`
        )
    );

}

// module.exports = {tulisPertanyaan, simpanContact};
module.exports = {simpanContact, listContact, detailContact, deleteContact};