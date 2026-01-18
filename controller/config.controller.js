import { PrismaClient } from '@prisma/client';
import mqttClient from '../mqtt/client.js';
const prisma = new PrismaClient();

export async function getConfig(req, res) {
  const config = await prisma.config.findMany({
    orderBy: { createdAt: 'desc' },
    take: 1,
  });
  return res.json(config[0] || {});
}

export async function updateConfig(req, res) {
  const data = req.body;

  const config = await prisma.config.upsert({
    where: { id: 1 },
    update: data,
    create: { ...data },
  });

  // envia configuração para o ESP32
  mqttClient.publish('granja/config', JSON.stringify(config));

  return res.json(config);
}
