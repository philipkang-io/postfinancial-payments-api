#!/usr/bin/env node

/**
 * Generate PostFinancial Payments Starter Collection
 * 
 * This script creates a minimal Postman collection with all endpoints
 * but WITHOUT tests, to be used as a starting point for Lesson 1.
 */

const fs = require('fs');
const path = require('path');

// Base collection structure
const starterCollection = {
  "info": {
    "name": "PostFinancial Payments API - Starter",
    "description": "Starter collection for PostFinancial Payments API. This collection includes all endpoints but needs comprehensive test coverage added.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_postman_id": "starter-" + Date.now(),
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Health Check",
      "item": [
        {
          "name": "Get API Health",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/health",
              "host": ["{{baseUrl}}"],
              "path": ["health"]
            },
            "description": ""
          },
          "response": []
        }
      ]
    },
    {
      "name": "Payments",
      "item": [
        {
          "name": "List Payments",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/payments?status=completed&limit=10&offset=0",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "payments"],
              "query": [
                {"key": "status", "value": "completed", "description": "Filter by payment status"},
                {"key": "limit", "value": "10", "description": "Number of results to return"},
                {"key": "offset", "value": "0", "description": "Pagination offset"}
              ]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Get Payment by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/payments/pay_001",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "payments", "pay_001"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Create Payment",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": JSON.stringify({
                "customerId": "cust_001",
                "amount": 99.99,
                "currency": "USD",
                "method": "credit_card",
                "description": "Test payment"
              }, null, 2)
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/payments",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "payments"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Confirm Payment",
          "request": {
            "method": "PUT",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/payments/pay_001/confirm",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "payments", "pay_001", "confirm"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Cancel Payment",
          "request": {
            "method": "PUT",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/payments/pay_001/cancel",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "payments", "pay_001", "cancel"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Get Payment Status",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/payments/pay_001/status",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "payments", "pay_001", "status"]
            },
            "description": ""
          },
          "response": []
        }
      ]
    },
    {
      "name": "Refunds",
      "item": [
        {
          "name": "List Refunds",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/refunds",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "refunds"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Get Refund by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/refunds/ref_001",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "refunds", "ref_001"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Create Refund",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": JSON.stringify({
                "paymentId": "pay_001",
                "amount": 99.99,
                "reason": "Customer request"
              }, null, 2)
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/refunds",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "refunds"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Approve Refund",
          "request": {
            "method": "PUT",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/refunds/ref_001/approve",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "refunds", "ref_001", "approve"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Reject Refund",
          "request": {
            "method": "PUT",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/refunds/ref_001/reject",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "refunds", "ref_001", "reject"]
            },
            "description": ""
          },
          "response": []
        }
      ]
    },
    {
      "name": "Customers",
      "item": [
        {
          "name": "List Customers",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/customers?limit=20&offset=0",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "customers"],
              "query": [
                {"key": "limit", "value": "20"},
                {"key": "offset", "value": "0"}
              ]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Get Customer by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/customers/cust_001",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "customers", "cust_001"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Create Customer",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": JSON.stringify({
                "email": "customer@example.com",
                "name": "John Doe",
                "phone": "+1-555-0123"
              }, null, 2)
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/customers",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "customers"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Update Customer",
          "request": {
            "method": "PUT",
            "header": [
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": JSON.stringify({
                "name": "John Doe Updated",
                "phone": "+1-555-9999"
              }, null, 2)
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/customers/cust_001",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "customers", "cust_001"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Delete Customer",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/customers/cust_001",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "customers", "cust_001"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Get Customer Payments",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/customers/cust_001/payments",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "customers", "cust_001", "payments"]
            },
            "description": ""
          },
          "response": []
        }
      ]
    },
    {
      "name": "Webhooks",
      "item": [
        {
          "name": "Receive Webhook Event",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": JSON.stringify({
                "type": "payment.completed",
                "data": {
                  "paymentId": "pay_001",
                  "amount": 99.99
                }
              }, null, 2)
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/webhooks",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "webhooks"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "List Webhook Events",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/webhooks/events",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "webhooks", "events"]
            },
            "description": ""
          },
          "response": []
        },
        {
          "name": "Get Webhook Event by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/webhooks/events/evt_001",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "webhooks", "events", "evt_001"]
            },
            "description": ""
          },
          "response": []
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000",
      "type": "string"
    }
  ]
};

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'course-assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the starter collection
const outputPath = path.join(outputDir, 'PostFinancial-Payments-Starter.json');
fs.writeFileSync(outputPath, JSON.stringify(starterCollection, null, 2));

console.log('✅ Starter collection created successfully!');
console.log(`📁 Location: ${outputPath}`);
console.log('📊 Collection includes:');
console.log('   - 1 Health Check endpoint');
console.log('   - 6 Payment endpoints');
console.log('   - 5 Refund endpoints');
console.log('   - 6 Customer endpoints');
console.log('   - 3 Webhook endpoints');
console.log('   - Total: 21 endpoints');
console.log('');
console.log('⚠️  Note: This collection has NO tests - perfect for Lesson 1!');
console.log('');
console.log('📖 Next steps:');
console.log('   1. Import this collection into Postman');
console.log('   2. Create an environment with baseUrl variable');
console.log('   3. Use Agent Mode to generate comprehensive tests');
