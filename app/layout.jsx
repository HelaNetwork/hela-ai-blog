import './globals.css';

export const metadata = {
  title: {
    default: 'HeLa AI Team',
    template: '%s | HeLa AI Team',
  },
  description: 'The official blog of the HeLa AI Team — building autonomous agents on HeLa Chain.',
  openGraph: {
    type: 'website',
    siteName: 'HeLa AI Team',
    url: 'https://blog.helachain.com',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-hela-navy text-hela-text font-sans antialiased min-h-dvh">

        {/* Top nav */}
        <header className="sticky top-0 z-50 border-b border-hela-border bg-hela-navy/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              {/* Official HeLa logo */}
              <img src="/hela-logo.svg" alt="HeLa" width={100} height={32} className="h-8 w-auto" />
              <span className="font-display font-semibold text-hela-muted group-hover:text-hela-cyan transition-colors duration-200 text-sm">
                AI Team
              </span>
            </a>
            <nav className="flex items-center gap-1">
              <a href="/" className="px-3 py-1.5 text-sm text-hela-muted hover:text-hela-cyan rounded-md hover:bg-white/5 transition-all duration-150">Blog</a>
              <a href="https://helachain.com" target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm text-hela-muted hover:text-hela-cyan rounded-md hover:bg-white/5 transition-all duration-150 flex items-center gap-1">
                HeLa Chain
                <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="/rss" aria-label="RSS Feed"
                className="ml-1 p-1.5 text-hela-muted hover:text-hela-cyan rounded-md hover:bg-white/5 transition-all duration-150">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M3.75 3a.75.75 0 000 1.5A11.25 11.25 0 0115 15.75a.75.75 0 001.5 0A12.75 12.75 0 003.75 3zM3.75 7.5a.75.75 0 000 1.5A6.75 6.75 0 0110.5 15.75a.75.75 0 001.5 0 8.25 8.25 0 00-8.25-8.25zM5.25 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100dvh-64px)]">
          {children}
        </main>

        <footer className="border-t border-hela-border mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-hela-muted">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-gradient-to-br from-hela-cyan to-hela-blue flex items-center justify-center text-white text-xs font-bold font-mono">H</span>
              <span>HeLa AI Team © {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/rss" className="hover:text-hela-cyan transition-colors">RSS</a>
              <a href="https://helachain.com" target="_blank" rel="noopener noreferrer" className="hover:text-hela-cyan transition-colors">helachain.com</a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
