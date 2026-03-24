import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { customers, payments } from '../data/store';
import { Customer } from '../types';

const router = Router();

// GET /api/v1/customers - List all customers
router.get('/', (req: Request, res: Response) => {
  const { email, limit = '20', offset = '0' } = req.query;
  
  let filteredCustomers = Array.from(customers.values());
  
  // Filter by email (partial match)
  if (email) {
    filteredCustomers = filteredCustomers.filter(c => 
      c.email.toLowerCase().includes((email as string).toLowerCase())
    );
  }
  
  // Pagination
  const limitNum = parseInt(limit as string);
  const offsetNum = parseInt(offset as string);
  const paginatedCustomers = filteredCustomers.slice(offsetNum, offsetNum + limitNum);
  
  res.json({
    data: paginatedCustomers,
    total: filteredCustomers.length,
    limit: limitNum,
    offset: offsetNum
  });
});

// GET /api/v1/customers/:id - Get customer by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = customers.get(id);
  
  if (!customer) {
    return res.status(404).json({
      error: 'Customer not found',
      message: `Customer with ID ${id} does not exist`
    });
  }
  
  res.json(customer);
});

// POST /api/v1/customers - Create a new customer
router.post('/', (req: Request, res: Response) => {
  const { email, name, phone, address } = req.body;
  
  // Validation
  if (!email || !name) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Missing required fields: email, name'
    });
  }
  
  // Check if email already exists
  const existingCustomer = Array.from(customers.values()).find(c => c.email === email);
  if (existingCustomer) {
    return res.status(409).json({
      error: 'Customer already exists',
      message: `Customer with email ${email} already exists`
    });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }
  
  // Create customer
  const customer: Customer = {
    id: `cust_${uuidv4().substring(0, 8)}`,
    email,
    name,
    phone,
    address,
    createdAt: new Date(),
    totalSpent: 0
  };
  
  customers.set(customer.id, customer);
  
  res.status(201).json(customer);
});

// PUT /api/v1/customers/:id - Update customer
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = customers.get(id);
  
  if (!customer) {
    return res.status(404).json({
      error: 'Customer not found'
    });
  }
  
  // Update fields
  const { name, phone, address } = req.body;
  
  if (name) customer.name = name;
  if (phone !== undefined) customer.phone = phone;
  if (address) customer.address = address;
  
  res.json(customer);
});

// DELETE /api/v1/customers/:id - Delete customer
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = customers.get(id);
  
  if (!customer) {
    return res.status(404).json({
      error: 'Customer not found'
    });
  }
  
  // Check if customer has any payments
  const customerPayments = Array.from(payments.values()).filter(p => p.customerId === id);
  if (customerPayments.length > 0) {
    return res.status(400).json({
      error: 'Cannot delete customer',
      message: 'Customer has existing payments. Please cancel or refund all payments first.'
    });
  }
  
  customers.delete(id);
  
  res.status(204).send();
});

// GET /api/v1/customers/:id/payments - Get all payments for a customer
router.get('/:id/payments', (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = customers.get(id);
  
  if (!customer) {
    return res.status(404).json({
      error: 'Customer not found'
    });
  }
  
  const customerPayments = Array.from(payments.values()).filter(p => p.customerId === id);
  
  res.json({
    customerId: id,
    payments: customerPayments,
    total: customerPayments.length,
    totalAmount: customerPayments.reduce((sum, p) => sum + p.amount, 0)
  });
});

export default router;
