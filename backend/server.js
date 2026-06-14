const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('./src/middlewares/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const { loadConfig } = require('./src/config');
const xss = require('xss-clean');
const { sanitizeBody } = require('./src/middlewares/sanitizeMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');
const lessonRoutes = require('./src/routes/lessonRoutes');
const quizRoutes = require('./src/routes/quizRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const certificateRoutes = require('./src/routes/certificateRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const videoRoutes = require('./src/routes/videoRoutes');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { authMiddleware } = require('./src/middlewares/authMiddleware');
const path = require('path');

loadConfig();

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit);
app.use(xss());
app.use(sanitizeBody);
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/modules', authMiddleware, moduleRoutes);
app.use('/api/lessons', authMiddleware, lessonRoutes);
app.use('/api/quizzes', authMiddleware, quizRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/certificates', authMiddleware, certificateRoutes);
app.use('/api/ai', authMiddleware, aiRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/notifications', authMiddleware, require('./src/routes/notificationRoutes'));

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`EduPrime API running on port ${port}`);
});
