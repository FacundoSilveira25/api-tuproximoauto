import jwt from 'jsonwebtoken';

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  // Comparamos con las credenciales exactas del .env
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    
    // Si es correcto, fabricamos un pase VIP (Token) que dura 8 horas
    const token = jwt.sign(
      { id: 'admin', rol: 'super_admin' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '8h' }
    );

    res.json({ 
      message: 'Autenticación exitosa', 
      token: token 
    });
  } else {
    // Si le erró al usuario o contraseña
    console.warn('Intento de login fallido. Credenciales incorrectas.');
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};