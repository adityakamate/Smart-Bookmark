import BookmarkItem from './BookmarkItem'

export default function BookmarkList({ bookmarks, onDelete }) {
    return (
        <div className="relative">
            {bookmarks.length === 0 ? (
                <div className="text-center py-20 px-4 glass-card rounded-2xl border-dashed border-2 border-white/5">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <p className="text-slate-400 text-lg">Your library is empty</p>
                    <p className="text-slate-500 text-sm mt-1">Add your first bookmark to get started</p>
                </div>
            ) : (
                <div className="grid gap-2">
                    <div className="flex justify-between items-center mb-2 px-2">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recently Added</h3>
                        <span className="text-xs text-slate-600">{bookmarks.length} Items</span>
                    </div>
                    {bookmarks.map((bookmark) => (
                        <BookmarkItem
                            key={bookmark.id}
                            bookmark={bookmark}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
