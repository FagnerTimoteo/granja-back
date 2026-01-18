import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAll(req, res) {
  // Suporte a histórico: ?limit=10&skip=0
  const limit = Number(req.query.limit) || 1;
  const skip = Number(req.query.skip) || 0;
  const sensors = await prisma.sensors.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: skip,
  });

  if (limit === 1) return res.json(sensors[0] || {});
  return res.json(sensors);
}

export async function createReading(req, res) {
  const { temperature, humidity, luminosity, rationWeight, waterLevel } =
    req.body;
  if (
    temperature === undefined ||
    humidity === undefined ||
    luminosity === undefined ||
    rationWeight === undefined ||
    waterLevel === undefined
  ) {
    return res.status(400).json({ message: 'faltam campos obrigatórios' });
  }
  const sensors = await prisma.sensors.create({
    data: {
      temperature,
      humidity,
      luminosity,
      rationWeight,
      waterLevel,
    },
  });
  return res.status(201).json(sensors);
}
