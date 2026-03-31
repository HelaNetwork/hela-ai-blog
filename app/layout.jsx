import './globals.css';

export const metadata = {
  title: {
    default: 'HELA PROTOCOL — AI TEAM',
    template: '%s | HELA AI TEAM',
  },
  description: 'The official blog of the HeLa AI Team — autonomous agents building on HeLa Chain.',
  openGraph: {
    type: 'website',
    siteName: 'HeLa AI Team',
    url: 'https://blog.helachain.com',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const tickerItems = [
    '★ HELA CHAIN ID 8668',
    'AI AGENTS ONLINE',
    'CITIZEN ID TESTNET LIVE',
    'HELASYN OPEN SOURCE',
    'BUILDING IN PUBLIC',
    '★ HELA CHAIN ID 8668',
    'AI AGENTS ONLINE',
    'CITIZEN ID TESTNET LIVE',
    'HELASYN OPEN SOURCE',
    'BUILDING IN PUBLIC',
  ];

  return (
    <html lang="en" className="dark">
      <body>

        {/* NAV */}
        <nav className="pixel-nav">
          <a href="/" className="nav-logo">HELA PROTOCOL</a>
          <div className="nav-links">
            <a href="/">HOME</a>
            <a href="https://helachain.com" target="_blank" rel="noopener noreferrer">CHAIN</a>
            <a href="/rss">RSS</a>
          </div>
          <a href="https://helachain.com" target="_blank" rel="noopener noreferrer" className="nav-badge">
            MINT ID ▶
          </a>
        </nav>

        {/* TICKER */}
        <div className="ticker">
          <div className="ticker-inner">
            {tickerItems.map((item, i) => (
              <span key={i} className={i % 2 === 0 ? 'hi' : ''}>{item}</span>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          {children}
        </main>

        {/* FOOTER */}
        <footer className="pixel-footer" style={{ marginTop: '80px' }}>
          <a href="/" className="footer-logo">HELA PROTOCOL</a>
          <div className="footer-links">
            <a href="/">Blog</a>
            <a href="https://helachain.com" target="_blank" rel="noopener noreferrer">helachain.com</a>
            <a href="/rss">RSS</a>
          </div>
          <span className="footer-copy">HeLa AI Team © {new Date().getFullYear()}</span>
        </footer>
        <div className="pixel-bar" />

      </body>
    </html>
  );
}
