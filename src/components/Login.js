import { motion } from 'framer-motion'

export default function Login({ onLogin }) {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const stagger = {
        visible: { transition: { staggerChildren: 0.2 } }
    }

    return (
        <div className="flex flex-col min-h-screen text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative">
            {/* Abstract Background Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-[100%] blur-[120px] -z-10 pointer-events-none"
            ></motion.div>

            {/* Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between p-6 max-w-5xl mx-auto w-full relative z-10"
            >
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
                    className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-all px-5 py-2.5 rounded-full hover:bg-white shadow-sm hover:shadow-md ring-1 ring-slate-200 hover:ring-indigo-100 bg-white/50 backdrop-blur-sm"
                >
                    Sign In
                </button>
            </motion.nav>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="w-full max-w-4xl"
                >
                    

                    <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black tracking-tight mb-8 text-slate-900 drop-shadow-sm">
                        Bookmark <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">smart.</span>
                    </motion.h1>

                    <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-lg mx-auto mb-12 leading-relaxed font-medium">
                        A premium digital library for your links. <br />
                        Secure, fast, and synced across all your devices.
                    </motion.p>

                    <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 w-full max-w-xs mx-auto relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <button
                            onClick={onLogin}
                            className="relative bg-slate-900 text-white hover:bg-slate-800 px-8 py-4.5 rounded-xl flex items-center justify-center space-x-3 w-full font-bold transition-all shadow-2xl shadow-indigo-500/20 active:scale-[0.98] ring-1 ring-white/10"
                        >
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.88c-.05.32-.23 1.89-1.23 3.28-1.23 1.7-3.23 3.29-6.65 3.29-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8c2.92 0 5.09 1.15 6.16 2.16l2.36-2.36C19.31 2.39 16.3 1.5 12.48 1.5 6.74 1.5 2 6.24 2 12s4.74 10.5 10.48 10.5c3.05 0 5.37-1 6.88-2.58 1.56-1.63 1.98-4.13 1.98-5.32 0-.48-.04-.81-.08-1.12h-8.78z" />
                            </svg>
                            <span className="tracking-wide">Continue with Google</span>
                        </button>
                    </motion.div>
                </motion.div>
            </main>

            {/* Feature Grid - Glass Cards */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full px-6 py-24 relative z-10"
            >
                {[
                    {
                        title: 'Global Sync',
                        desc: 'Access your bookmarks from any device, anywhere. Your library stays perfectly synced across mobile, tablet, and desktop in real-time.',
                        color: 'bg-indigo-50 text-indigo-600',
                        icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )
                    },
                    {
                        title: 'Privacy First',
                        desc: 'Your data belongs to you. We use enterprise-grade encryption to ensure your reading habits and personal collection remain private and secure.',
                        color: 'bg-teal-50 text-teal-600',
                        icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        )
                    },
                    {
                        title: 'Blazing Fast',
                        desc: 'Built on Next.js and Supabase for millisecond-latency. Experience zero lag when searching, filtering, or adding new content.',
                        color: 'bg-amber-50 text-amber-600',
                        icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        )
                    }
                ].map((feature, i) => (
                    <motion.div variants={fadeIn} key={i} className="glass-card p-8 rounded-3xl border border-white/50 shadow-xl shadow-indigo-100/20 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 group">
                        <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {feature.icon}
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="py-8 text-center text-slate-400 text-sm font-medium relative z-10"
            >
                <p>&copy; 2026 Aurora. Crafted with precision.</p>
            </motion.footer>
        </div>
    )
}
