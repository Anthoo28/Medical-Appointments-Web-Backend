const AppointmentService = require('../services/appointmentService');
const appointmentService = new AppointmentService();

const getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentService.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error getting appointments', details: error.message });
    }
}

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await appointmentService.getAppointmentById(req.params.id);
        res.status(200).json(appointment);   
    } catch (error) {
        res.status(500).json({ error: 'Error getting appointment by ID', details: error.message });
    }
}

const createAppointment = async (req, res) => {
    try {
        const appointmentData = req.body;
        const appointment = await appointmentService.createAppointment(appointmentData);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating appointment', details: error.message });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const deletedAppointment = await appointmentService.deleteAppointment(appointmentId);
        res.status(200).json(deletedAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting appointment', details: error.message });
    }
}

module.exports = { getAppointments, getAppointmentById, createAppointment, deleteAppointment };
