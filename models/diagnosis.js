const { Schema, model } = require("mongoose");

const diagnosisSchema = new Schema({


  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
    medicalHistory: {
        type: Schema.Types.ObjectId,
        ref: "MedicalHistory",
        required: true,
    },
  syndrome_diagnosis:[{
    type: String,
    required: true,
  }],

  presumptive_diagnosis: [{
    type: String,
    required: true,
  }],
  final_diagnosis: [{
    type: String,
    required: true,
  }],
  
  cod_cie10: {
    type: String,
    required: true,
  },
});



module.exports = model("Diagnosis", diagnosisSchema);