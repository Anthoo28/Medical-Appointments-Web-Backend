const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            auth:'api/auth',
            users:'api/users',
        }



        //Middlewares
      this.middlewares();
      
    //   //routes  
    //   this.routes();

    }


    middlewares(){

        //CORS
        this.app.use(cors());

        //lectura y parseo de body
        this.app.use(express.json());

        //directorio publico
        //para que se pueda acceder a la carpeta publica
        this.app.use(express.static('public')); 


        //fileupload - carga de archivos
        this.app.use(fileUpload({
            userTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }


    // routes(){
    //     this.app.use(this.paths.auth, require('../routes/auth'));
    //     this.app.use(this.paths.users, require('../routes/user'));

    // }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port} '🚀'` );
        });
    }


}

module.exports = Server;
