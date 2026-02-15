export default function BookmarkItem({ bookmark, onDelete, onEdit }) {
    const getFavicon = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch {
            return null;
        }
    }

    return (
        <div className="dashboard-card relative p-4 flex items-center justify-between group hover:border-indigo-200 hover:shadow-md transition-all hover:bg-slate-50/50">
            {/* Overlay Link */}
            <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0"
                aria-label={`Open ${bookmark.title}`}
            />

            <div className="flex items-center space-x-4 min-w-0 relative z-10 pointer-events-none">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-200 text-slate-400">
                    <img
                        src={getFavicon(bookmark.url)}
                        alt=""
                        className="w-6 h-6 opacity-80"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('fallback-icon');
                        }}
                    />
                </div>

                <div className="min-w-0">
                    <h3 className="text-base font-medium text-slate-700 group-hover:text-indigo-600 transition-colors truncate block mb-1">
                        {bookmark.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate mb-2 font-mono opacity-80 max-w-md">
                        {bookmark.url}
                    </p>

                    {/* Tags & Meta */}
                    <div className="flex flex-wrap items-center gap-2">
                        {bookmark.category && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-indigo-50 text-indigo-600 tracking-wider">
                                {bookmark.category}
                            </span>
                        )}
                        {bookmark.tags && bookmark.tags.length > 0 && bookmark.tags.map((tag, i) => (
                            <span key={i} className="text-xs text-slate-400">#{tag}</span>
                        ))}
                        {!bookmark.category && !bookmark.tags && (
                            <span className="text-xs text-slate-400 truncate font-mono">
                                {new URL(bookmark.url).hostname}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="relative z-20 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(bookmark);
                    }}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                    title="Edit"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(bookmark.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                    title="Delete"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
