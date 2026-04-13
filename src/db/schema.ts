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

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: varchar('full_name', { length: 100 }),
    passwordHash: varchar('password_hash', { length: 255 }),
    authProvider: varchar('auth_provider', { length: 20 }).notNull().default('email'),
    googleId: varchar('google_id', { length: 255 }),
    avatarUrl: varchar('avatar_url', { length: 500 }),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    lastLoginAt: timestamp('last_login_at'),
    isActive: boolean('is_active').default(true).notNull(),
  },
  (table) => [
    index('idx_users_email').on(table.email),
    index('idx_users_google_id').on(table.googleId),
    index('idx_users_created_at').on(table.createdAt),
  ]
);

export const userProgress = pgTable(
  'user_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    courseLevel: varchar('course_level', { length: 20 }).notNull(),
    currentCardIndex: integer('current_card_index').default(0).notNull(),
    completedCards: text('completed_cards').array().default(sql`'{}'`).notNull(),
    isLevelCompleted: boolean('is_level_completed').default(false).notNull(),
    startedAt: timestamp('started_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    completedAt: timestamp('completed_at'),
  },
  (table) => [
    index('idx_user_progress_user_id').on(table.userId),
    index('idx_user_progress_level').on(table.courseLevel),
    uniqueIndex('unique_user_level').on(table.userId, table.courseLevel),
  ]
);

export const userQuizScores = pgTable(
  'user_quiz_scores',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    courseLevel: varchar('course_level', { length: 20 }).notNull(),
    score: integer('score').notNull(),
    attempts: integer('attempts').default(1).notNull(),
    passed: boolean('passed').default(false).notNull(),
    completedAt: timestamp('completed_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    index('idx_quiz_scores_user_id').on(table.userId),
    index('idx_quiz_scores_level').on(table.courseLevel),
    index('idx_quiz_scores_completed_at').on(table.completedAt),
  ]
);

export const userLearningMode = pgTable(
  'user_learning_mode',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    learningMode: varchar('learning_mode', { length: 20 }).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    uniqueIndex('unique_user_learning_mode').on(table.userId),
  ]
);

export const userCuratedProgress = pgTable(
  'user_curated_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    topicId: varchar('topic_id', { length: 100 }).notNull(),
    isCompleted: boolean('is_completed').default(false).notNull(),
    isFavorited: boolean('is_favorited').default(false).notNull(),
    completedAt: timestamp('completed_at'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    index('idx_curated_progress_user_id').on(table.userId),
    uniqueIndex('unique_user_topic').on(table.userId, table.topicId),
  ]
);

export const userStoryProgress = pgTable(
  'user_story_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    chapterId: varchar('chapter_id', { length: 50 }).notNull(),
    isCompleted: boolean('is_completed').default(false).notNull(),
    isUnlocked: boolean('is_unlocked').default(false).notNull(),
    quizScore: integer('quiz_score'),
    quizAttempts: integer('quiz_attempts').default(0).notNull(),
    badgeEarned: boolean('badge_earned').default(false).notNull(),
    completedAt: timestamp('completed_at'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    index('idx_story_progress_user_id').on(table.userId),
    uniqueIndex('unique_user_chapter').on(table.userId, table.chapterId),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type UserQuizScore = typeof userQuizScores.$inferSelect;
export type UserLearningMode = typeof userLearningMode.$inferSelect;
export type UserCuratedProgress = typeof userCuratedProgress.$inferSelect;
export type UserStoryProgress = typeof userStoryProgress.$inferSelect;
