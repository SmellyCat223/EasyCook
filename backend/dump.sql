--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7 (Homebrew)
-- Dumped by pg_dump version 15.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY "users"."users" DROP CONSTRAINT IF EXISTS "users_username_key";
ALTER TABLE IF EXISTS ONLY "users"."users" DROP CONSTRAINT IF EXISTS "users_pkey";
ALTER TABLE IF EXISTS ONLY "users"."users" DROP CONSTRAINT IF EXISTS "users_email_key";
ALTER TABLE IF EXISTS "users"."users" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "users"."users_id_seq";
DROP TABLE IF EXISTS "users"."users";
DROP SCHEMA IF EXISTS "users";
--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: users; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "users";


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: users; Type: TABLE; Schema: users; Owner: -
--

CREATE TABLE "users"."users" (
    "id" integer NOT NULL,
    "username" character varying(50) NOT NULL,
    "email" character varying(100) NOT NULL,
    "password" character varying(255) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: users; Owner: -
--

CREATE SEQUENCE "users"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: -
--

ALTER SEQUENCE "users"."users_id_seq" OWNED BY "users"."users"."id";


--
-- Name: users id; Type: DEFAULT; Schema: users; Owner: -
--

ALTER TABLE ONLY "users"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"users"."users_id_seq"'::"regclass");


--
-- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: -
--

COPY "users"."users" ("id", "username", "email", "password") FROM stdin;
14	Tester1	Tester1@gmail.com	$2a$10$LxkY8ckAWR9OyMjW8uGeIeM80hqeRM75QSSGdBFglLHUg6B3pFQqm
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: users; Owner: -
--

SELECT pg_catalog.setval('"users"."users_id_seq"', 14, true);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: users; Owner: -
--

ALTER TABLE ONLY "users"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: users; Owner: -
--

ALTER TABLE ONLY "users"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: users; Owner: -
--

ALTER TABLE ONLY "users"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");


--
-- PostgreSQL database dump complete
--

