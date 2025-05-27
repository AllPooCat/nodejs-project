const express = require('express');
const { title } = require('process');
const {loadContact, findContact} = require('./utils/contacts');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

//gunakan EJS
app.set('view engine', 'ejs');

//third party middleware
app.use(expressLayouts);

//agar file/folder statis dapat diakses public
app.use(express.static('public'));

app.get('/', (req, res) => {    
    const mahasiswa = [
        {
            nama: 'Yoka Angga',
            email: 'yoka@gmail.com'
        },
        {
            nama: 'Dian',
            email: 'diaan@gmail.com'
        },
        {
            nama: 'Reyna',
            email: 'reyna@gmail.com'
        }
    ];

    //MENGGUNAKAN TEMPLATING ENGINE EJS
    res.render('index', {
        nama: 'Yoka Angga Prawira', 
        title: 'Halaman Home',
        layout: 'layouts/main-layout',
        mahasiswa,
    });
})

app.get('/about', (req, res) => {
//   res.send('Ini adalah halaman about yang akan keren!')
    // res.sendFile('./about.html',{root: __dirname});
    //MENGGUNAKAN TEMPLATING ENGINE EJS
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    });
})

app.get('/contact', (req, res) => {
//mengambil data contact
    const contacts = loadContact();
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
    });
});

app.get('/contact/:nama', (req, res) => {
//mengambil data contact
    const contact = findContact(req.params.nama);
    res.render('detail', {
        title: 'Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})