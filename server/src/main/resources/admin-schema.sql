-- Required before deploying admin features when spring.jpa.hibernate.ddl-auto=validate.
CREATE TABLE IF NOT EXISTS admin_audit_events (
    id BIGSERIAL PRIMARY KEY,
    actor_user_id BIGINT,
    actor_email VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(255) NOT NULL,
    entity_id VARCHAR(255),
    summary TEXT NOT NULL,
    metadata_json TEXT,
    ip_address VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_active_users (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    activity_date DATE NOT NULL,
    first_seen_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activity_count INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT uk_daily_active_users_user_date UNIQUE (user_id, activity_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_active_users_date ON daily_active_users (activity_date);
CREATE INDEX IF NOT EXISTS idx_daily_active_users_user_id ON daily_active_users (user_id);
