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
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Aurora</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <BookmarkForm
          onSubmit={addBookmark}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          loading={loading}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-label">Recently Added</h2>
            <span className="text-label opacity-60 normal-case">{bookmarks.length} Items</span>
          </div>

          <BookmarkList
            bookmarks={bookmarks}
            onDelete={deleteBookmark}
          />
        </div>
      </div>
    </div>
  )
}
