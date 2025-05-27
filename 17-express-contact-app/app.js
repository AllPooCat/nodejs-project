const express = require('express');
const { title } = require('process');
const {loadContact, findContact, addContact, cekDuplikat} = require('./utils/contacts');
const expressLayouts = require('express-ejs-layouts');
const { query, validationResult, body, check } = require('express-validator');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()
const port = 3000

//gunakan EJS
app.set('view engine', 'ejs');

//third party middleware
app.use(expressLayouts);

//agar file/folder statis dapat diakses public
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

//konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(flash());

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
        msg: req.flash('msg'),
    });
});

//halaman tambah contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Contact',
        layout: 'layouts/main-layout',
    });
});

//proses data contact
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
           throw new Error('Nama contact sudah digunakan!!!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!!!').isEmail(),
    check('nohp', 'No Handphone tidak valid!!!').isMobilePhone('id-ID')
], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({errors: errors.array()});
        res.render('add-contact', {
            title: 'Form Tambah Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        });
    } else {
        addContact(req.body);
        //kirimkan flash massage
        req.flash('msg', 'Data contact berhasil ditambahkan!!!');
        res.redirect('/contact');
    };
    
});

//halaman detail contact
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