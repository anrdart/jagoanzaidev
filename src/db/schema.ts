// ============================================
// Jagoan Zaidev - Drizzle Schema
// ============================================

import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ============================================
// USERS TABLE
// ============================================
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: varchar('full_name', { length: 100 }),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    lastLoginAt: timestamp('last_login_at'),
    isActive: boolean('is_active').default(true).notNull(),
  },
  (table) => ({
    emailIdx: index('idx_users_email').on(table.email),
    createdAtIdx: index('idx_users_created_at').on(table.createdAt),
  })
);

// ============================================
// USER_PROGRESS TABLE
// ============================================
export const userProgress = pgTable(
  'user_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    courseLevel: varchar('course_level', { length: 20 }).notNull(), // 'basic', 'fundamental', 'jagoan'
    currentCardIndex: integer('current_card_index').default(0).notNull(),
    completedCards: text('completed_cards').array().default(sql`'{}'`).notNull(),
    isLevelCompleted: boolean('is_level_completed').default(false).notNull(),
    startedAt: timestamp('started_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    completedAt: timestamp('completed_at'),
  },
  (table) => ({
    userIdIdx: index('idx_user_progress_user_id').on(table.userId),
    courseLevelIdx: index('idx_user_progress_level').on(table.courseLevel),
    uniqueUserLevel: uniqueIndex('unique_user_level').on(table.userId, table.courseLevel),
  })
);

// ============================================
// USER_QUIZ_SCORES TABLE
// ============================================
export const userQuizScores = pgTable(
  'user_quiz_scores',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    courseLevel: varchar('course_level', { length: 20 }).notNull(),
    score: integer('score').notNull(), // 0-100
    attempts: integer('attempts').default(1).notNull(),
    passed: boolean('passed').default(false).notNull(),
    completedAt: timestamp('completed_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: index('idx_quiz_scores_user_id').on(table.userId),
    courseLevelIdx: index('idx_quiz_scores_level').on(table.courseLevel),
    completedAtIdx: index('idx_quiz_scores_completed_at').on(table.completedAt),
  })
);

// ============================================
// USER_LEARNING_MODE TABLE
// ============================================
export const userLearningMode = pgTable(
  'user_learning_mode',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    learningMode: varchar('learning_mode', { length: 20 }).notNull(), // 'curated', 'path', 'story'
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    uniqueUser: uniqueIndex('unique_user_learning_mode').on(table.userId),
  })
);

// ============================================
// TYPES
// ============================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;
export type UserQuizScore = typeof userQuizScores.$inferSelect;
export type NewUserQuizScore = typeof userQuizScores.$inferInsert;
export type UserLearningMode = typeof userLearningMode.$inferSelect;
export type NewUserLearningMode = typeof userLearningMode.$inferInsert;
