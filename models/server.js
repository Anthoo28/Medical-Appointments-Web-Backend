const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { DBConnection } = require("../database/config");

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            auth:'/api/auth',
            user:'/api/user',
            specialty:'/api/specialty',
        }

    //Conectar a base de datos
    this.DbConnection();

        //Middlewares
      this.middlewares();
      
      //routes  
      this.routes();
        
    
    }
    async DbConnection(){
        await DBConnection();
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


    routes(){
        this.app.use(this.paths.user, require('../routes/user')),
        this.app.use(this.paths.auth, require('../routes/auth')),
        this.app.use(this.paths.specialty, require('../routes/specialty'))
    
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port} '🚀'` );
        });
    }


}

module.exports = Server;
