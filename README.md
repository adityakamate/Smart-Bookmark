# ✦ Aurora

> **The Intelligent Bookmark Manager for the Modern Web.**
> *Fast. Beautiful. AI-Powered.*

![Aurora Banner](https://via.placeholder.com/1200x400?text=Aurora+Dashboard+Preview)
*(Replace with actual screenshot)*

---

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq-AI-f55036?style=for-the-badge&logo=openai&logoColor=white)

</div>

---

## 🌟 Overview

**Aurora** isn't just a place to store links—it's a smart workspace. It uses advanced AI to automatically categorize and tag your bookmarks, ensuring you never lose a link again. Built with a "Privacy First" and "Performance First" mindset, it syncs instantly across all your devices.

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🧠 AI Auto-Tagging** | Powered by **Groq (Llama 3)**, Aurora analyzes your links and adds relevant tags & categories automatically. |
| **⚡ Real-time Sync** | Bookmarks update instantly across all open tabs and devices thanks to **Supabase Realtime**. |
| **🎨 Premium Design** | A stunning glassmorphism UI with fluid **Framer Motion** animations. |
| **🔐 Secure Auth** | Enterprise-grade security with Google OAuth via Supabase. |
| **📱 Responsive** | specific mobile-first design for managing links on the go. |

## 🛠️ Tech Stack

*   **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
*   **State**: [TanStack Query](https://tanstack.com/query/latest)
*   **AI Engine**: [Groq SDK](https://groq.com/) (Llama 3.3 70B)

---

## 🚀 Getting Started

Follow these steps to set up your own instance of Aurora.

### 1. Prerequisites
*   Node.js 18+
*   Yarn or npm
*   A Supabase Project
*   A Groq API Key

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aurora.git

# Navigate to the project directory
cd aurora

# Install dependencies
yarn install
```

### 3. Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### 4. Database Setup

You have two options to set up the database:

**Option A: Quick Setup (Recommended)**
1.  Open parts of `supabase_setup.sql` from this repo.
2.  Paste it into your Supabase **SQL Editor**.
3.  Click **Run**.

**Option B: Manual Schema**
(See `supabase_setup.sql` for full schema details)

### 5. Run Locally

```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ by You</sub>
</div>
