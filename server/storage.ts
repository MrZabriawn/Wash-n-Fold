import { orders, type Order, type InsertOrder } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    // Calculate estimated price server-side for security/record keeping
    // $1.50/lb + $0.50/bag + Delivery Fee
    const pounds = Number(insertOrder.pounds);
    const bags = Number(insertOrder.bagCount);
    const distance = insertOrder.distanceTier;
    
    let deliveryFee = 0;
    if (distance === "less_than_5") deliveryFee = 5;
    else if (distance === "5_to_20") deliveryFee = 10;
    // more_than_20 should technically be rejected or handle differently, but assuming valid input for now
    
    const total = (pounds * 1.50) + (bags * 0.50) + deliveryFee;

    const [order] = await db.insert(orders).values({
      ...insertOrder,
      pounds: pounds.toString(), // Store as numeric string
      estimatedPrice: total.toFixed(2)
    }).returning();
    return order;
  }
}

export const storage = new DatabaseStorage();
