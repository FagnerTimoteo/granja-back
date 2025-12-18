// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "invalid token" });
  }
}
