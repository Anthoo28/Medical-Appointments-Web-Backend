class DoctorDto {
    constructor(doctor) {
        this.dni = doctor.dni;
        this.status = doctor.status;
        this.CMP = doctor.CMP;
        this.name = doctor.name;
        this.lastname = doctor.lastname;
        this.email = doctor.email;
        this.role = doctor.role;
        this.bornDate = doctor.bornDate;
        this.img = doctor.img;
        this.phone = doctor.phone;
        this.specialty = doctor.specialty;
        this.address = doctor.address;
    }
}

module.exports = DoctorDto;
