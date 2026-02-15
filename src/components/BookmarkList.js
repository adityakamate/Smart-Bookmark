import BookmarkItem from './BookmarkItem'

export default function BookmarkList({ bookmarks, onDelete }) {
    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500 text-sm dashboard-card">
                No bookmarks found. Add one above.
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {bookmarks.map((bookmark) => (
                <BookmarkItem
                    key={bookmark.id}
                    bookmark={bookmark}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
