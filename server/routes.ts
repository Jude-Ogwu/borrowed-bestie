import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";

// Import from relative paths for better compatibility
let storage, insertBookingSchema, insertContactMessageSchema;

try {
  // Try to require the modules
  const storageModule = require('./storage');
  const schemaModule = require('../shared/schema');
  
  storage = storageModule.storage;
  insertBookingSchema = schemaModule.insertBookingSchema;
  insertContactMessageSchema = schemaModule.insertContactMessageSchema;
} catch (error) {
  console.error("Error importing modules:", error);
  process.exit(1);
}

// Initialize Stripe only if secret key is provided
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all listeners
  app.get("/api/listeners", async (req, res) => {
    try {
      const listeners = await storage.getAllListeners();
      res.json(listeners);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching listeners: " + error.message });
    }
  });

  // Get listeners by specialty
  app.get("/api/listeners/specialty/:specialty", async (req, res) => {
    try {
      const { specialty } = req.params;
      const listeners = await storage.getListenersBySpecialty(specialty);
      res.json(listeners);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching listeners: " + error.message });
    }
  });

  // Get single listener
  app.get("/api/listeners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const listener = await storage.getListener(id);
      if (!listener) {
        return res.status(404).json({ message: "Listener not found" });
      }
      res.json(listener);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching listener: " + error.message });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating booking: " + error.message });
    }
  });

  // Update booking status
  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating booking: " + error.message });
    }
  });

  // Submit contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ message: "Error submitting message: " + error.message });
    }
  });

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ 
        message: "Payment processing is not configured. Please contact support." 
      });
    }

    try {
      const { amount, bookingId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          bookingId: bookingId?.toString() || "",
        },
      });

      // Update booking with payment intent ID if provided
      if (bookingId) {
        await storage.updateBookingPaymentIntent(bookingId, paymentIntent.id);
      }

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Confirm payment and update booking status
  app.post("/api/confirm-payment", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ 
        message: "Payment processing is not configured. Please contact support." 
      });
    }

    try {
      const { paymentIntentId } = req.body;
      
      // Retrieve payment intent from Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        const bookingId = parseInt(paymentIntent.metadata.bookingId);
        if (bookingId) {
          await storage.updateBookingStatus(bookingId, 'confirmed');
        }
        res.json({ success: true });
      } else {
        res.status(400).json({ message: "Payment not successful" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error confirming payment: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
