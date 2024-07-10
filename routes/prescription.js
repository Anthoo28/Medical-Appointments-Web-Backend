const {Router}= require('express');
const { getPrescriptions, getPrescriptionById, createPrescription, deletePrescription, getPrescriptionsByAppointmentId } = require('../controllers/prescriptionController');
const { validateJWT } = require('../middlewares/validated-jwt/validated-jwt');
const { hasRole, isAdminRole } = require('../middlewares/validated-roles/validated-roles');
const router = Router();


router.get("/",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getPrescriptions);
router.get("/:id",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getPrescriptionById);
router.get("/appointment/:appointmentId",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getPrescriptionsByAppointmentId);
router.post("/",[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], createPrescription);
router.delete("/:id",[validateJWT, isAdminRole], deletePrescription);




module.exports = router;