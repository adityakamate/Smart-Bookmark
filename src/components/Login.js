export default function Login({ onLogin }) {
    return (
        <div className="flex flex-col min-h-screen text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>

            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 max-w-5xl mx-auto w-full relative z-10">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 ring-1 ring-white/50">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Aurora</span>
                </div>
                <button
                    onClick={onLogin}
                    className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-white/50"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10">

                <div className="mb-8 animate-fade-in-up">
                    <span className="px-4 py-1.5 rounded-full border border-indigo-100/50 bg-white/60 backdrop-blur-md text-xs font-semibold text-indigo-600 shadow-sm">
                        ✨ Redefining Bookmarks
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 text-slate-900 drop-shadow-sm">
                    Bookmark <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">smart.</span>
                </h1>

                <p className="text-xl text-slate-600 max-w-lg mb-12 leading-relaxed font-medium">
                    A premium digital library for your links. <br />
                    Secure, fast, and synced across all your devices.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xs relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <button
                        onClick={onLogin}
                        className="relative bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-xl flex items-center justify-center space-x-3 w-full font-bold transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.48 10.92v3.28h7.88c-.05.32-.23 1.89-1.23 3.28-1.23 1.7-3.23 3.29-6.65 3.29-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8c2.92 0 5.09 1.15 6.16 2.16l2.36-2.36C19.31 2.39 16.3 1.5 12.48 1.5 6.74 1.5 2 6.24 2 12s4.74 10.5 10.48 10.5c3.05 0 5.37-1 6.88-2.58 1.56-1.63 1.98-4.13 1.98-5.32 0-.48-.04-.81-.08-1.12h-8.78z" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>
            </main>

            {/* Feature Grid - Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full px-6 py-24 border-t border-slate-200/60 relative z-10">
                {[
                    { title: 'Global Sync', desc: 'Your links, everywhere.', color: 'bg-indigo-50 text-indigo-600' },
                    { title: 'Privacy First', desc: 'Encrypted & secure.', color: 'bg-teal-50 text-teal-600' },
                    { title: 'Blazing Fast', desc: 'Instant access.', color: 'bg-amber-50 text-amber-600' }
                ].map((feature, i) => (
                    <div key={i} className="glass-card p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                        <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-500 text-sm font-medium">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <footer className="py-8 text-center text-slate-400 text-sm font-medium relative z-10">
                <p>&copy; 2026 Aurora. Crafted with precision.</p>
            </footer>
        </div>
    )
}
