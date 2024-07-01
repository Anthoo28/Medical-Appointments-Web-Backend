const { Schema, model } = require("mongoose");
const { prescriptionDetailSchema } = require("../models/prescriptionDetail");

const prescriptionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status:{
    type:Boolean,
    default:true
  },
  doctor: {
    type: String,
    required:true,
    required: true,
  },

  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  prescriptionDetails: [prescriptionDetailSchema],
  
});


prescriptionSchema.methods.toJSON = function () {
  const { __v, ...prescription } = this.toObject();
  return prescription;
};


module.exports = model("Prescription", prescriptionSchema);
