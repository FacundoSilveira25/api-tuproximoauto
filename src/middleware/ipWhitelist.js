require('dotenv').config();

const ipWhitelist = (req, res, next) => {
    // req.ip ahora contendrá tu IP pública gracias al 'trust proxy'
    const clientIp = req.ip; 
    
    // Obtenemos las IPs permitidas del .env y las convertimos en un array
    const allowedIps = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [];

    // Verificamos si la IP del cliente está en la lista blanca
    if (allowedIps.includes(clientIp)) {
        next(); // La IP es correcta, dejamos que pase al controlador de login
    } else {
        console.warn(`Intento de acceso bloqueado desde la IP: ${clientIp}`);
        // Devolvemos un 403 Forbidden para que el frontend sepa que fue bloqueado por red
        return res.status(403).json({ 
            error: 'Acceso denegado. Red no autorizada.' 
        });
    }
};

module.exports = ipWhitelist;