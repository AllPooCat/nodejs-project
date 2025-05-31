const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const { body, validationResult, check } = require('express-validator');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

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
});

app.get('/about', (req, res) => {
//   res.send('Ini adalah halaman about yang akan keren!')
    // res.sendFile('./about.html',{root: __dirname});
    //MENGGUNAKAN TEMPLATING ENGINE EJS
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    });
})

app.get('/contact', async (req, res) => {
//mengambil data contact
    const contacts = await Contact.find();
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


//proses tambah data contact
// app.post('/contact', [
//     body('nama').custom(async (value) => {
//         const duplikat = await Contact.findOne({nama: value});
//         if (duplikat) {
//            throw new Error('Nama contact sudah digunakan!!!');
//         }
//         return true;
//     }),
//     check('email', 'Email tidak valid!!!').isEmail(),
//     check('nohp', 'No Handphone tidak valid!!!').isMobilePhone('id-ID')
// ], (req, res) => {
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.render('add-contact', {
//             title: 'Form Tambah Contact',
//             layout: 'layouts/main-layout',
//             errors: errors.array(),
//         });
//     } else {
//             Contact.insertMany(req.body).then(() => {
//                 req.flash('msg', 'Data contact berhasil ditambahkan!!!');
//                 res.redirect('/contact');
//             });
//     };
    
// });
// proses tambah data contact
app.post('/contact', [
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({ nama: value });
        if (duplikat) {
            throw new Error('Nama contact sudah digunakan!!!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!!!').isEmail(),
    check('nohp', 'No Handphone tidak valid!!!').isMobilePhone('id-ID')
    ], async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render('add-contact', {
                title: 'Form Tambah Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
            });
        }

        try {
            await Contact.insertMany([req.body]); // pastikan bentuk array
            req.flash('msg', 'Data contact berhasil ditambahkan!!!');
            res.redirect('/contact');
        } catch (err) {
            console.error(err);
            req.flash('msg', 'Terjadi kesalahan saat menambahkan data!');
            res.redirect('/contact');
        }
});

//proses delete contact
app.get('/contact/delete/:nama', async (req, res) => {
        const contact = await Contact.findOne({ nama: req.params.nama });

        if (!contact) {
            return res.status(404).send('<h1>404 - Contact tidak ditemukan</h1>');
        } else {
            await Contact.deleteOne({ _id: contact._id });

            req.flash('msg', 'Data contact berhasil dihapus!!!');
            console.log('Redirecting ke /contact...');
            res.redirect('/contact');
        }

        
});



//halaman detail contact
app.get('/contact/:nama', async (req, res) => {
//mengambil data contact
    const contact = await Contact.findOneAndDelete({nama: req.params.nama});
    res.render('detail', {
        title: 'Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});


app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});