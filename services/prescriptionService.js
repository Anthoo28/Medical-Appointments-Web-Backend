const Prescription = require('../models/prescription');
const PrescriptionDto = require('../dto/prescriptionDto');

class PrescriptionService {
  constructor() {}

  async getAllPrescriptions() {
    try {
      const prescriptions = await Prescription.find({ status: true });
      return prescriptions.map(prescription => new PrescriptionDto(prescription));
    } catch (error) {
      throw new Error('Error getting prescriptions: ' + error.message);
    }
  }

  async getPrescriptionById(id) {
    try {
      const prescription = await Prescription.findById(id);
      if (!prescription || !prescription.status) {
        throw new Error('Prescription not found');
      }
      return new PrescriptionDto(prescription);
    } catch (error) {
      throw new Error('Error getting prescription by id: ' + error.message);
    }
  }

  async createPrescription(prescriptionData) {
    try {
      const prescription = new Prescription(prescriptionData);
      await prescription.save();
      return new PrescriptionDto(prescription);
    } catch (error) {
      throw new Error('Error creating Prescription: ' + error.message);
    }
  }

  async deletePrescription(id) {
    try {
      const prescription = await Prescription.findById(id);
      if (!prescription || !prescription.status) {
        throw new Error('Prescription not found');
      }
      prescription.status = false;
      await prescription.save();
      return new PrescriptionDto(prescription);
    } catch (error) {
      throw new Error('Error deleting prescription: ' + error.message);
    }
  }

async getPrescriptionsByAppointmentId(appointmentId) {
    try {
      const prescriptions = await Prescription.find({ appointment: appointmentId, status: true });
      return prescriptions.map(prescription => new PrescriptionDto(prescription));
    } catch (error) {
      throw new Error('Error getting prescriptions by appointment id: ' + error.message);
    }
  }
}

module.exports = PrescriptionService;
