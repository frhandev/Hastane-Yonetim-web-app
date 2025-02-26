const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  availableTimes: [{ type: String }], // Example: ["10:00 AM", "2:00 PM"]
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
