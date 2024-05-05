const {Schema, model}= require('mongoose'); 

const patientSchema = new Schema({
    dni: {
        type: String,
        required: [true, "DNI is required"],
        unique: true,
      },
    
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      lastname: {
        type: String,
        required: [true, "Lastname is required"],
      },
    
      bornDate: {
        type: Date,
        required: [true, "Born date is required"],
      },

      phone: {
        type: String,
        required: [true, "Phone is required"],
      },
      gender: {
        type: String,
        required: true,
        enum: ["M", "F"],
      },
      img:{
        type: String,
      },
      role: {
        type: String,
        required: true,
        default: "PATIENT_ROLE",
        enum: ["ADMIN_ROLE", "USER_ROLE","DOCTOR_ROLE","PATIENT_ROLE"],
      },
      status: {
        type: Boolean,
        default: false,
      },

});


patientSchema.methods.toJSON = function(){
    const{__v,status,dni, ...patient}=this.toObject();
    patient.uid=dni;
    return patient;

}


moduele.export= model('Patient',patientSchema);