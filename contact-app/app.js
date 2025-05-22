//mengambil argumen dari command line
// const command = process.argv[2];
// if (command==='add') {
    
// } else if (command==='remove') {
    
// } else if (command==='list') {
    
// }
const yargs = require('yargs');
const contacts = require('./contact');
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: "Email anda",
            demandOption: true,
            type: 'string',
        },
        noHP: {
            describe: "No Handphone anda",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHP)
    }
})
.demandCommand();

//menampilkan semua nama contact
yargs.command({
    command: 'list',
    describe: 'Menambahkan semua nama contact & no HP',
    handler(){
        contacts.listContact();
    },
})

//menampilkan detail contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },
});

//menghapus berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();

// const contacts = require('./contact');

// //menambahkan pertanyaan
// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
//     const email = await contacts.tulisPertanyaan('Masukan e-mail anda : ');
//     const noHP = await contacts.tulisPertanyaan('Masukan no HP anda : ');

//     contacts.simpanContact(nama,email,noHP);
// };

// main();

