const validator = require('validator');

const email = validator.isEmail('yoka@gmail.c');
console.log('email :>> ', email);

const noHp = validator.isMobilePhone('087862021227','id-ID');
console.log('noHp :>> ',noHp);
