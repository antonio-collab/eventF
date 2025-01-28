const crypto = require('crypto');

// Gera uma chave secreta de 64 bytes (512 bits) em formato hexadecimal
const secret = crypto.randomBytes(64).toString('hex');
console.log('JWT_SECRET=', secret);