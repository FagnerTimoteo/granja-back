import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema(
  {
    name: {type: String,required: true},
    online: {type: Boolean,default: false},
    lastSeen: {type: Date,default: null}
  },
  { timestamps: true }
);

export default mongoose.model("Device", DeviceSchema);