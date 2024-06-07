const AppointmentDto = require('../dto/appointmentDto');
const Appointment = require('../models/appointment');
const DoctorService = require('./doctorService');
const UserService = require('./userService');


class AppointmentService {
    constructor(doctorService) {
        this.doctorService = doctorService;
        this.availableTimes = {
            weekdays: ['09:00', '10:15', '11:30', '12:45', '14:00', '15:15', '16:30', '17:45'],
        };
    }

    async getAllAppointments() {
        try {
            const appointments = await Appointment.find();
            return appointments.map(appointment => new AppointmentDto(appointment));
        } catch (error) {
            throw new Error('Error getting appointments');
        }
    }

    async getAppointmentById(id) {
        try {
            const appointment = await Appointment.findOne({ _id: id });
            if (!appointment) {
                throw new Error('Appointment not found');
            }
            return new AppointmentDto(appointment);
        } catch (error) {
            throw new Error('Error getting appointment by id');
        }
    }
    
    
    async createAppointment(appointmentData) {
        try {
            const dateParts = appointmentData.date.split('-');
            const appointmentDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            const dayOfWeek = appointmentDate.getDay();
            const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    
            const availableTimes = isWeekday ? this.availableTimes.weekdays : this.availableTimes.weekends;
    
            const isTimeAvailable = appointmentData.time && availableTimes.includes(appointmentData.time);
            if (!isTimeAvailable) {
                throw new Error('Selected time is not available');
            }
            
    
            // Obtener el médico por DNI
            const doctorService = new DoctorService();
            const doctor = await doctorService.getDoctorByDni(appointmentData.doctor);
            if (!doctor) {
                throw new Error('Doctor not found');
            }
    
            // Verificar si el horario está disponible para el médico
            const isAvailableForDoctor = await doctorService.isTimeAvailableForDoctor(doctor.dni, appointmentData.time);
            if (!isAvailableForDoctor) {
                throw new Error('Selected time is not available for the doctor');
            }
    
            // Crear la cita con el DNI del médico
            const appointment = new Appointment({
                ...appointmentData,
                doctor: doctor.dni, // Almacenar el DNI del médico en lugar de su ID
            });
    
            await appointment.save();
    
            // Reservar el tiempo para el médico
            await doctorService.reserveTimeForDoctor(doctor.dni, appointmentData.time);
    
            return new AppointmentDto(appointment);
        } catch (error) {
            throw new Error(`Error creating appointment: ${error.message}`);
        }
    }
    
    

      
    async deleteAppointment(id) {
        try {
            const appointment = await Appointment.findOne({ id: id });
            if (!appointment) {
                throw new Error('Appointment not found');
            }
            appointment.status = false;
            await appointment.save();
            return new AppointmentDto(appointment);
        } catch (error) {
            throw new Error('Error deleting appointment');
        }
    }
}

module.exports = AppointmentService;
