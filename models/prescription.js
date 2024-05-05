const { Schema, model } = require("mongoose");

const prescriptionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  user: {
    type: Schema.Types.ObjectId(),
    ref: "User",
    required: true,
  },
  patient:{
    type: Schema.Types.ObjectId(),
    ref:'Patient'
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId(),
    ref: "Doctor",
    required: true,
  },

  appointment: {
    type: Schema.Types.ObjectId(),
    ref: "Appointment",
    required: true,
  }
  

});

prescriptionSchema.methods.toJSON = function () {
  const { __v, ...prescription } = this.toObject();
  return prescription;
};


module.exports = model("Prescription", prescriptionSchema);
