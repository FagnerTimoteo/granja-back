import Sensors from "../models/Sensors.js";

export async function getAll(req, res) {
  const sensors = await Sensors.findOne();
  return res.json(sensors);
}