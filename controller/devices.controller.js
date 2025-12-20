import Devices from "../models/Devices.js";


export async function createDevice(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Nome do device é obrigatório" });
    }
    const device = await Devices.create({ name });
    return res.status(201).json(device);
}

export async function listDevices(req, res) {
    const devices = await Devices.find();
    return res.json(devices);
}

export async function getDeviceById(req, res) {
    const { id } = req.params;
    const device = await Devices.findById(id); 
    if (!device) {
        return res.status(404).json({ message: "Device não encontrado" });
    }
    return res.json(device);
}

export async function updateDevice(req, res) {
    const { id } = req.params;
    const { name, online, lastSeen } = req.body;
    
    const device = await Devices.findByIdAndUpdate(id, { name, online, lastSeen }, { new: true });
    if (!device) {
        return res.status(404).json({ message: "Device não encontrado" });
    }
    return res.json(device);
}

export async function deleteDevice(req, res) {
    const { id } = req.params;
    const device = await Devices.findByIdAndDelete(id);
    if (!device) {
        return res.status(404).json({ message: "Device não encontrado" });
    }
    return res.json({ message: "Device removido com sucesso" });
}
