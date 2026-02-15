export default function BookmarkItem({ bookmark, onDelete }) {
    const getFavicon = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch {
            return null;
        }
    }

    return (
        <div className="dashboard-card p-4 flex items-center justify-between group hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-center space-x-4 min-w-0">
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
                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors truncate block mb-0.5"
                    >
                        {bookmark.title}
                    </a>
                    <span className="text-xs text-slate-400 truncate block font-mono">
                        {bookmark.url}
                    </span>
                </div>
            </div>

            <button
                onClick={() => onDelete(bookmark.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    )
}
