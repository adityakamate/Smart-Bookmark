export default function BookmarkForm({
    onSubmit,
    title,
    setTitle,
    url,
    setUrl,
    loading,
}) {
    return (
        <div className="dashboard-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <span className="text-indigo-600 mr-2 text-xl">+</span> Add New Bookmark
            </h2>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Title (e.g., My Portfolio)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="dashboard-input p-3 md:p-4 w-full md:w-5/12 text-sm"
                    />
                    <input
                        type="url"
                        placeholder="URL (https://example.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="dashboard-input p-3 md:p-4 w-full md:w-5/12 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-aurora px-6 py-3 md:py-4 rounded-lg text-sm font-semibold whitespace-nowrap disabled:opacity-50 w-full md:w-2/12"
                    >
                        {loading ? '...' : 'Add'}
                    </button>
                </div>
            </form>
        </div>
    )
}
