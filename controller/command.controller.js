import { PrismaClient } from '@prisma/client';
import mqttClient from '../mqtt/client.js';
const prisma = new PrismaClient();

export async function sendDeviceCommand(req, res) {
  const { id } = req.params;
  const userId = req.userId;
  const { actuator, state } = req.body;

  if (!actuator || !state) {
    return res
      .status(400)
      .json({ message: 'Atuador e estado (ON/OFF) são obrigatórios' });
  }

  try {
    const payload = JSON.stringify({
      actuator: actuator, // "fan", "light", "pump"
      state: state, // "ON", "OFF"
    });

    mqttClient.publish('granja/manual', payload);

    console.log(`Comando manual enviado: ${actuator} -> ${state}`);

    try {
      await prisma.action.create({
        data: {
          userId, // ID do usuário se fornecido
          system: actuator,
          action: state,
          quantity: null,
        },
      });
    } catch (err) {
      console.warn('Erro ao registrar ação:', err.message);
    }

    return res.status(202).json({
      message: `Comando ${state} enviado para ${actuator}`,
    });
  } catch (error) {
    console.error('Erro ao enviar comando:', error);
    return res
      .status(500)
      .json({ message: 'Erro interno ao processar comando' });
  }
}
