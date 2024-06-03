const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google/google-verify");
const User  = require("../models/user");
const bcrypt = require('bcryptjs');


const login= async (req, res) => {
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

        const token= await generateJWT(user.dni);
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



const googleSignIn=async(req=request,res= response)=>{
    const {id_token}= req.body;
  
  try {
    const {email,name,img, lastname}= await googleVerify(id_token);
    //reference
    let user  = await User.findOne({email});
    let i=11111113;
    if(!user){
      //crear user
      const data ={
        dni:i+1,
        name,
        lastname,
        email,
        password:':P',
        img,
        google: true,
        role:'USER_ROLE',
        bornDate: null,
        phone: null,
        address:null,
        gender:null

      };
       user = new User(data);
        user.save();
    }
    // user en db
    if(!user.status){
      return res.status(401).json({
        msg:'User blocked contact with the admin'
      });
    }
      //generar jwt
      const token= await generateJWT(user.id);
      res.json({
        user,
        token,
       id_token
      });
  
  } catch (error) {  
    res.status(400).json({
      ok:false,
      msg: 'token no se pudo verificar'
    });
  }
  
  
  }


  module.exports={
        login,
        googleSignIn
  };