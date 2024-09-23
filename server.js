// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Veritabanı bağlantısı
const errorHandler = require('./middlewares/errorHandler'); // Hata yönetimi
const authMiddleware = require('./middlewares/authMiddleware'); // Kimlik doğrulama middleware'i

// Rota dosyaları
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Çevre değişkenlerini yükle
dotenv.config();

// Veritabanı bağlantısını başlat
connectDB();

// Uygulama oluşturma
const app = express();

// Orta katmanlar
app.use(cors());
app.use(express.json());

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handler middleware
app.use(errorHandler);

// Sunucu Başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
