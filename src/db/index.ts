// ============================================
// Jagoan Zaidev - Database Connection (Neon)
// ============================================

import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Get the Neon database URL from environment variables
const databaseUrl = import.meta.env.PUBLIC_NEON_DATABASE_URL || import.meta.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  console.warn('NEON_DATABASE_URL not found. Using localStorage only.');
}

// Configure Neon for edge runtime
neonConfig.fetchConnectionCache = true;

// Create database connection
let db: ReturnType<typeof drizzle>;

if (databaseUrl) {
  const sql = neon(databaseUrl);
  db = drizzle(sql, { schema });
} else {
  // Mock db for development without database
  db = null as unknown as ReturnType<typeof drizzle>;
}

export { db, schema };

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get or create user by email
 */
export async function getOrCreateUser(email: string, fullName?: string) {
  if (!db) return null;

  try {
    // Try to find existing user
    const existingUsers = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);

    if (existingUsers.length > 0) {
      // Update last login
      await db
        .update(schema.users)
        .set({ lastLoginAt: new Date() })
        .where(eq(schema.users.id, existingUsers[0].id));

      return existingUsers[0];
    }

    // Create new user
    const newUsers = await db
      .insert(schema.users)
      .values({
        email,
        fullName,
      })
      .returning();

    return newUsers[0];
  } catch (error) {
    console.error('Error getting/creating user:', error);
    return null;
  }
}

/**
 * Save user progress to database
 */
export async function saveUserProgress(
  userId: string,
  courseLevel: string,
  cardIndex: number,
  completedCards: string[]
) {
  if (!db) return null;

  try {
    const result = await db
      .insert(schema.userProgress)
      .values({
        userId,
        courseLevel,
        currentCardIndex: cardIndex,
        completedCards,
      })
      .onConflictDoUpdate({
        target: [schema.userProgress.userId, schema.userProgress.courseLevel],
        set: {
          currentCardIndex: cardIndex,
          completedCards,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error saving progress:', error);
    return null;
  }
}

/**
 * Save quiz score to database
 */
export async function saveQuizScore(
  userId: string,
  courseLevel: string,
  score: number,
  attempts: number
) {
  if (!db) return null;

  try {
    const result = await db
      .insert(schema.userQuizScores)
      .values({
        userId,
        courseLevel,
        score,
        attempts,
        passed: score >= 70,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error saving quiz score:', error);
    return null;
  }
}

// Import eq for where clauses
import { eq } from 'drizzle-orm';
