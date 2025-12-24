import mongoose from "mongoose";

const SensorsSchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
    luminosity: Number,
    rationWeight: Number,
    waterLevel: Number
  },
  { timestamps: true }
);

export default mongoose.model("Sensors", SensorsSchema);
