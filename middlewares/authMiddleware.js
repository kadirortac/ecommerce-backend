// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Tokeni al ve doğrula
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcıyı yükle (şifreyi hariç tutarak)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Yetkisiz, token geçersiz.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Yetkisiz, token yok.');
  }
};

module.exports = authMiddleware;