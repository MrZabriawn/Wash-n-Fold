import { pgTable, text, serial, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  pounds: numeric("pounds").notNull(), // User estimates weight
  bagCount: integer("bag_count").notNull(),
  distanceTier: text("distance_tier", { enum: ["less_than_5", "5_to_20", "more_than_20"] }).notNull(),
  estimatedPrice: numeric("estimated_price"), // Server-calculated based on inputs
  status: text("status", { enum: ["pending", "confirmed", "completed"] }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ 
  id: true, 
  status: true,
  createdAt: true 
}).extend({
  // Override numeric to be number for zod validation from form
  pounds: z.coerce.number().min(1, "Minimum 1 pound required"),
  bagCount: z.coerce.number().min(1, "Minimum 1 bag required"),
  // Simple captcha field
  humanVerify: z.string().refine(val => val === "8", { message: "Incorrect math answer" })
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
