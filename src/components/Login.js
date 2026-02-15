export default function Login({ onLogin }) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 max-w-5xl mx-auto w-full">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900">Aurora</span>
                </div>
                <button
                    onClick={onLogin}
                    className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <div className="mb-6 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-xs font-medium text-indigo-600">
                    Version 2.0
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900">
                    Bookmark <span className="text-indigo-600">smart.</span>
                </h1>

                <p className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed">
                    A minimal space for your digital library. <br />
                    Distraction-free and synced everywhere.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                    <button
                        onClick={onLogin}
                        className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg flex items-center justify-center space-x-2 w-full font-medium transition-all shadow-lg shadow-indigo-200"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.48 10.92v3.28h7.88c-.05.32-.23 1.89-1.23 3.28-1.23 1.7-3.23 3.29-6.65 3.29-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8c2.92 0 5.09 1.15 6.16 2.16l2.36-2.36C19.31 2.39 16.3 1.5 12.48 1.5 6.74 1.5 2 6.24 2 12s4.74 10.5 10.48 10.5c3.05 0 5.37-1 6.88-2.58 1.56-1.63 1.98-4.13 1.98-5.32 0-.48-.04-.81-.08-1.12h-8.78z" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>
            </main>

            {/* Feature Grid - Minimal with Color Pop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto w-full px-6 py-24 border-t border-slate-100">
                {[
                    { title: 'Global Sync', desc: 'Access everywhere.', color: 'text-indigo-600' },
                    { title: 'Private', desc: 'Encrypted & secure.', color: 'text-teal-600' },
                    { title: 'Fast', desc: 'Instant loading.', color: 'text-amber-600' }
                ].map((feature, i) => (
                    <div key={i} className="text-left group">
                        <div className={`mb-3 ${feature.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 mb-1">{feature.title}</h3>
                        <p className="text-slate-500 text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <footer className="py-8 text-center text-slate-400 text-sm">
                <p>&copy; 2026 Aurora.</p>
            </footer>
        </div>
    )
}
