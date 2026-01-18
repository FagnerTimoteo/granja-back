import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createDevice(req, res) {
  const { name, type, status } = req.body;
  if (!name || !type || !status) {
    return res
      .status(400)
      .json({ message: 'Nome, tipo e status do device são obrigatórios' });
  }
  const device = await prisma.device.create({ data: { name, type, status } });
  return res.status(201).json(device);
}

export async function listDevices(req, res) {
  const devices = await prisma.device.findMany();
  return res.json(devices);
}

export async function getDeviceById(req, res) {
  const { id } = req.params;
  const device = await prisma.device.findUnique({ where: { id: Number(id) } });
  if (!device) {
    return res.status(404).json({ message: 'Device não encontrado' });
  }
  return res.json(device);
}

export async function updateDevice(req, res) {
  const { id } = req.params;
  const { name, type, status } = req.body;
  const device = await prisma.device.update({
    where: { id: Number(id) },
    data: { name, type, status },
  });
  if (!device) {
    return res.status(404).json({ message: 'Device não encontrado' });
  }
  return res.json(device);
}

export async function deleteDevice(req, res) {
  const { id } = req.params;
  const device = await prisma.device.delete({ where: { id: Number(id) } });
  if (!device) {
    return res.status(404).json({ message: 'Device não encontrado' });
  }
  return res.json({ message: 'Device removido com sucesso' });
}
