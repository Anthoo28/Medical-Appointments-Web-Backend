class PrescriptionDto {
    constructor(prescription) {
      this.id = prescription._id; 
      this.date = prescription.date || new Date();
      this.doctor = prescription.doctor;
      this.appointment = prescription.appointment;
      this.prescriptionDetails = prescription.prescriptionDetails.map(detail => ({
        medicine: detail.medicine,
        dosage: detail.dosage,
        frequency: detail.frequency,
        duration: detail.duration,
      }));
    }
  }
  
  module.exports = PrescriptionDto;