

const { Router } = require('express');

const {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctorController')


const router = Router();


router.get("/", getDoctors);

router.get("/:dni", getDoctorById);

router.post("/", createDoctor);

router.put("/:dni", updateDoctor);

router.delete("/:dni", deleteDoctor);



module.exports = router;