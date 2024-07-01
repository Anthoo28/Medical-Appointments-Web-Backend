const { Schema, model } = require("mongoose");

const prescriptionDetailSchema = new Schema({
  medicine: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

prescriptionDetailSchema.methods.toJSON = function () {
  const { __v, ...prescriptionDetail } = this.toObject();
  return prescriptionDetail;

}

module.exports = { prescriptionDetailSchema };