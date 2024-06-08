import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://groqymaprjsixdqtrwvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyb3F5bWFwcmpzaXhkcXRyd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4MzM4MDQsImV4cCI6MjAzMzQwOTgwNH0.ri8B3v7pqSWH-rt0c-rqS1Furq7Cr_CdBqaJwzP8xGs';

export const supabase = createClient(supabaseUrl, supabaseKey);
