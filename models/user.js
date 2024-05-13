const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bornDate: {
    type: Date,
    required: [true, "Born date is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE","DOCTOR_ROLE","PATIENT_ROLE"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
});


userSchema.methods.toJSON = function () {
  const { __v, password,dni, ...user } = this.toObject();
  user.uid=dni;
  return user;
};

module.exports = model("User", userSchema);
