const {Router} = require('express');    
const { getAppointments,getAppointmentById,createAppointment,deleteAppointment,getAppointmentByIdDoctor } = require('../controllers/appointmentController');
const { validateJWT } = require('../middlewares/validated-jwt/validated-jwt');
const { isAdminRole, hasRole } = require('../middlewares/validated-roles/validated-roles');

const router = Router();


router.get('/', [validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getAppointments);
router.get('/:id', [validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getAppointmentById);
router.get('/doctor/:id',[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], getAppointmentByIdDoctor);
router.post('/',[validateJWT,hasRole('ADMIN_ROLE','USER_ROLE','DOCTOR_ROLE')], createAppointment);
router.delete('/:id',[validateJWT,isAdminRole] ,deleteAppointment);

module.exports = router;