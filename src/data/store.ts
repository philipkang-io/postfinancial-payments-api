import { Payment, Refund, Customer, PaymentStatus } from '../types';

// In-memory storage (simulating a database)
export const payments: Map<string, Payment> = new Map();
export const refunds: Map<string, Refund> = new Map();
export const customers: Map<string, Customer> = new Map();

// Seed some initial data
export function seedData() {
  // Create some sample customers
  const customer1: Customer = {
    id: 'cust_001',
    email: 'john.doe@example.com',
    name: 'John Doe',
    phone: '+1-555-0123',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'US'
    },
    createdAt: new Date('2023-01-15'),
    totalSpent: 1250.00
  };

  const customer2: Customer = {
    id: 'cust_002',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    createdAt: new Date('2023-03-20'),
    totalSpent: 500.00
  };

  customers.set(customer1.id, customer1);
  customers.set(customer2.id, customer2);

  // Create some sample payments
  const payment1: Payment = {
    id: 'pay_001',
    customerId: 'cust_001',
    amount: 99.99,
    currency: 'USD',
    status: PaymentStatus.COMPLETED,
    method: 'credit_card' as any,
    description: 'Monthly subscription',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  };

  const payment2: Payment = {
    id: 'pay_002',
    customerId: 'cust_002',
    amount: 249.50,
    currency: 'USD',
    status: PaymentStatus.PENDING,
    method: 'bank_transfer' as any,
    description: 'Product purchase',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  };

  payments.set(payment1.id, payment1);
  payments.set(payment2.id, payment2);
}

// Initialize seed data
seedData();
