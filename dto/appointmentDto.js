class AppointmentDto{
    constructor(appointment){
        this.id= appointment.id;
        this.reason= appointment.reason;
        this.date= appointment.date;
        this.time= appointment.time;
        this.user= appointment.user;
        this.patient= appointment.patient;
        this.doctor= appointment.doctor;
        this.status= appointment.status;
    }
}

module.exports = AppointmentDto;