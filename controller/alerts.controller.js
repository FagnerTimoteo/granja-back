import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar um novo alerta
export async function createAlert(req, res) {
  try {
    const { type, message, data } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Campo "type" é obrigatório' });
    }

    const now = new Date();

    const alert = await prisma.alert.create({
      data: {
        type,
        message: message || `Alerta: ${type}`,
        data: data || {},
        createdAt: now,
      },
    });

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Listar todos os alertas
export async function getAllAlerts(req, res) {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
