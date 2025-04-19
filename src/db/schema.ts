
import { pgTable, serial, text, uuid, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

// User profiles table
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name'),
  gender: text('gender'),
  birthdate: timestamp('birthdate'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true),
  preferences: jsonb('preferences'),
});

// Example of another table (e.g., for messages)
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: uuid('sender_id').notNull().references(() => profiles.id),
  receiverId: uuid('receiver_id').notNull().references(() => profiles.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isRead: boolean('is_read').default(false),
});
