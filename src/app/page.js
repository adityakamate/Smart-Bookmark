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
  const [editingId, setEditingId] = useState(null) // New state for editing
  const queryClient = useQueryClient()

  // 1. Session Management
  // 1. Session Management
  useEffect(() => {
    // Check active session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setSession(session)
        // Clear the hash from the URL to clean it up
        if (window.location.hash && window.location.hash.includes('access_token')) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
      } else if (session) {
        setSession(session)
      }
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
    enabled: !!session?.user?.id,
  })

  // 3. Add Mutation
  const addMutation = useMutation({
    mutationFn: async (newBookmark) => {
      const { data, error } = await supabase
        .from('bookmarks')
        .insert(newBookmark)
        .select()

      if (error) throw error
      if (!data || data.length === 0) {
        throw new Error('Add failed: No data returned')
      }
      return data[0]
    },
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks'] })
      const previousBookmarks = queryClient.getQueryData(['bookmarks'])
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
      resetForm()
    },
  })

  // 4. Update Mutation 
  const updateMutation = useMutation({
    mutationFn: async (updatedBookmark) => {
      const { id, ...updates } = updatedBookmark;

      if (!id) throw new Error("Bookmark ID is missing");

      const { data, error } = await supabase
        .from('bookmarks')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('Update failed: Bookmark not found or permission denied');
      }

      return data[0];
    },
    onMutate: async (updatedBookmark) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks'] });

      const previousBookmarks = queryClient.getQueryData(['bookmarks']);

      queryClient.setQueryData(['bookmarks'], (old = []) =>
        old.map((b) => (b.id === updatedBookmark.id ? { ...b, ...updatedBookmark } : b))
      );

      return { previousBookmarks };
    },
    onError: (err, newBookmark, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(['bookmarks'], context.previousBookmarks);
      }
      alert(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      if (typeof resetForm === 'function') resetForm();
    }
  });

  // 5. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('bookmarks').delete().match({ id })
      if (error) throw error
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks'] })
      const previousBookmarks = queryClient.getQueryData(['bookmarks'])
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

  // 6. Realtime Sync
  useEffect(() => {
    if (!session?.user?.id) return

    const channel = supabase
      .channel(`realtime_bookmarks_${session.user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookmarks' }, (payload) => {
        queryClient.setQueryData(['bookmarks'], (old = []) => {
          if (old.find(b => b.id === payload.new.id)) return old
          return [payload.new, ...old]
        })
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bookmarks' }, (payload) => {
        queryClient.setQueryData(['bookmarks'], (old = []) =>
          old.map(b => b.id === payload.new.id ? payload.new : b)
        )
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
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    queryClient.setQueryData(['bookmarks'], [])
  }

  const resetForm = () => {
    setTitle('')
    setUrl('')
    setTags([])
    setCategory('')
    setEditingId(null)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!title || !url) return alert('Please fill in all fields')

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        title,
        url,
        tags,
        category,
        // Keep user_id in case needed, but usually not updated
      })
    } else {
      addMutation.mutate({
        title,
        url,
        tags,
        category,
        user_id: session.user.id,
      })
    }
  }

  const handleEdit = (bookmark) => {
    setTitle(bookmark.title)
    setUrl(bookmark.url)
    setTags(bookmark.tags || [])
    setCategory(bookmark.category || '')
    setEditingId(bookmark.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    resetForm()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      deleteMutation.mutate(id)
    }
  }

  if (!session) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="glass-card flex justify-between items-center py-4 px-6 rounded-2xl mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 ring-1 ring-black/5">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Aurora</h1>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Workspace</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3 pl-6 border-l border-slate-200/50">
            {session?.user?.user_metadata?.avatar_url ? (
              <img
                src={session.user.user_metadata.avatar_url}
                alt="Profile"
                className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs ring-2 ring-white shadow-sm">
                {session?.user?.email?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700 max-w-[150px] truncate">
                {session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0]}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Free Plan</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
          >
            <span className="hidden sm:inline">Sign Out</span>
            <svg className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <BookmarkForm
          onSubmit={handleSave}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          tags={tags}
          setTags={setTags}
          category={category}
          setCategory={setCategory}
          loading={addMutation.isPending || updateMutation.isPending}
          isEditing={!!editingId}
          onCancel={handleCancelEdit}
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
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  )
}
