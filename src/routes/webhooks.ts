import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { WebhookEvent, WebhookEventType } from '../types';

const router = Router();

// In-memory webhook event storage
const webhookEvents: Map<string, WebhookEvent> = new Map();

// POST /api/v1/webhooks - Receive webhook events (simulated external service)
router.post('/', (req: Request, res: Response) => {
  const { type, data } = req.body;
  
  // Validation
  if (!type || !data) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Missing required fields: type, data'
    });
  }
  
  // Validate event type
  if (!Object.values(WebhookEventType).includes(type)) {
    return res.status(400).json({
      error: 'Invalid event type',
      message: `Event type must be one of: ${Object.values(WebhookEventType).join(', ')}`
    });
  }
  
  // Create webhook event
  const event: WebhookEvent = {
    id: `evt_${uuidv4().substring(0, 8)}`,
    type,
    data,
    timestamp: new Date()
  };
  
  webhookEvents.set(event.id, event);
  
  // Log the event (in production, this would trigger actual webhook processing)
  console.log(`📨 Webhook received: ${type}`, event.id);
  
  res.status(200).json({
    received: true,
    eventId: event.id
  });
});

// GET /api/v1/webhooks/events - List webhook events (for debugging)
router.get('/events', (req: Request, res: Response) => {
  const { type, limit = '50' } = req.query;
  
  let filteredEvents = Array.from(webhookEvents.values());
  
  if (type) {
    filteredEvents = filteredEvents.filter(e => e.type === type);
  }
  
  // Sort by timestamp desc
  filteredEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  const limitNum = parseInt(limit as string);
  const paginatedEvents = filteredEvents.slice(0, limitNum);
  
  res.json({
    data: paginatedEvents,
    total: filteredEvents.length
  });
});

// GET /api/v1/webhooks/events/:id - Get specific webhook event
router.get('/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const event = webhookEvents.get(id);
  
  if (!event) {
    return res.status(404).json({
      error: 'Event not found',
      message: `Webhook event with ID ${id} does not exist`
    });
  }
  
  res.json(event);
});

export default router;
