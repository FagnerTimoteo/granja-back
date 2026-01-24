import { PrismaClient } from '@prisma/client';
import mqttClient, { updateSaveInterval } from '../mqtt/client.js';
const prisma = new PrismaClient();

export async function getConfig(req, res) {
  const config = await prisma.config.findMany({
    orderBy: { createdAt: 'desc' },
    take: 1,
  });
  return res.json(config[0] || {});
}

export async function updateConfig(req, res) {
  try {
    const data = req.body;

    let existingConfig = await prisma.config.findUnique({
      where: { id: 1 },
    });

    let config;

    if (existingConfig) {
      const updateData = {
        ...data,
        saveInterval: data.saveInterval !== undefined ? data.saveInterval : existingConfig.saveInterval,
      };

      config = await prisma.config.update({
        where: { id: 1 },
        data: updateData,
      });
    } else {
      const createData = {
        mode: data.mode || 'auto',
        lighting: data.lighting || {
          enabled: true,
          schedule: {
            on: '06:00',
            off: '18:00'
          }
        },
        fan: data.fan || {
          enabled: true,
          temperature: {
            on: 28,
            off: 24
          }
        },
        feeder: data.feeder || {
          enabled: true,
          weight: {
            min: 5,
            max: 20
          }
        },
        waterPump: data.waterPump || {
          enabled: true
        },
        saveInterval: data.saveInterval !== undefined ? data.saveInterval : 5,
      };

      config = await prisma.config.create({
        data: createData,
      });
    }

    if (data.saveInterval !== undefined) {
      updateSaveInterval(data.saveInterval);
    }

    const espConfig = { ...config };
    delete espConfig.saveInterval;
    mqttClient.publish('granja/config', JSON.stringify(espConfig));

    return res.json(config);
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    
    if (error.message && error.message.includes('saveInterval')) {
      return res.status(500).json({ 
        message: 'Campo saveInterval não existe no banco. Execute a migração: npx prisma migrate dev',
        error: error.message 
      });
    }
    
    return res.status(500).json({ message: 'Erro ao atualizar configuração', error: error.message });
  }
}
