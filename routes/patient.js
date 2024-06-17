const { Router } = require('express');
const { getPatients, getPatientByDni, createPatient, deletePatient, updatePatient } = require('../controllers/patientController');
const { validateJWT } = require('../middlewares/validated-jwt/validated-jwt');
const { hasRole, isAdminRole } = require('../middlewares/validated-roles/validated-roles');

const router = Router();

router.get("/",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getPatients);
router.get("/:dni",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getPatientByDni);
router.post("/",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE')] ,createPatient);
router.put("/:dni",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE')],updatePatient);
router.delete("/:dni",[validateJWT,isAdminRole],deletePatient);

module.exports = router;
