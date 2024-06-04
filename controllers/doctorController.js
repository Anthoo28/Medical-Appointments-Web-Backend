const DoctorService = require('../services/doctorService');

const doctorService = new DoctorService();

const getDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Error getting doctors' });
    }
}

const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctorByDni(req.params.dni);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Error getting doctor by Dni' });
    }
}

const createDoctor = async (req, res) => {
    try {
        await doctorService.createDoctor(req.body);
        res.status(201).json('Doctor created successfully');
    } catch (error) {
        res.status(500).json({ error: `Error creating doctor: ${error.message}` });
    }
}

const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await doctorService.updateDoctor(req.params.dni, req.body);
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Error updating doctor' });
    }
}

const deleteDoctor = async (req, res) => {
    try {
        await doctorService.deleteDoctor(req.params.dni);
        res.status(200).json('Doctor deleted successfully');
    } catch (error) {
        res.status(500).json({ error: 'Error deleting doctor' });
    }
}

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
}
