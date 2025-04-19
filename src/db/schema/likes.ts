
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';

export const likes = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  likerId: uuid('liker_id').notNull(),
  likedId: uuid('liked_id').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});
