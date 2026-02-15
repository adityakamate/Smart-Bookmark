export default function BookmarkItem({ bookmark, onDelete }) {
    // Simple favicon grabber
    const getFavicon = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        } catch {
            return null;
        }
    }

    return (
        <div
            className="glass-card group flex items-center justify-between p-4 rounded-xl mb-3 relative overflow-hidden"
        >
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="flex items-center space-x-4 relative z-10 w-full overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 border border-white/5">
                    <img src={getFavicon(bookmark.url)} alt="" className="w-6 h-6 opacity-80" onError={(e) => e.target.style.display = 'none'} />
                </div>

                <div className="flex-1 min-w-0">
                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-200 font-medium hover:text-indigo-400 transition-colors truncate block"
                    >
                        {bookmark.title}
                    </a>
                    <span className="text-xs text-slate-500 truncate block">{bookmark.url}</span>
                </div>
            </div>

            <button
                onClick={() => onDelete(bookmark.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all relative z-10 ml-4"
                title="Delete"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}
