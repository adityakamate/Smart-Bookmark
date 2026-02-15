# Aurora - Smart Bookmark Manager 🚀

Aurora is a premium, AI-powered bookmark manager designed solely for speed and aesthetics. It helps you organize your digital life with automatic categorization, tagging, and seamless synchronization across devices.

![Aurora Dashboard](https://via.placeholder.com/1200x600?text=Aurora+Dashboard+Preview) 
*(Replace with actual screenshot)*

## ✨ Features

-   **🧠 AI Auto-Tagging**: Automatically analyzes your links using **Groq (Llama 3)** to generate relevant tags and categories.
-   **⚡ Real-time Sync**: Built on **Supabase**, your bookmarks sync instantly across all open tabs and devices.
-   **🎨 Premium UI**: A modern "Glassmorphism" aesthetic with smooth **Framer Motion** animations.
-   **🔍 Smart Search**: (Coming Soon)
-   **🔐 Secure Auth**: Google Authentication via Supabase Auth.
-   **📱 Fully Responsive**: Looks great on desktop, tablet, and mobile.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **AI Integration**: [Groq SDK](https://groq.com/) (Llama 3.3)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   Yarn or npm
-   A Supabase Project
-   A Groq API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/aurora.git
    cd aurora
    ```

2.  **Install dependencies**:
    ```bash
    yarn install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GROQ_API_KEY=your_groq_api_key
    ```

4.  **Run with Development Server**:
    ```bash
    yarn dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🗄️ Database Schema

Run this SQL in your Supabase SQL Editor to set up the table:

```sql
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  user_id uuid references auth.users not null,
  tags text[] default array[]::text[],
  category text
);

-- Enable RLS
alter table bookmarks enable row level security;

-- Policies
create policy "Users can view their own bookmarks" on bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks" on bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own bookmarks" on bookmarks
  for update using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks" on bookmarks
  for delete using (auth.uid() = user_id);
```

## ⚡ Supabase Setup (Quick)

Instead of manually running SQL, you can use the provided setup file:

1.  Open your Supabase Project Dashboard.
2.  Go to the **SQL Editor**.
3.  Click **New Query**.
4.  Copy the contents of `supabase_setup.sql` from this repository.
5.  Paste it into the editor and click **Run**.

This will automatically create the table and apply all security policies.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
