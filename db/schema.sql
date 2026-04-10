-- ============================================
-- Jagoan Zaidev - Database Schema (Neon/PostgreSQL)
-- ============================================
-- Run this SQL in your Neon database to create the schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
-- Stores user authentication and profile data
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Index for faster email lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================
-- USER_PROGRESS TABLE
-- ============================================
-- Tracks user progress through courses and levels
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_level VARCHAR(20) NOT NULL, -- 'basic', 'fundamental', 'jagoan'
    current_card_index INTEGER DEFAULT 0,
    completed_cards TEXT[] DEFAULT '{}', -- Array of completed card IDs
    is_level_completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_level)
);

-- Indexes for progress queries
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_level ON user_progress(course_level);

-- ============================================
-- USER_QUIZ_SCORES TABLE
-- ============================================
-- Stores quiz attempt history and scores
CREATE TABLE IF NOT EXISTS user_quiz_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_level VARCHAR(20) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    attempts INTEGER DEFAULT 1,
    passed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for quiz score queries
CREATE INDEX idx_quiz_scores_user_id ON user_quiz_scores(user_id);
CREATE INDEX idx_quiz_scores_level ON user_quiz_scores(course_level);
CREATE INDEX idx_quiz_scores_completed_at ON user_quiz_scores(completed_at);

-- ============================================
-- USER_LEARNING_MODE TABLE
-- ============================================
-- Stores user's preferred learning mode
CREATE TABLE IF NOT EXISTS user_learning_mode (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    learning_mode VARCHAR(20) NOT NULL, -- 'curated', 'path', 'story'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to user_learning_mode table
CREATE TRIGGER update_user_learning_mode_updated_at
    BEFORE UPDATE ON user_learning_mode
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert a test user
-- INSERT INTO users (email, full_name) VALUES
-- ('test@example.com', 'Test User');

-- Insert sample progress for test user
-- INSERT INTO user_progress (user_id, course_level, current_card_index, completed_cards) VALUES
-- ((SELECT id FROM users WHERE email = 'test@example.com'), 'basic', 2, ARRAY['basic-1', 'basic-2']);
