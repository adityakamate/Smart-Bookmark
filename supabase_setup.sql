-- Create the bookmarks table
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  user_id uuid references auth.users not null,
  tags text[] default array[]::text[],
  category text
);

-- Enable Row Level Security (RLS)
alter table bookmarks enable row level security;

-- Create Policies

-- 1. View Policy
create policy "Users can view their own bookmarks" on bookmarks
  for select using (auth.uid() = user_id);

-- 2. Insert Policy
create policy "Users can insert their own bookmarks" on bookmarks
  for insert with check (auth.uid() = user_id);

-- 3. Update Policy
create policy "Users can update their own bookmarks" on bookmarks
  for update using (auth.uid() = user_id);

-- 4. Delete Policy
create policy "Users can delete their own bookmarks" on bookmarks
  for delete using (auth.uid() = user_id);
