import Sensors from "../models/Sensors";

export async function getAll(req, res) {
  const sensors = await Sensors.findOne().sort({ createdAt: -1 });
  return res.json(sensors);
}
