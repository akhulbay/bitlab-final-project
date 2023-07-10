--liquibase formatted sql

--changeset akhulbay:1
CREATE TABLE IF NOT EXISTS t_blog_category
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

--changeset akhulbay:2
CREATE TABLE IF NOT EXISTS t_user
(
    id         BIGSERIAL PRIMARY KEY,
    username   VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(32)  NOT NULL,
    blocked    BOOLEAN      NOT NULL
);

--changeset akhulbay:3
CREATE TABLE IF NOT EXISTS t_general_category
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

--changeset akhulbay:4
CREATE TABLE IF NOT EXISTS t_blog
(
    id               BIGSERIAL PRIMARY KEY,
    content          TEXT         NOT NULL,
    created_at       DATE         NOT NULL,
    image            VARCHAR(255) NOT NULL,
    title            VARCHAR(255) NOT NULL,
    blog_category_id BIGINT REFERENCES t_blog_category (id) ON DELETE CASCADE,
    user_id          BIGINT REFERENCES t_user (id) ON DELETE CASCADE
);

--changeset akhulbay:5
CREATE TABLE IF NOT EXISTS t_user_profile
(
    id                 BIGSERIAL PRIMARY KEY,
    about_experience   TEXT             NOT NULL,
    about_user         TEXT             NOT NULL,
    degree             VARCHAR(255)     NOT NULL,
    experience_years   DOUBLE PRECISION NOT NULL,
    facebook_link      VARCHAR(255)     NOT NULL,
    faculty            VARCHAR(255)     NOT NULL,
    github_link        VARCHAR(255)     NOT NULL,
    image              VARCHAR(255),
    languages          VARCHAR(255)     NOT NULL,
    linkedin_link      VARCHAR(255)     NOT NULL,
    location           VARCHAR(255)     NOT NULL,
    major              VARCHAR(255)     NOT NULL,
    phone_number       VARCHAR(32)      NOT NULL,
    skills             TEXT             NOT NULL,
    telegram_link      VARCHAR(255)     NOT NULL,
    university         VARCHAR(255)     NOT NULL,
    year_of_admission  INT              NOT NULL,
    year_of_graduation INT              NOT NULL,
    account_type       BIGINT REFERENCES t_general_category (id) ON DELETE CASCADE,
    user_id            BIGINT REFERENCES t_user (id) ON DELETE CASCADE
);

--changeset akhulbay:6
CREATE TABLE IF NOT EXISTS t_company
(
    id               BIGSERIAL PRIMARY KEY,
    about_company    TEXT         NOT NULL,
    employees_number INT          NOT NULL,
    establish_date   DATE         NOT NULL,
    image            VARCHAR(255),
    linkedin_link    VARCHAR(255) NOT NULL,
    location         VARCHAR(255) NOT NULL,
    name             VARCHAR(255) NOT NULL,
    owner_name       VARCHAR(255) NOT NULL,
    website          VARCHAR(255) NOT NULL,
    whatsapp_link    VARCHAR(255) NOT NULL,
    user_id          BIGINT REFERENCES t_user (id) ON DELETE CASCADE
);

--changeset akhulbay:7
CREATE TABLE IF NOT EXISTS t_job
(
    id               BIGSERIAL PRIMARY KEY,
    city             VARCHAR(128) NOT NULL,
    created_at       DATE         NOT NULL,
    description      TEXT         NOT NULL,
    experience       VARCHAR(32)  NOT NULL,
    key_skills       TEXT         NOT NULL,
    offered_salary   INT          NOT NULL,
    position         VARCHAR(64)  NOT NULL,
    qualification    VARCHAR(255) NOT NULL,
    required_skills  TEXT         NOT NULL,
    responsibilities TEXT         NOT NULL,
    title            VARCHAR(255) NOT NULL,
    work_schedule    VARCHAR(32)  NOT NULL,
    category_id      BIGINT REFERENCES t_general_category (id) ON DELETE CASCADE,
    company_id       BIGINT REFERENCES t_company (id) ON DELETE CASCADE
);

--changeset akhulbay:8
CREATE TABLE IF NOT EXISTS t_user_job_application
(
    id              BIGSERIAL PRIMARY KEY,
    cover_letter    TEXT,
    created_at      DATE NOT NULL,
    status          INT  NOT NULL,
    job_id          BIGINT REFERENCES t_job (id) ON DELETE CASCADE,
    user_profile_id BIGINT REFERENCES t_user_profile (id) ON DELETE CASCADE,
    UNIQUE (job_id, user_profile_id)
);

--changeset akhulbay:9
CREATE TABLE IF NOT EXISTS t_favorite_job
(
    id      BIGSERIAL PRIMARY KEY,
    job_id  BIGINT REFERENCES t_job (id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES t_user (id) ON DELETE CASCADE
);