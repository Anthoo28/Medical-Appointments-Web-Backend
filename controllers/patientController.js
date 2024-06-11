const PatientService = require('../services/patientService');
const UserService = require('../services/userService'); 
const patientService = new PatientService();
const userService = new UserService();

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


async function createPatient(req, res) {
    try {
        const newPatient = await patientService.createPatient(req.body);
        return res.status(201).json(newPatient);
    } catch (error) {
        console.error('Error creating patient:', error);
        if (error.message.includes('DNI already registered')) {
            return res.status(400).json({ error: 'DNI already registered', details: error.message });
        }
        return res.status(500).json({ error: 'Error creating patient', details: error.message });
    }
}

const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await patientService.updatePatient(req.params.dni, req.body);
        return res.status(200).json(updatedPatient);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating patient', details: error.message });
    }
}

const deletePatient = async (req, res) => {
    try {
        const patient = await patientService.deletePatient(req.params.dni);
        res.status(200).json("Patient deleted successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error deleting patient'});
    }
}


module.exports = { getPatients, getPatientByDni,createPatient, updatePatient,deletePatient};