// Import from relative paths for better compatibility
let users, listeners, bookings, contactMessages;

try {
  // Try to require the schema module
  const schemaModule = require('../shared/schema');
  
  users = schemaModule.users;
  listeners = schemaModule.listeners;
  bookings = schemaModule.bookings;
  contactMessages = schemaModule.contactMessages;
} catch (error) {
  console.error("Error importing schema:", error);
  process.exit(1);
}

export interface IStorage {
  // Users
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  getUserByEmail(email: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Listeners
  getAllListeners(): Promise<any[]>;
  getListener(id: number): Promise<any | undefined>;
  getListenersBySpecialty(specialty: string): Promise<any[]>;
  createListener(listener: any): Promise<any>;
  
  // Bookings
  getBooking(id: number): Promise<any | undefined>;
  getBookingsByUser(userId: number): Promise<any[]>;
  getBookingsByListener(listenerId: number): Promise<any[]>;
  createBooking(booking: any): Promise<any>;
  updateBookingStatus(id: number, status: string): Promise<any | undefined>;
  updateBookingPaymentIntent(id: number, paymentIntentId: string): Promise<any | undefined>;
  
  // Contact Messages
  createContactMessage(message: any): Promise<any>;
  getAllContactMessages(): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private listeners: Map<number, any>;
  private bookings: Map<number, any>;
  private contactMessages: Map<number, any>;
  private currentUserId: number;
  private currentListenerId: number;
  private currentBookingId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.listeners = new Map();
    this.bookings = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentListenerId = 1;
    this.currentBookingId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample listeners
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    const sampleListeners: any[] = [
      {
        name: "Sarah Chen",
        bio: "Licensed social worker with 8 years experience. Specializes in anxiety management and workplace stress. Fluent in English and Mandarin.",
        specialties: ["Anxiety", "Stress", "Career"],
        languages: ["English", "中文"],
        rating: "4.9",
        reviewCount: 127,
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        isAvailable: true,
      },
      {
        name: "Marcus Johnson",
        bio: "Certified peer support specialist focusing on relationship challenges and major life transitions. Warm, empathetic listening style.",
        specialties: ["Relationships", "Life Changes", "Grief"],
        languages: ["English", "Español"],
        rating: "4.8",
        reviewCount: 94,
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
        isAvailable: true,
      },
      {
        name: "Lisa Rodriguez",
        bio: "Psychology graduate specializing in LGBTQ+ support and young adult challenges. Creates inclusive and affirming spaces for all identities.",
        specialties: ["LGBTQ+", "Young Adults", "Identity"],
        languages: ["English", "Français"],
        rating: "5.0",
        reviewCount: 73,
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        isAvailable: true,
      },
      {
        name: "Dr. James Wilson",
        bio: "Former therapist turned peer support advocate. Specializes in men's mental health and addiction recovery support.",
        specialties: ["Men's Health", "Addiction", "Recovery"],
        languages: ["English"],
        rating: "4.7",
        reviewCount: 156,
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
        isAvailable: true,
      },
      {
        name: "Maya Patel",
        bio: "Mindfulness coach and peer counselor with expertise in cultural transition challenges and family dynamics.",
        specialties: ["Cultural Issues", "Family", "Mindfulness"],
        languages: ["English", "हिन्दी", "ગુજરાતી"],
        rating: "4.9",
        reviewCount: 82,
        imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
        isAvailable: true,
      },
      {
        name: "Alex Thompson",
        bio: "Creative arts therapist specializing in depression support and creative expression as healing. Non-binary and LGBTQ+ affirming.",
        specialties: ["Depression", "Creative Therapy", "LGBTQ+"],
        languages: ["English"],
        rating: "4.8",
        reviewCount: 91,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        isAvailable: true,
      }
    ];

    for (const listener of sampleListeners) {
      await this.createListener(listener);
    }
  }

  // Users
  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user: any = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Listeners
  async getAllListeners(): Promise<any[]> {
    return Array.from(this.listeners.values());
  }

  async getListener(id: number): Promise<any | undefined> {
    return this.listeners.get(id);
  }

  async getListenersBySpecialty(specialty: string): Promise<any[]> {
    return Array.from(this.listeners.values()).filter(
      listener => listener.specialties.includes(specialty)
    );
  }

  async createListener(insertListener: any): Promise<any> {
    const id = this.currentListenerId++;
    const listener: any = { 
      ...insertListener, 
      id,
      rating: insertListener.rating || null,
      reviewCount: insertListener.reviewCount || null,
      isAvailable: insertListener.isAvailable || null
    };
    this.listeners.set(id, listener);
    return listener;
  }

  // Bookings
  async getBooking(id: number): Promise<any | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: number): Promise<any[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.userId === userId
    );
  }

  async getBookingsByListener(listenerId: number): Promise<any[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.listenerId === listenerId
    );
  }

  async createBooking(insertBooking: any): Promise<any> {
    const id = this.currentBookingId++;
    const booking: any = { 
      ...insertBooking, 
      id,
      createdAt: new Date(),
      status: insertBooking.status || null,
      userId: insertBooking.userId || null,
      paymentIntentId: insertBooking.paymentIntentId || null,
      notes: insertBooking.notes || null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<any | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  async updateBookingPaymentIntent(id: number, paymentIntentId: string): Promise<any | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.paymentIntentId = paymentIntentId;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Contact Messages
  async createContactMessage(insertMessage: any): Promise<any> {
    const id = this.currentContactId++;
    const message: any = { 
      ...insertMessage, 
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<any[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
