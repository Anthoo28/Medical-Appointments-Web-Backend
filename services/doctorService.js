const DoctorDto = require("../dto/doctor");
const Doctor = require("../models/doctor");
const Specialty = require("../models/specialty");
const bcrypt = require('bcryptjs'); // Asegúrate de importar bcrypt

class DoctorService {
    constructor() {}

    async getAllDoctors() {
        try {
            const doctors = await Doctor.find({ status: true }).populate('specialty');
            return doctors.map(doctor => new DoctorDto(doctor));
        } catch (error) {
            throw new Error('Error getting doctors');
        }
    }

    async getDoctorByDni(dni) {
        try {
            const doctor = await Doctor.findOne({ dni: dni, status: true }).populate('specialty');
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            return new DoctorDto(doctor);
        } catch (error) {
            throw new Error('Error getting doctor by Dni');
        }
    }

    async createDoctor(doctorData) {
        try {
            const { password, specialty, ...rest } = doctorData;

            // Verificar que todas las especialidades existan
            const specialties = await Specialty.find({ _id: { $in: specialty } });
            if (specialties.length !== specialty.length) {
                throw new Error('One or more specialties not found');
            }

            const doctor = new Doctor({ ...rest, specialty });

            // Hash password
            const salt = bcrypt.genSaltSync();
            doctor.password = bcrypt.hashSync(password, salt);

            await doctor.save();
            return new DoctorDto(doctor);
        } catch (error) {
            throw new Error(`Error creating doctor: ${error.message}`);
        }
    }

    async deleteDoctor(dni) {
        try {
            const doctor = await Doctor.findOne({ dni: dni, status: true });
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            doctor.status = false;
            await doctor.save();
            return new DoctorDto(doctor);
        } catch (error) {
            throw new Error('Error deleting doctor');
        }
    }
}

module.exports = DoctorService;
