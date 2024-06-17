

const { Router } = require('express');

const {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctorController');
const { validateJWT } = require('../middlewares/validated-jwt/validated-jwt');
const { hasRole, isAdminRole } = require('../middlewares/validated-roles/validated-roles');


const router = Router();


router.get("/",[validateJWT, hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getDoctors);

router.get("/:dni",[validateJWT ,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getDoctorById);

router.post("/", [validateJWT,isAdminRole],createDoctor);

router.put("/:dni",[validateJWT, hasRole('ADMIN_ROLE','DOCTOR_ROLE')], updateDoctor);

router.delete("/:dni",[validateJWT, isAdminRole], deleteDoctor);



module.exports = router;