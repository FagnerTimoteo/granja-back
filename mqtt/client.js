import mqtt from 'mqtt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const client = mqtt.connect(process.env.MQTT_URL);

let lastSaveTime = 0;
let lastSensorData = null;
let saveIntervalSeconds = 5; 

async function loadSaveInterval() {
  try {
    const config = await prisma.config.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    if (config && config.saveInterval) {
      saveIntervalSeconds = config.saveInterval;
      console.log(`Intervalo de salvamento configurado: ${saveIntervalSeconds}s`);
    }
  } catch (err) {
    console.error('Erro ao carregar intervalo de salvamento:', err.message);
  }
}

async function saveSensorData(data) {
  try {
    await prisma.sensors.create({
      data: {
        temperature: data.temperature,
        humidity: data.humidity,
        luminosity: data.luminosity,
        rationWeight: data.rationWeight,
        waterLevel: data.waterLevel,
      },
    });
    lastSaveTime = Date.now();
    console.log('Dados salvos no banco:', new Date().toISOString());
  } catch (err) {
    console.error('Erro ao salvar dados:', err.message);
  }
}

client.on('connect', async () => {
  console.log('MQTT conectado');
  client.subscribe('granja/sensors');
  await loadSaveInterval();
});

client.on('message', async (topic, message) => {
  try {
    const raw = message.toString().trim();
    console.log('MQTT raw:', raw);

    const clean =
      raw.startsWith("'") && raw.endsWith("'") ? raw.slice(1, -1) : raw;

    const data = JSON.parse(clean);
    

    lastSensorData = data;

    const now = Date.now();
    const timeSinceLastSave = (now - lastSaveTime) / 1000; // em segundos

    if (timeSinceLastSave >= saveIntervalSeconds) {

      await saveSensorData(data);
    }
  } catch (err) {
    console.error('Erro MQTT:', err.message);
  }
});

export function updateSaveInterval(intervalSeconds) {
  if (intervalSeconds > 0) {
    saveIntervalSeconds = intervalSeconds;
    console.log(`Intervalo de salvamento atualizado: ${saveIntervalSeconds}s`);
    
    const now = Date.now();
    const timeSinceLastSave = (now - lastSaveTime) / 1000;
    
    if (lastSensorData && timeSinceLastSave >= saveIntervalSeconds) {
      saveSensorData(lastSensorData);
    }
  }
}

export function getSaveInterval() {
  return saveIntervalSeconds;
}

export default client;
