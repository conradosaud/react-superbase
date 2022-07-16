import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://zeualmdnayhphqtntcxl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldWFsbWRuYXlocGhxdG50Y3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc5MjUwMDAsImV4cCI6MTk3MzUwMTAwMH0.c63qXgO8Xy-w7hqd3l87mwfKt6fq4wZ2ij_hBfgGjro"
)