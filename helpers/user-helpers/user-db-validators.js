const user = require("../../models/user");
const {check} = require('express-validator');
const moment = require('moment');


//validar si el dni ya existe en la base de datos
const existUserDni=async(dni='')=>{
    const exist= await user.findOne({dni});
    if(!exist){
        throw new Error(`Dni ${dni} don't exist in the database`);
    }
};

//validar dni 
const validateDNI = () => {
    return [
        check('dni', 'The dni is required').not().isEmpty(),
        check('dni', 'The dni must have 8 digits').isLength({ min: 8, max: 8 }),
        check('dni', 'The dni must be a number').isNumeric(),
        check('dni', 'The dni does not exist').custom(existUserDni),
    ];
};


//validar si el email ya existe en la base de datos
const existEmail= async(email='')=>{
    const exist= await user.findOne({email});
    if(exist){
        throw new Error(`Email ${email} already exist in the database`);
    }
};


//validad email
const validateEmail = () => {
    return [
        check('email', 'The email is invalid').isEmail(),
        check('email', 'The email already exist').custom(existEmail),
    ];

}

//validar telefono
const validatePhone = () => {
    return [
        check('phone', 'The phone must have 9 digits').isLength({ min: 9, max: 9 }),
        check('phone', 'The phone must be a number').isNumeric(),
    ];
};


const validateBornDate = () => {
    return [
        check('bornDate', 'The bornDate is invalid').custom(value => {
            return moment(value, 'YYYY-MM-DD', true).isValid();
        }),
        // Validar que la fecha de nacimiento sea hasta hoy
        check('bornDate', 'The bornDate must be a date until today').custom(value => {
            const currentDate = moment();
            const selectedDate = moment(value, 'YYYY-MM-DD');
            if (selectedDate.isAfter(currentDate, 'day')) {
                throw new Error('The bornDate must be until today');
            }
            return true;
        }),
    ];
};

const validateGender = () => {
    return [
        check("gender").custom(value => {
            return value === 'M' || value === 'F';
        })
    ]}




//validar que los campos no esten vacios
const validateNotEmpty =(fields)=>{
    return fields.map(field=>check(field,`The ${field} is required`).not().isEmpty());
}

module.exports={
    existUserDni,
    validateDNI,
    validateNotEmpty,
    existEmail,
    validateEmail,
    validatePhone,
    validateBornDate,
    validateGender
}