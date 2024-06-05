const Patient = require('../models/patient');
const PatientDto = require('../dto/patient');

class PatientService {
    constructor() {}

    async getAllPatients() {
        try {
            const patients = await Patient.find({ status: true });
            return patients.map(patient => new PatientDto(patient));
        } catch (error) {
            throw new Error('Error getting patients');
        }
    }

    async getPatientByDni(dni){
        try {
            const patient = await Patient.findOne({dni:dni, status: true});
            if(!patient){
                throw new Error('Patient not found');
            }
            return new PatientDto(patient);
        } catch (error) {
            throw new Error('Error getting patient by dni');
        }
    }

    async createPatient(patientData){
        try {
            const patient = new Patient(patientData);
            await patient.save();
            return new PatientDto(patient);
        } catch (error) {
            
        }
    }
    
    async updatePatient(dni, patientData){}

    async deletePatient(dni){
      try {
        const patient = await Patient.findOne({dni:dni, status: true});
        if(!patient){
            throw new Error('Patient not found');
        }
        patient.status= false;
        await patient.save();
        return new PatientDto(patient);
      } catch (error) {
        throw new Error('Error deleting patient');
      }

    }
}

module.exports = PatientService;
