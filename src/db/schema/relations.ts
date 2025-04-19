
import { relations } from 'drizzle-orm';
import { profiles } from './profiles';
import { messages } from './messages';
import { reports } from './reports';
import { likes } from './likes';
import { locations } from './locations';

// Profile relations
export const profilesRelations = relations(profiles, ({ many }) => ({
  sentMessages: many(messages, { relationName: 'senderMessages' }),
  receivedMessages: many(messages, { relationName: 'receiverMessages' }),
  submittedReports: many(reports, { relationName: 'reporterReports' }),
  receivedReports: many(reports, { relationName: 'reportedReports' }),
  givenLikes: many(likes, { relationName: 'likerLikes' }),
  receivedLikes: many(likes, { relationName: 'likedLikes' })
}));

// Messages relations
export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(profiles, {
    fields: [messages.senderId],
    references: [profiles.id],
    relationName: 'senderMessages'
  }),
  recipient: one(profiles, {
    fields: [messages.recipientId],
    references: [profiles.id],
    relationName: 'receiverMessages'
  })
}));

// Reports relations 
export const reportsRelations = relations(reports, ({ one }) => ({
  reporter: one(profiles, {
    fields: [reports.reporterId],
    references: [profiles.id],
    relationName: 'reporterReports'
  }),
  reported: one(profiles, {
    fields: [reports.reportedId],
    references: [profiles.id],
    relationName: 'reportedReports'
  })
}));

// Likes relations
export const likesRelations = relations(likes, ({ one }) => ({
  liker: one(profiles, {
    fields: [likes.likerId],
    references: [profiles.id],
    relationName: 'likerLikes'
  }),
  liked: one(profiles, {
    fields: [likes.likedId],
    references: [profiles.id],
    relationName: 'likedLikes'
  })
}));
