import Action from '../models/Actions.js';

export async function createAction(req, res) {
  const { user, system, action, quantity, type } = req.body;

  if (!user || !system || !action || !type) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  const newAction = await Action.create({
    user,
    system,
    action,
    quantity,
  });

  return res.status(201).json(newAction);
}

export async function listActions(req, res) {
  const { system, limit = 10, skip = 0 } = req.query;

  let filter = {};
  if (system) {
    filter.system = system;
  }

  const actions = await Action.find(filter)
    .populate('user', 'name email')
    .limit(Number(limit))
    .skip(Number(skip))
    .sort({ createdAt: -1 });

  return res.json(actions);
}
