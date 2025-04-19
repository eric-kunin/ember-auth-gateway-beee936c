
import { pgTable, uuid, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').unique(),
  firstName: text('first_name').default(''),
  lastName: text('last_name').default(''),
  displayName: text('display_name').notNull(),
  username: text('username').notNull().unique(),
  bio: text('bio'),
  profession: text('profession'),
  lastSeenAt: timestamp('last_seen_at').defaultNow(),
  isOnline: boolean('is_online').default(false),
  isPremium: boolean('is_premium').default(false),
  isVerified: boolean('is_verified').default(false),
  isBot: boolean('is_bot').default(false),
  height: integer('height'),
  birthDate: timestamp('birth_date').notNull(),
  gender: text('gender').notNull(),
  languages: jsonb('languages'),
  mainProfileImageUrl: text('main_profile_image_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
