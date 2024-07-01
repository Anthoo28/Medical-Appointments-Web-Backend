const {Router}= require('express');
const { getPrescriptions, getPrescriptionById, createPrescription, deletePrescription, getPrescriptionsByAppointmentId } = require('../controllers/prescriptionController');

const router = Router();


router.get("/", getPrescriptions);
router.get("/:id", getPrescriptionById);
router.get("/appointment/:appointmentId", getPrescriptionsByAppointmentId);
router.post("/", createPrescription);
router.delete("/:id", deletePrescription);




module.exports = router;