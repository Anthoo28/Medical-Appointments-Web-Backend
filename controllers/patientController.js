const PatientService = require('../services/patientService');

const patientService = new PatientService();

const getPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Error getting patients', details: error.message });
    }
};

const getPatientByDni = async (req, res)=>{
   try {
    const patient = await patientService.getPatientByDni(req.params.dni);
    res.status(200).json(patient);
   } catch (error) {
    res.status(500).json({ error: 'Error getting patient by Dni', details: error.message });
   }
}


const createPatient = async (req, res) => {
    try {
        await patientService.createPatient(req.body);
        res.status(200).json("Patient created successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error creating patient'});
    }
}

const updatePatient = async (req, res) => {}

const deletePatient = async (req, res) => {
    try {
        const patient = await patientService.deletePatient(req.params.dni);
        res.status(200).json("Patient deleted successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error deleting patient'});
    }
}


module.exports = { getPatients, getPatientByDni,createPatient, updatePatient,deletePatient};