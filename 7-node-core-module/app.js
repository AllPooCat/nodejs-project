const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { json } = require('node:stream/consumers');
const rl = readline.createInterface({input, output});

//membuat file secara syncronous
// try {
//     fs.writeFileSync('data/test.txt', 'Halo ini hanya percobaan!!!');    
// } catch (error) {
//     console.log(error);
// }

//membuat file secara asyncronous
// fs.writeFileSync('data/test.txt', 'Hellow ini secara asyncronous', (e) => {
//     console.log(e);
// })

//membaca isi file secara syncronous
// fs.readFileSync('data/test.txt');

//membaca isi file lalu menyimpan isi tersebut di test.txt diluar folder data
// fs.writeFileSync('test.txt', fs.readFileSync('data/test.txt'),(e) => {
//     console.log(e);
// })

//membaca file secara asyncronous
// fs.readFile('data/test.txt', 'utf-8', (err,data) => {
//     if (err) throw err;
//     console.log(data);
// });

//mengambil masukan dan menampilkannya
// rl.question('Apa kabar anda? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`terima kasih atas jawabannya: ${answer}`);

//   rl.close();
// });

//menambahkan data ke file data/contacs.json dengan nama dan no yg yang kita input sendiri
rl.question('Siapa nama anda? ', (nama) =>{
    rl.question('Berapa no hp anda? ', (noHp) => {
        console.log(`terima kasih ${nama} telah memasukan no hp ${noHp}`);
        
        const contact = {nama, noHp};
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log('terima kasih sudah input data.');
        rl.close();
    })
})