import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { refunds, payments } from '../data/store';
import { Refund, RefundStatus, PaymentStatus } from '../types';

const router = Router();

// GET /api/v1/refunds - List all refunds
router.get('/', (req: Request, res: Response) => {
  const { paymentId, status } = req.query;
  
  let filteredRefunds = Array.from(refunds.values());
  
  if (paymentId) {
    filteredRefunds = filteredRefunds.filter(r => r.paymentId === paymentId);
  }
  
  if (status) {
    filteredRefunds = filteredRefunds.filter(r => r.status === status);
  }
  
  res.json({
    data: filteredRefunds,
    total: filteredRefunds.length
  });
});

// GET /api/v1/refunds/:id - Get refund by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const refund = refunds.get(id);
  
  if (!refund) {
    return res.status(404).json({
      error: 'Refund not found',
      message: `Refund with ID ${id} does not exist`
    });
  }
  
  res.json(refund);
});

// POST /api/v1/refunds - Create a refund request
router.post('/', (req: Request, res: Response) => {
  const { paymentId, amount, reason } = req.body;
  
  // Validation
  if (!paymentId || !amount || !reason) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Missing required fields: paymentId, amount, reason'
    });
  }
  
  // Check if payment exists
  const payment = payments.get(paymentId);
  if (!payment) {
    return res.status(404).json({
      error: 'Payment not found',
      message: `Payment with ID ${paymentId} does not exist`
    });
  }
  
  // Validate payment status
  if (payment.status !== PaymentStatus.COMPLETED) {
    return res.status(400).json({
      error: 'Invalid payment status',
      message: 'Can only refund completed payments'
    });
  }
  
  // Validate refund amount
  if (amount <= 0 || amount > payment.amount) {
    return res.status(400).json({
      error: 'Invalid refund amount',
      message: `Refund amount must be between 0 and ${payment.amount}`
    });
  }
  
  // Create refund
  const refund: Refund = {
    id: `ref_${uuidv4().substring(0, 8)}`,
    paymentId,
    amount,
    reason,
    status: RefundStatus.PENDING,
    createdAt: new Date()
  };
  
  refunds.set(refund.id, refund);
  
  res.status(201).json(refund);
});

// PUT /api/v1/refunds/:id/approve - Approve a refund
router.put('/:id/approve', (req: Request, res: Response) => {
  const { id } = req.params;
  const refund = refunds.get(id);
  
  if (!refund) {
    return res.status(404).json({
      error: 'Refund not found'
    });
  }
  
  if (refund.status !== RefundStatus.PENDING) {
    return res.status(400).json({
      error: 'Invalid operation',
      message: `Cannot approve refund with status: ${refund.status}`
    });
  }
  
  refund.status = RefundStatus.APPROVED;
  refund.processedAt = new Date();
  
  res.json(refund);
});

// PUT /api/v1/refunds/:id/reject - Reject a refund
router.put('/:id/reject', (req: Request, res: Response) => {
  const { id } = req.params;
  const refund = refunds.get(id);
  
  if (!refund) {
    return res.status(404).json({
      error: 'Refund not found'
    });
  }
  
  if (refund.status !== RefundStatus.PENDING) {
    return res.status(400).json({
      error: 'Invalid operation',
      message: `Cannot reject refund with status: ${refund.status}`
    });
  }
  
  refund.status = RefundStatus.REJECTED;
  refund.processedAt = new Date();
  
  res.json(refund);
});

export default router;
