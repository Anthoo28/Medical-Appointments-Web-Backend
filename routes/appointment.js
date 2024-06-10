const {Router} = require('express');    
const { getAppointments,getAppointmentById,createAppointment,deleteAppointment,getAppointmentByIdDoctor } = require('../controllers/appointmentController');

const router = Router();


router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.get('/doctor/:id', getAppointmentByIdDoctor);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;