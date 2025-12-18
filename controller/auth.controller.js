import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import {jwtConfig} from "../config/jwt.js"

export async function register(req, res) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({message: "faltam campos"})
    }

    const exists = await User.findOne({ email })
    if (exists) {
        return res.status(409).json({message: "usuário já existente"})
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hash
    })

    return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email
    })
}

export async function login(req, res) {
    const {email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: "email ou senha invalidos" });
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(401).json({ message: "email ou senha invalidos" });
    }

    const token = jwt.sign(
        { id: user._id },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    )

    return res.json({ token });
}

export async function me(req, res) {
    const user = await User.findById(req.userId).select("-password")
    return res.json(user);
}