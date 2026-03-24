import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { payments, customers } from '../data/store';
import { Payment, PaymentIntent, PaymentStatus, PaymentMethod } from '../types';

const router = Router();

// GET /api/v1/payments - List all payments
router.get('/', (req: Request, res: Response) => {
  const { status, customerId, limit = '10', offset = '0' } = req.query;
  
  let filteredPayments = Array.from(payments.values());
  
  // Filter by status
  if (status) {
    filteredPayments = filteredPayments.filter(p => p.status === status);
  }
  
  // Filter by customer ID
  if (customerId) {
    filteredPayments = filteredPayments.filter(p => p.customerId === customerId);
  }
  
  // Pagination
  const limitNum = parseInt(limit as string);
  const offsetNum = parseInt(offset as string);
  const paginatedPayments = filteredPayments.slice(offsetNum, offsetNum + limitNum);
  
  res.json({
    data: paginatedPayments,
    total: filteredPayments.length,
    limit: limitNum,
    offset: offsetNum
  });
});

// GET /api/v1/payments/:id - Get payment by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = payments.get(id);
  
  if (!payment) {
    return res.status(404).json({
      error: 'Payment not found',
      message: `Payment with ID ${id} does not exist`
    });
  }
  
  res.json(payment);
});

// POST /api/v1/payments - Create a new payment
router.post('/', (req: Request, res: Response) => {
  const paymentIntent: PaymentIntent = req.body;
  
  // Validation
  if (!paymentIntent.customerId || !paymentIntent.amount || !paymentIntent.currency || !paymentIntent.method) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Missing required fields: customerId, amount, currency, method'
    });
  }
  
  // Check if customer exists
  const customer = customers.get(paymentIntent.customerId);
  if (!customer) {
    return res.status(404).json({
      error: 'Customer not found',
      message: `Customer with ID ${paymentIntent.customerId} does not exist`
    });
  }
  
  // Validate amount
  if (paymentIntent.amount <= 0) {
    return res.status(400).json({
      error: 'Invalid amount',
      message: 'Payment amount must be greater than 0'
    });
  }
  
  // Validate payment method
  if (!Object.values(PaymentMethod).includes(paymentIntent.method)) {
    return res.status(400).json({
      error: 'Invalid payment method',
      message: `Payment method must be one of: ${Object.values(PaymentMethod).join(', ')}`
    });
  }
  
  // Create payment
  const payment: Payment = {
    id: `pay_${uuidv4().substring(0, 8)}`,
    customerId: paymentIntent.customerId,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: PaymentStatus.PENDING,
    method: paymentIntent.method,
    description: paymentIntent.description,
    metadata: paymentIntent.metadata,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  payments.set(payment.id, payment);
  
  res.status(201).json(payment);
});

// PUT /api/v1/payments/:id/confirm - Confirm a pending payment
router.put('/:id/confirm', (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = payments.get(id);
  
  if (!payment) {
    return res.status(404).json({
      error: 'Payment not found',
      message: `Payment with ID ${id} does not exist`
    });
  }
  
  if (payment.status !== PaymentStatus.PENDING) {
    return res.status(400).json({
      error: 'Invalid operation',
      message: `Cannot confirm payment with status: ${payment.status}`
    });
  }
  
  // Simulate payment processing
  payment.status = PaymentStatus.PROCESSING;
  payment.updatedAt = new Date();
  
  // Simulate async processing (in real world, this would be done by payment gateway)
  setTimeout(() => {
    payment.status = PaymentStatus.COMPLETED;
    payment.updatedAt = new Date();
  }, 1000);
  
  res.json(payment);
});

// PUT /api/v1/payments/:id/cancel - Cancel a pending payment
router.put('/:id/cancel', (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = payments.get(id);
  
  if (!payment) {
    return res.status(404).json({
      error: 'Payment not found',
      message: `Payment with ID ${id} does not exist`
    });
  }
  
  if (payment.status !== PaymentStatus.PENDING && payment.status !== PaymentStatus.PROCESSING) {
    return res.status(400).json({
      error: 'Invalid operation',
      message: `Cannot cancel payment with status: ${payment.status}`
    });
  }
  
  payment.status = PaymentStatus.CANCELLED;
  payment.updatedAt = new Date();
  
  res.json(payment);
});

// GET /api/v1/payments/:id/status - Get payment status (simpler endpoint)
router.get('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = payments.get(id);
  
  if (!payment) {
    return res.status(404).json({
      error: 'Payment not found'
    });
  }
  
  res.json({
    paymentId: payment.id,
    status: payment.status,
    updatedAt: payment.updatedAt
  });
});

export default router;
