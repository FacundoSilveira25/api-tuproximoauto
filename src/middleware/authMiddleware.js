import jwt from 'jsonwebtoken';

// 1. EL PATOVICA DE LAS IPs
export const ipWhitelist = (req, res, next) => {
  // Obtenemos la IP de quien hace la petición
  const clientIP = req.ip || req.connection.remoteAddress;
  
  // Leemos las IPs permitidas desde el .env
  const allowedIPs = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : ['::1', '127.0.0.1'];

  // Si la IP no está en la lista, lo pateamos
  if (!allowedIPs.includes(clientIP)) {
    console.warn(`🚨 Intento de acceso denegado desde IP no autorizada: ${clientIP}`);
    return res.status(403).json({ message: 'Acceso de red denegado.' });
  }

  next(); // Si la IP está en la lista, lo dejamos pasar al siguiente paso
};

// 2. EL PATOVICA DEL TOKEN (Comprueba si inició sesión)
export const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No hay token, permiso denegado' });
  }

  try {
    // Verificamos si el token es válido y no expiró
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
};