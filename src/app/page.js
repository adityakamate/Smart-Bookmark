'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'
import Login from '@/components/Login'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'

export default function Home() {
  const [session, setSession] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState('')
  const queryClient = useQueryClient()

  // 1. Session Management
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

  // 2. Fetch Bookmarks with useQuery
  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!session?.user?.id, // Only fetch if we have a user
  })

  // 3. Add Mutation with Optimistic Update
  const addMutation = useMutation({
    mutationFn: async (newBookmark) => {
      const { data, error } = await supabase
        .from('bookmarks')
        .insert(newBookmark)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks'] })

      const previousBookmarks = queryClient.getQueryData(['bookmarks'])

      // Optimistically update to the new value
      queryClient.setQueryData(['bookmarks'], (old = []) => [
        { ...newBookmark, id: 'temp-' + Date.now(), created_at: new Date().toISOString() },
        ...old,
      ])

      return { previousBookmarks }
    },
    onError: (err, newBookmark, context) => {
      queryClient.setQueryData(['bookmarks'], context.previousBookmarks)
      alert(err.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      setTitle('')
      setUrl('')
      setTags([])
      setCategory('')
    },
  })

  // 4. Delete Mutation with Optimistic Update
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('bookmarks').delete().match({ id })
      if (error) throw error
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks'] })

      const previousBookmarks = queryClient.getQueryData(['bookmarks'])

      // Optimistically remove
      queryClient.setQueryData(['bookmarks'], (old = []) =>
        old.filter((bookmark) => bookmark.id !== id)
      )

      return { previousBookmarks }
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['bookmarks'], context.previousBookmarks)
      alert(err.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    },
  })

  // 5. Realtime Sync (Syncs cache without refetching)
  useEffect(() => {
    if (!session?.user?.id) return

    const channel = supabase
      .channel(`realtime_bookmarks_${session.user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookmarks' }, (payload) => {
        // Manually update cache without refetching
        queryClient.setQueryData(['bookmarks'], (old = []) => {
          // Avoid adding if it's already there (e.g. from our own optimistic update that just resolved)
          if (old.find(b => b.id === payload.new.id)) return old
          return [payload.new, ...old]
        })
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'bookmarks' }, (payload) => {
        queryClient.setQueryData(['bookmarks'], (old = []) =>
          old.filter((bookmark) => bookmark.id !== payload.old.id)
        )
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session?.user?.id, queryClient])


  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    queryClient.setQueryData(['bookmarks'], []) // Clear cache on logout
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title || !url) return alert('Please fill in all fields')

    addMutation.mutate({
      title,
      url,
      tags,
      category,
      user_id: session.user.id,
    })
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
  }

  if (!session) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center py-6">
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
          onSubmit={handleAdd}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          tags={tags}
          setTags={setTags}
          category={category}
          setCategory={setCategory}
          loading={addMutation.isPending}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-label">Recently Added</h2>
            <div className="flex items-center gap-2">
              {isLoading && <span className="text-xs text-indigo-500 animate-pulse">Syncing...</span>}
              <span className="text-label opacity-60 normal-case">{bookmarks.length} Items</span>
            </div>
          </div>

          <BookmarkList
            bookmarks={bookmarks}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
