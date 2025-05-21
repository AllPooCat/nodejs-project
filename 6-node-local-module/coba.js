function cetakNama(nama){
    return `Halo nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama    : 'Yoka Angga',
    umur    : "33",
    cetakMhs(){
       return `Halo nama saya ${this.nama} dan umur saya ${this.umur}`; 
    }
}

class Orang {
    constructor() {
        console.log('Objek orang telah dibuat!!!');
    }
}


module.exports = { cetakNama, PI, mahasiswa, Orang };