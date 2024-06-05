const { Router } = require('express');
const { getPatients, getPatientByDni, createPatient, deletePatient } = require('../controllers/patientController');

const router = Router();

router.get("/", getPatients);
router.get("/:dni", getPatientByDni);
router.post("/", createPatient);
router.put("/:dni",);
router.delete("/:dni",deletePatient);

module.exports = router;
