
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const reports = pgTable('profile_reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  reporterId: uuid('reporter_id').notNull(),
  reportedId: uuid('reported_id').notNull(),
  reason: text('reason').notNull(),
  details: text('details'),
  reportTypeId: integer('report_type_id'),
  status: text('status').default('pending'),
  resolvedById: uuid('resolved_by_id'),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow()
});
