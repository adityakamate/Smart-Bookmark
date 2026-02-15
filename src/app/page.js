'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Login from '@/components/Login'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'

export default function Home() {
  const [session, setSession] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // 2. Data & Realtime Effect
  useEffect(() => {
    // Guard clause: Only run if we have a valid user ID
    if (!session?.user?.id) return

    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error('Error fetching:', error)
      if (data) setBookmarks(data)
    }

    fetchBookmarks()

    // Create a unique channel name to avoid collisions in dev
    const channel = supabase
      .channel(`realtime_bookmarks_${session.user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookmarks' }, (payload) => {
        setBookmarks((prev) => [payload.new, ...prev])
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'bookmarks' }, (payload) => {
        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session?.user?.id])

  // Computed Stats
  const weeklyNew = bookmarks.filter(b => {
    const date = new Date(b.created_at);
    const now = new Date();
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
    return date > oneWeekAgo;
  }).length;

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setBookmarks([])
  }

  const addBookmark = async (e) => {
    e.preventDefault()
    if (!title || !url) return alert('Please fill in all fields')

    setLoading(true)
    const { error } = await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: session.user.id,
    })
    setLoading(false)

    if (error) {
      console.error(error)
      alert(error.message)
    } else {
      setTitle('')
      setUrl('')
    }
  }

  const deleteBookmark = async (id) => {
    const { error } = await supabase.from('bookmarks').delete().match({ id })
    if (error) {
      console.error(error)
      alert(error.message)
    }
  }

  if (!session) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Form & List (Acting as Main Panel) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Visual separation: Creating a "Recent Bookmarks" glass panel container */}
          <div className="glass-card p-6 rounded-3xl min-h-[600px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Bookmarks</h2>
              <button className="text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>

            <BookmarkList
              bookmarks={bookmarks}
              onDelete={deleteBookmark}
            />
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Gradient Add Button Area (Visible on Desktop) */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-[1px] rounded-2xl">
            <div className="bg-slate-900 rounded-2xl">
              <BookmarkForm
                onSubmit={addBookmark}
                title={title}
                setTitle={setTitle}
                url={url}
                setUrl={setUrl}
                loading={loading}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Floating Add Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={() => document.querySelector('input[type="text"]').focus()}
          className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
