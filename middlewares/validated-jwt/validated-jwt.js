const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const Doctor = require("../../models/doctor");
const User = require("../../models/user");
// Importa el modelo del doctor

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }
    
    try {
        const { dni, role } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

        let userOrDoctor;
        if (role === 'DOCTOR_ROLE') {
            userOrDoctor = await Doctor.findOne({dni:dni});
        } else if (role === 'USER_ROLE' || role === 'ADMIN_ROLE'){
            userOrDoctor = await User.findOne({dni:dni});
        }

        if (!userOrDoctor) {
            return res.status(401).json({
                msg: "Token no válido - usuario/doctor no existe en BD"
            });
        }

        if (!userOrDoctor.status) {
            return res.status(401).json({
                msg: `Token no válido - ${role} borrado`
            });
        }

        req.user = userOrDoctor;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
}

module.exports = { validateJWT };
