const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'test';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifieldTopology: true,
});

client.connect((error, client) => {
    if (error) {
        return console.log('koneksi gagal :>> ');
    }
  

    //pilih database
    const db = client.db(dbName);

    //manambahkan satu data ke collection/insert data
    // db.collection('mahasiswa').insertOne({
    //     nama: 'erik',
    //     email: 'erik@gmail.com',
    // },
    // (error, result) => {
    //   if (error) {
    //     return console.log('gagal menambahkan data');
    //   }  
    //   console.log('result :>> ', result);
    // });

    //menambahkan banyak data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'loki',
    //             email: 'loki@gmail.com'
    //         },
    //         {
    //             nama: 'tanos',
    //             email: 'tanos@yahoo.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Data gagal ditambahkan');
    //         }
    //         console.log('result :>> ', result);
    //     }
    // )

    //menampilkan semua data di collection/ tabel mahasiswa
    // console.log(
    //     db.collection('mahasiswa')
    //     .find()
    //     .toArray((error, result) => {
    //     console.log(result);
    // }));

    //menampilkan data berdasarkan nama
    // console.log(
    //     db.collection('mahasiswa')
    //     .find({nama: 'loki'})
    //     .toArray((error, result) => {
    //     console.log(result);
    // }));

    //menampilkan berdasarkan id
    console.log(
        db.collection('mahasiswa')
        .find({_id: ObjectId('6838717fc953db5a3ce6f831')})
        .toArray((error, result) => {
        console.log(result);
    }));

});