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

    async updateDoctor(dni, doctorData) {
        try {
            // Buscar el doctor por su DNI
            const doctor = await Doctor.findOne({ dni: dni, status: true });
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            
            // Actualizar los campos del doctor con los datos proporcionados
            Object.assign(doctor, doctorData);
            
            // Si se proporcionó una nueva contraseña, hashearla antes de guardarla
            if (doctorData.password) {
                const salt = bcrypt.genSaltSync();
                doctor.password = bcrypt.hashSync(doctorData.password, salt);
            }
            
            // Guardar los cambios en la base de datos
            await doctor.save();
            
            // Devolver el doctor actualizado como un DTO
            return new DoctorDto(doctor);
        } catch (error) {
            throw new Error('Error updating doctor');
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
    async isTimeAvailableForDoctor(dni, date, time) {
        try {
            const doctor = await Doctor.findOne({ dni: dni });
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            // Verificar si el día y el tiempo están incluidos en los horarios ocupados del médico
            return !doctor.busyTimes.some(appointment => appointment.date === date && appointment.time === time);
        } catch (error) {
            throw new Error(`Error checking availability: ${error.message}`);
        }
    }
    
    async reserveTimeForDoctor(dni, date, time) {
        try {
            const doctor = await Doctor.findOne({ dni: dni });
            if (!doctor) {
                throw new Error('Doctor not found');
            }
    
            // Verificar si el día y el tiempo ya están reservados antes de agregarlos
            const existingAppointment = doctor.busyTimes.find(appointment => appointment.date.toString() === date.toString() && appointment.time === time);
            if (!existingAppointment) {
                // Convertir la cadena de fecha en un objeto Date
                const dateObject = new Date(date);
                // Actualizar el médico con el nuevo horario ocupado
                doctor.busyTimes.push({ date: dateObject, time });
                await doctor.save(); // Guardar los cambios en el doctor
            }
        } catch (error) {
            throw new Error(`Error reserving time: ${error.message}`);
        }
    }
    
    
    
    
    
    
    
}

module.exports = DoctorService;
