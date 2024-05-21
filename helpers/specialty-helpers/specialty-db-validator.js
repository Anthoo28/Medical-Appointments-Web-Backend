const specialty = require('../../models/specialty');
const {check}= require('express-validator');


//validar si la especialidad ya existe en la base de datos
const existSpecialtyid=async(id='')=>{
    const exist= await specialty.findOne({_id:id});
    if(!exist){
        throw new Error(`Specialty ${id} dont exist in the database`);
    }
}

module.exports={existSpecialtyid}


