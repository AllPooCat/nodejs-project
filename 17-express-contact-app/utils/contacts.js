const fs = require('node:fs');

//membuat folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
};

//membuat contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

//ambil semua data di contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

//cari contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

//menuliskan/menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
};

//menambahkan contact baru ke contacts.json
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
};

//mengecek nama yang duplikat
const cekDuplikat = (nama) => {
   const contacts = loadContact();
   return contacts.find((contact) => contact.nama === nama); 
};

//hapus contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama != nama);
    saveContacts(filteredContacts);
};

//mengubah contacts
const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    //hilangkan contact nama yang namanya sama dengan oldNama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
    delete contactBaru.oldNama;
    filteredContacts.push(contactBaru);
    saveContacts(filteredContacts);
};
module.exports = { loadContact, findContact, deleteContact, addContact, cekDuplikat, updateContacts };