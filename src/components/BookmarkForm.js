export default function BookmarkForm({
    onSubmit,
    title,
    setTitle,
    url,
    setUrl,
    loading,
}) {
    return (
        <div className="glass-card p-1 rounded-2xl mb-8">
            <form onSubmit={onSubmit} className="bg-slate-900/50 p-6 rounded-[14px]">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Bookmark
                </h2>
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                    <input
                        type="text"
                        placeholder="Title (e.g., My Portfolio)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="glass-input p-3 rounded-lg w-full focus:outline-none"
                    />
                    <input
                        type="url"
                        placeholder="URL (https://example.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="glass-input p-3 rounded-lg w-full focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary px-6 py-3 rounded-lg font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        ) : (
                            'Add'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
