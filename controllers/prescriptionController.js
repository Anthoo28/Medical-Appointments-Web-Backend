const PrescriptionService = require ('../services/prescriptionService');
const prescriptionService = new PrescriptionService();


const getPrescriptions = async (req, res) => {

    try {
        const prescriptions = await prescriptionService.getAllPrescriptions();
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Error getting descriptions' });
    }
}

const getPrescriptionById = async (req, res) => {
    try {
        const prescription = await prescriptionService.getPrescriptionById(req.params.id);
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Error getting prescription by id' });
    }
}
const createPrescription = async (req, res) => {
    try {
        await prescriptionService.createPrescription(req.body);
        console.log(req.body)
        res.status(200).json("Prescription created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
const deletePrescription = async (req, res) => {
    try {
        const presctiption = await prescriptionService.deletePrescription(req.params.id);
        res.status(200).json("Prescription deleted successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error deleting prescription' });
    }
}

const getPrescriptionsByAppointmentId = async (req, res) => {
    try {
        const prescriptions = await prescriptionService.getPrescriptionsByAppointmentId(req.params.appointmentId);
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Error getting prescriptions by appointment id' });
    }
};



module.exports = {getPrescriptions, getPrescriptionById,createPrescription ,deletePrescription,getPrescriptionsByAppointmentId}