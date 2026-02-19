import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payments';
import refundRoutes from './routes/refunds';
import customerRoutes from './routes/customers';
import webhookRoutes from './routes/webhooks';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'PostFinancial Payments API',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/refunds', refundRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/webhooks', webhookRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Only start server if not running in Lambda
if (process.env.AWS_EXECUTION_ENV === undefined) {
  app.listen(PORT, () => {
    console.log(`🚀 PostFinancial Payments API running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  });
}

export default app;