const jwt = require('jsonwebtoken');

const generateJWT = (dni = '', role = '') => {
    console.log(`Generating token for dni: ${dni}, role: ${role}`);
    return new Promise((resolve, reject) => {
        const payload = { dni, role };
        jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Could not generate the token');
            } else {
                resolve(token);
            }
        });
    });
}


module.exports = {
    generateJWT
}
