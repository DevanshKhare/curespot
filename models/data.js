const mongoose = require("mongoose");
const { Schema } = mongoose;
const DataSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  hand_temperature: {
    type: String,
    required: true,
  },

  head_temperature: {
    type: String,
    required: true,
  },
  pulse: {
    type: String,
    required: true,
  },
  oxygen: {
    type: String,
    required: true,
  },
  bmi: {
    type: String,
    required: true,
  },
  bmi_scale: {
    type: String,
    required: true,
  },
  bmr: {
    type: String,
    required: true,
  },
  body_fat: {
    type: String,
    required: true,
  },
  body_fat_index: {
    type: String,
    required: true,
  },
  lean_muscle_mass: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  predicted_prognosis: {
    type: String,
    required: true,
  },
  prescription_done: {
    type: String,
  },
  medicines: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
});
const Data = mongoose.model("data", DataSchema);

module.exports = Data;
