//================PROGRAM SEBELUM EXPRESSJS==========================
// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.write(404);
//             res.write('Error file not found');
//         } else {
//             res.write(data);
//         };
//         res.end();
//     });
// };


// //membuat server
// http.createServer((req, res) => {
//     //agar menampilkan konten html
//     res.writeHead(200, {
//         'content-type' : 'text/html',
//     });

//     const url = req.url;

//     //routing
//     switch (url) {
//         case '/about':
//             renderHTML('./about.html',res);
//             break;
//         case '/contact':
//             renderHTML('./contact.html',res);
//             break;
//         default:
//             renderHTML('./index.html',res);
//             break;
//     };

//     // if (url === '/about') {
//     //     renderHTML('./about.html', res);
//     // } else if (url === '/contact') {
//     //     renderHTML('./contact.html', res);
//     // } else {
//     //     renderHTML('./index.html', res);
//     // };

    
// })
// .listen(port, () =>{
//     console.log(`Server is listening on port ${port}..`);
// });
//================PROGRAM SEBELUM EXPRESSJS==========================

const express = require('express');
const { title } = require('process');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

//gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
//   res.send('Hello World!')
    // res.json({
    //     nama: 'Yoka',
    //     email: 'yoka@gmail.com',
    //     noHP: '08123456789',
    // });
    // res.sendFile('./index.html',{root: __dirname});
    //{root: __dirname} artinya berada di direktori yang sama
    
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
//   res.send('Ini adalah halaman contact yang akan keren!')
    // res.sendFile('./contact.html',{root: __dirname});
    //MENGGUNAKAN TEMPLATING ENGINE EJS
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
    });
})

app.get('/product/:id/', (req, res) => {
    res.send(`Product ID :  ${req.params.id} <br> Category : ${req.query.category}`);
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})