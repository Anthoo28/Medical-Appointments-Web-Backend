class PatientDto {
    constructor(patient){
        this.dni= patient.dni;
        this.name= patient.name;
        this.lastname= patient.lastname;
        this.bornDate= patient.bornDate;
        this.phone= patient.phone;
        this.gender= patient.gender;
        this.img= patient.img;
        this.role= patient.role;
        this.status= patient.status;


    }



}

module.exports= PatientDto;