import Config from "../models/Config.js";
import mqttClient from "../mqtt/client.js";

export async function getConfig(req, res) {
  const config = await Config.findOne();
  return res.json(config);
}

export async function updateConfig(req, res) {
  const data = req.body;

  const config = await Config.findOneAndUpdate(
    {},
    data,
    { new: true, upsert: true }
  );

  // envia configuração para o ESP32
  mqttClient.publish(
    "granja/config",
    JSON.stringify(config)
  );

  return res.json(config);
}
