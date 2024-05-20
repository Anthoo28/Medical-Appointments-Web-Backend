const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  dni: {
    type: String,
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
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
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
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});


userSchema.methods.toJSON = function () {
  const { __v, password,dni,email, ...user } = this.toObject();
  user.uid=dni;
  return user;
};

module.exports = model("User", userSchema);
