
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const locations = pgTable('locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  city: text('city').notNull(),
  region: text('region').notNull(),
  country: text('country').default('Israel')
});
