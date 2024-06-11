const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google/google-verify");
const Doctor = require("../models/doctor");
const User  = require("../models/user");
const bcrypt = require('bcryptjs');


const loginUser= async (req, res) => {
    const {dni, password} = req.body;
    try {
        //dni existe
        const user= await User.findOne({dni});
        if(!user){
            return res.status(400).json({
                msg: 'User/password are not correct - id'
            });
        }
        //usuario activo
        if(!user.status){
            return res.status(400).json({
                msg: 'User/password are not correct - status: false'
            });
        }
        //verificar contraseña
        const validPassword= bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'User/password are not correct - password'
            });
        }

        const token= await generateJWT(user.dni,user.role);
        res.json({
          user,
          token
        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error trying to login'
        });    
    }
};

const loginDoctor= async (req, res) => {
  const {dni, password} = req.body;
  try {
      //dni existe
      const doctor= await Doctor.findOne({dni});
      if(!doctor){
          return res.status(400).json({
              msg: 'Doctor/password are not correct - id'
          });
      }
      //doctor activo
      if(!doctor.status){
          return res.status(400).json({
              msg: 'Doctor/password are not correct - status: false'
          });
      }
      //verificar contraseña
      const validPassword= bcrypt.compareSync(password, doctor.password);
      if(!validPassword){
          return res.status(400).json({
              msg: 'Doctor/password are not correct - password'
          });
      }

      const token= await generateJWT(doctor.dni, doctor.role);
      res.json({
        doctor,
        token
      });
  
      
  } catch (error) {
      console.log(error);
      res.status(500).json({
          msg: 'Error trying to login'
      });    
  }
};





  module.exports={
    loginUser,
    loginDoctor
  };