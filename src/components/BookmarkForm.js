export default function BookmarkForm({
    onSubmit,
    title,
    setTitle,
    url,
    setUrl,
    loading,
    tags = [],
    setTags,
    category,
    setCategory
}) {
    const [tagging, setTagging] = useState(false)

    const handleAutoTag = async () => {
        if (!url) return alert('Please enter a URL first')
        setTagging(true)
        try {
            const res = await fetch('/api/generate-tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, url })
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)

            if (data.category) setCategory(data.category)
            if (data.tags) setTags(data.tags)
        } catch (err) {
            console.error(err)
            alert(err.message || 'Failed to generate tags')
        } finally {
            setTagging(false)
        }
    }

    return (
        <div className="dashboard-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center justify-between">
                <span className="flex items-center"><span className="text-indigo-600 mr-2 text-xl">+</span> Add New Bookmark</span>
                <button
                    type="button"
                    onClick={handleAutoTag}
                    disabled={tagging || !url}
                    className="text-sm font-bold text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-full hover:bg-indigo-100 transition-all disabled:opacity-50 shadow-sm border border-indigo-100"
                >
                    {tagging ? '✨ Analyzing...' : '✨ Auto-Tag'}
                </button>
            </h2>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-4">
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

                    {/* Tags & Category Display */}
                    {(category || tags.length > 0) && (
                        <div className="flex items-center gap-3 text-sm animate-fade-in-up">
                            {category && (
                                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium border border-slate-200">
                                    {category}
                                </span>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, i) => (
                                    <span key={i} className="text-slate-500 italic">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

import { useState } from 'react'
