const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { DBConnection } = require("../database/config");
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger-output.json');
const { userDniU } = require("../helpers/user-helpers/update");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            user: '/api/user', // Define la ruta base para las rutas de usuario
            auth: '/api/auth',
            specialty: '/api/specialty',
            doctor: '/api/doctor',
            swagger: '/api-docs',
            patient:'/api/patient',
            appointment:'/api/appointment'
        }

        // Conectar a base de datos
        this.DbConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async DbConnection() {
        await DBConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo de body
        this.app.use(express.json());

        // Directorio público
        // Para que se pueda acceder a la carpeta publica
        this.app.use(express.static('public'));

        // Fileupload - carga de archivos
        this.app.use(fileUpload({
            userTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        // Usa la ruta base definida en this.paths.user y concatena las rutas específicas
        this.app.use('/api/user', require('../routes/user'));
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/specialty', require('../routes/specialty'));
        this.app.use('/api/doctor', require('../routes/doctor'));
        this.app.use('/api/patient', require('../routes/patient'));
        this.app.use('/api/appointment', require('../routes/appointment'));
        
        // Configura Swagger en la ruta especificada
        this.app.use(this.paths.swagger, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port} '🚀'`);
        });
    }
}

module.exports = Server;
