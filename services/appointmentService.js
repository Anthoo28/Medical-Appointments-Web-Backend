const AppointmentDto = require('../dto/appointmentDto');
const { enviarCorreo } = require('../helpers/send-email/nodemailer');
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

    async getAppointmentById(dni) {
        try {
            const appointments = await Appointment.find({ user: dni });
            if (!appointments) {
                throw new Error('Appointment not found');
            }
            return appointments.map(appointment => new AppointmentDto(appointment));
        } catch (error) {
            throw new Error('Error getting appointment by id');
        }
    }

    async getAppointmentByIdDcotor(dni) {
        try {
            const appointments = await Appointment.find({ doctor: dni });
            if (!appointments) {
                throw new Error('Appointment not found');
            }
            return appointments.map(appointment => new AppointmentDto(appointment));
        } catch (error) {
            throw new Error('Error getting appointment by id');
        }
    }


    async createAppointment(appointmentData) {
        try {
            // Convertir la cadena de fecha en un objeto Date
            const appointmentDate = new Date(appointmentData.date);

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
            const isAvailableForDoctor = await doctorService.isTimeAvailableForDoctor(doctor.dni, appointmentData.date, appointmentData.time);
            if (!isAvailableForDoctor) {
                throw new Error('Selected time is not available for the doctor');
            }

            // Verificar si ya existe una cita para el mismo usuario, médico, fecha y hora
            const existingAppointment = await Appointment.findOne({
                user: appointmentData.user,
                doctor: doctor.dni,
                date: appointmentDate,
                time: appointmentData.time
            });
            if (existingAppointment) {
                throw new Error('Appointment already exists');
            }

           
            // Crear la cita con el DNI del médico
            const appointment = new Appointment({
                ...appointmentData,
                date: appointmentDate, // Utilizar el objeto Date para la fecha
                doctor: doctor.dni,
                user: appointmentData.user // Add the user property to the appointment
            });

             // Obtener el correo electrónico del usuario por su DNI
             const userService = new UserService();
             const userEmail = await userService.getUserEmail(appointmentData.user);
             console.log(userEmail);
                // Enviar correo de confirmación utilizando el correo electrónico del usuario
            enviarCorreo(userEmail, appointment);

            await appointment.save();

            // Enviar correo de confirmación utilizando solo el correo electrónico del usuario
            

            // Reservar el tiempo para el médico
            await doctorService.reserveTimeForDoctor(doctor.dni, appointmentData.date, appointmentData.time);

            return new AppointmentDto(appointment);
            
        } catch (error) {
            throw new Error(`Error creating appointment: ${error.message}`);
        }
    }
    async deleteAppointment(id) {
        try {
            const appointment = await Appointment.findOne({ _id: id });
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
