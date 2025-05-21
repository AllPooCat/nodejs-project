const contacts = require('./contact');

//menambahkan pertanyaan
const main = async () => {
    const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
    const email = await contacts.tulisPertanyaan('Masukan e-mail anda : ');
    const noHP = await contacts.tulisPertanyaan('Masukan no HP anda : ');

    contacts.simpanContact(nama,email,noHP);
};

main();

