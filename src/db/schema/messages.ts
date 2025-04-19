
import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const messages = pgTable('profile_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  senderId: uuid('sender_id').notNull(),
  recipientId: uuid('recipient_id').notNull(),
  conversationId: uuid('conversation_id').notNull(),
  content: text('content').notNull(),
  fileUrl: text('file_url'),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  sentAt: timestamp('sent_at').defaultNow(),
  updatedAt: timestamp('updated_at')
});
