const user = require("../../models/user");
const {check} = require('express-validator');
const moment = require('moment');


// Validar si el DNI existe en la base de datos
const existUserDniU = async (dni = '') => {
    const exist = await user.findOne({ dni });
    if (exist) {
        throw new Error(`Dni ${dni} exists in the database`);
    }
};

// Validar si el DNI no existe en la base de datos
const userDniU = async (dni = '') => {
    const exist = await user.findOne({ dni });
    if (!exist) {
        throw new Error(`Dni ${dni} doesn't exist in the database`);
    }
};

// Validar DNI 
const validateDNIU = () => {
    return [
        check('dni', 'The dni is required').not().isEmpty().optional(),
        check('dni', 'The dni must have 8 digits').isLength({ min: 8, max: 8 }).optional(),
        check('dni', 'The dni must be a number').isNumeric().optional(),
    ];
};

// Validar email
const validateEmailU = () => {
    return [
        check('email', 'The email is invalid').isEmail().optional(),
        check('email', 'The email already exists').custom(existEmail).optional(),
    ];
};

// Validar teléfono
const validatePhoneU = () => {
    return [
        check('phone', 'The phone must have 9 digits').isLength({ min: 9, max: 9 }).optional(),
        check('phone', 'The phone must be a number').isNumeric().optional(),
    ];
};

// Validar fecha de nacimiento
const validateBornDateU = () => {
    return [
        check('bornDate', 'The bornDate is invalid').custom(value => {
            return moment(value, 'YYYY-MM-DD', true).isValid();
        }).optional(),
        // Validar que la fecha de nacimiento sea hasta hoy
        check('bornDate', 'The bornDate must be a date until today').custom(value => {
            const currentDate = moment();
            const selectedDate = moment(value, 'YYYY-MM-DD');
            if (selectedDate.isAfter(currentDate, 'day')) {
                throw new Error('The bornDate must be until today');
            }
            return true;
        }).optional(),
    ];
};

// Validar género
const validateGenderU = () => {
    return [
        check("gender").custom(value => {
            return value === 'M' || value === 'F';
        }).optional()
    ];
};



//validar que los campos no esten vacios
const validateNotEmpty =(fields)=>{
    return fields.map(field=>check(field,`The ${field} is required`).not().isEmpty());
}

module.exports={
    existUserDniU,
    validateDNIU,
    validateNotEmpty,
    validateEmailU,
    validatePhoneU,
    validateBornDateU,
    validateGenderU,
    userDniU
}