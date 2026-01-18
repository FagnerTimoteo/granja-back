import mqtt from 'mqtt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const client = mqtt.connect(process.env.MQTT_URL);

client.on('connect', () => {
  console.log('MQTT conectado');
  client.subscribe('granja/sensors');
});

client.on('message', async (topic, message) => {
  try {
    const raw = message.toString().trim();
    console.log('MQTT raw:', raw);

    const clean =
      raw.startsWith("'") && raw.endsWith("'") ? raw.slice(1, -1) : raw;

    const data = JSON.parse(clean);

    await prisma.sensors.create({
      data: {
        ...data,
        lastSeen: new Date(),
      },
    });
  } catch (err) {
    console.error('Erro MQTT:', err.message);
  }
});

export default client;
