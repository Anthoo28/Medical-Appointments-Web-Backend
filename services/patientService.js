const Patient = require('../models/patient');
const PatientDto = require('../dto/patient');
const User = require('../models/user');

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
            // Verificar si el DNI ya está registrado como usuario
            const existingUser = await User.findOne({ dni: patientData.dni });
            if (existingUser) {
                throw new Error('DNI already registered as user');
            } 
            // Si no hay un usuario con el mismo DNI, crear el paciente
            const patient = new Patient(patientData);
            await patient.save();
            return new PatientDto(patient);
        } catch (error) {
            // Manejar el error
            console.error('Error creating patient:', error);
            throw new Error('Error creating patient: ' + error.message);
        }
    }
    
    async updatePatient(dni, patientData) {
        try {
            // Buscar al paciente por su DNI
            const patient = await Patient.findOneAndUpdate({ dni: dni, status: true }, patientData, { new: true });
            if (!patient) {
                throw new Error('Patient not found');
            }
    
            // Guardar los cambios en la base de datos
            await patient.save();
    
            // Devolver al paciente actualizado como un DTO
            return new PatientDto(patient);
        } catch (error) {
            throw new Error('Error updating patient: ' + error.message);
        }
    }
    

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
