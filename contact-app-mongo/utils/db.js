const mongoose = require('mongoose');
const { type } = require('os');


mongoose.connect('mongodb://127.0.0.1:27017/belajar'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    };



// //menambah satu data
// const contact1 = new Contact({
//     nama: 'Yoka angga',
//     nohp: '087862021227',
//     email: 'yokaangga@gmail.com',
// });

// //simpan ke collection
// contact1.save().then((contact) => console.log(contact));
