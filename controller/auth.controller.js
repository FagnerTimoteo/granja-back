import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function register(req, res) {
  const { name, email, password, address, birthDate, rg, cpfCnpj, phone } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !address ||
    !birthDate ||
    !rg ||
    !cpfCnpj ||
    !phone
  ) {
    return res.status(400).json({ message: 'faltam campos obrigatórios' });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return res.status(409).json({ message: 'usuário já existente' });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      address,
      birthDate: new Date(birthDate),
      rg,
      cpfCnpj,
      phone,
    },
  });

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'email ou senha inválidos' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'email ou senha inválidos' });
  }

  const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  return res.json({ token });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      birthDate: true,
      rg: true,
      cpfCnpj: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.json(user);
}
