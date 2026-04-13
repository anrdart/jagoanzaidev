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
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    password_hash VARCHAR(255),
    auth_provider VARCHAR(20) NOT NULL DEFAULT 'email',
    google_id VARCHAR(255),
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================
-- USER_PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_level VARCHAR(20) NOT NULL,
    current_card_index INTEGER DEFAULT 0,
    completed_cards TEXT[] DEFAULT '{}',
    is_level_completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_level)
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_level ON user_progress(course_level);

-- ============================================
-- USER_QUIZ_SCORES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_quiz_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_level VARCHAR(20) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    attempts INTEGER DEFAULT 1,
    passed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quiz_scores_user_id ON user_quiz_scores(user_id);
CREATE INDEX idx_quiz_scores_level ON user_quiz_scores(course_level);

-- ============================================
-- USER_LEARNING_MODE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_learning_mode (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    learning_mode VARCHAR(20) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- ============================================
-- USER_CURATED_PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_curated_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id VARCHAR(100) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    is_favorited BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, topic_id)
);

CREATE INDEX idx_curated_progress_user_id ON user_curated_progress(user_id);

-- ============================================
-- USER_STORY_PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_story_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    chapter_id VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    is_unlocked BOOLEAN DEFAULT false,
    quiz_score INTEGER,
    quiz_attempts INTEGER DEFAULT 0,
    badge_earned BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, chapter_id)
);

CREATE INDEX idx_story_progress_user_id ON user_story_progress(user_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_learning_mode_updated_at
    BEFORE UPDATE ON user_learning_mode
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_curated_progress_updated_at
    BEFORE UPDATE ON user_curated_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_story_progress_updated_at
    BEFORE UPDATE ON user_story_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- API ROUTES (PostgreSQL Functions)
-- ============================================

-- Register/Login via email (password hashed via bcrypt on app side)
CREATE OR REPLACE FUNCTION auth_email(
    p_email VARCHAR(255),
    p_password_hash VARCHAR(255),
    p_full_name VARCHAR(100) DEFAULT NULL
) RETURNS JSON AS $$
DECLARE
    v_user users%ROWTYPE;
    v_is_new BOOLEAN;
BEGIN
    -- Try to find existing user
    SELECT * INTO v_user FROM users WHERE email = p_email LIMIT 1;

    IF v_user.id IS NOT NULL THEN
        -- Existing user - update login info
        UPDATE users
        SET last_login_at = CURRENT_TIMESTAMP,
            password_hash = COALESCE(NULLIF(p_password_hash, ''), password_hash),
            full_name = COALESCE(p_full_name, full_name),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = v_user.id
        RETURNING * INTO v_user;
        v_is_new := false;
    ELSE
        -- New user - insert
        INSERT INTO users (email, full_name, password_hash, auth_provider, last_login_at)
        VALUES (p_email, p_full_name, p_password_hash, 'email', CURRENT_TIMESTAMP)
        RETURNING * INTO v_user;
        v_is_new := true;
    END IF;

    RETURN json_build_object(
        'id', v_user.id,
        'email', v_user.email,
        'full_name', v_user.full_name,
        'auth_provider', v_user.auth_provider,
        'is_new', v_is_new,
        'created_at', v_user.created_at
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Register/Login via Google
CREATE OR REPLACE FUNCTION auth_google(
    p_google_id VARCHAR(255),
    p_email VARCHAR(255),
    p_full_name VARCHAR(100) DEFAULT NULL,
    p_avatar_url VARCHAR(500) DEFAULT NULL
) RETURNS JSON AS $$
DECLARE
    v_user users%ROWTYPE;
    v_is_new BOOLEAN;
BEGIN
    -- Try to find by google_id first
    SELECT * INTO v_user FROM users WHERE google_id = p_google_id LIMIT 1;

    IF v_user.id IS NOT NULL THEN
        -- Existing Google user - update login info
        UPDATE users
        SET last_login_at = CURRENT_TIMESTAMP,
            avatar_url = COALESCE(p_avatar_url, avatar_url),
            full_name = COALESCE(p_full_name, full_name),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = v_user.id
        RETURNING * INTO v_user;
        v_is_new := false;
    ELSE
        -- Check if email already exists (merge accounts)
        SELECT * INTO v_user FROM users WHERE email = p_email LIMIT 1;

        IF v_user.id IS NOT NULL THEN
            -- Merge: add google_id to existing email account
            UPDATE users
            SET google_id = p_google_id,
                avatar_url = COALESCE(p_avatar_url, avatar_url),
                full_name = COALESCE(p_full_name, full_name),
                last_login_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = v_user.id
            RETURNING * INTO v_user;
            v_is_new := false;
        ELSE
            -- Completely new user
            INSERT INTO users (email, full_name, google_id, avatar_url, auth_provider, last_login_at)
            VALUES (p_email, p_full_name, p_google_id, p_avatar_url, 'google', CURRENT_TIMESTAMP)
            RETURNING * INTO v_user;
            v_is_new := true;
        END IF;
    END IF;

    RETURN json_build_object(
        'id', v_user.id,
        'email', v_user.email,
        'full_name', v_user.full_name,
        'auth_provider', v_user.auth_provider,
        'avatar_url', v_user.avatar_url,
        'is_new', v_is_new,
        'created_at', v_user.created_at
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
