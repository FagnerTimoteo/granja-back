import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ["auto", "manual"],
      default: "auto",
      required: true
    },

    lighting: {
      enabled: { type: Boolean, default: false },
      schedule: {
        on: { type: String },   // "HH:mm"
        off: { type: String }   // "HH:mm"
      }
    },

    fan: {
      enabled: { type: Boolean, default: false },
      temperature: {
        on: { type: Number },
        off: { type: Number }
      }
    },

    feeder: {
      enabled: { type: Boolean, default: false },
      weight: {
        min: { type: Number },
        max: { type: Number }
      }
    },

    waterPump: {
      enabled: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Config", ConfigSchema);
