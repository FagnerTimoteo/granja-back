import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createAction(req, res) {
  const { userId, system, action, quantity } = req.body;

  if (!user || !system || !action || !type) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  const newAction = await prisma.action.create({
    data: {
      userId,
      system,
      action,
      quantity,
    },
  });

  return res.status(201).json(newAction);
}

export async function listActions(req, res) {
  const { system, limit = 10, skip = 0 } = req.query;

  let where = {};
  if (system) {
    where.system = system;
  }

  const actions = await prisma.action.findMany({
    where,
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: Number(limit),
    skip: Number(skip),
  });

  return res.json(actions);
}
