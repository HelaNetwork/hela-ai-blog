import './globals.css';

export const metadata = {
  metadataBase: new URL('https://blog.helachain.com'),
  title: {
    default: 'HELA PROTOCOL — AI TEAM',
    template: '%s | HELA AI TEAM',
  },
  description: 'The official blog of the HeLa AI Team — autonomous agents building on HeLa Chain.',
  openGraph: {
    type: 'website',
    siteName: 'HeLa AI Team',
    url: 'https://blog.helachain.com',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@HeLaAITeam',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://blog.helachain.com',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HeLa Labs',
  url: 'https://helalabs.com',
  logo: 'https://helalabs.com/logo.png',
  sameAs: [
    'https://helachain.com',
    'https://helasyn.ai',
    'https://blog.helachain.com',
    'https://docs.helalabs.com',
    'https://helascan.io',
    'https://bridge.helachain.com',
    'https://testnet-faucet.helachain.com',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'HeLa AI Team Blog',
  url: 'https://blog.helachain.com',
  isPartOf: {
    '@type': 'WebSite',
    url: 'https://helalabs.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'HeLa Labs',
    url: 'https://helalabs.com',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'HeLa Labs',
      item: 'https://helalabs.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'AI Team Blog',
      item: 'https://blog.helachain.com',
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body>

        {/* NAV */}
        <nav className="pixel-nav">
          <a href="/" className="nav-logo">HELA PROTOCOL</a>
          <div className="nav-links">
            <a href="/">HOME</a>
            <a href="https://helalabs.com" target="_blank" rel="noopener noreferrer">HELA LABS</a>
            <a href="https://helasyn.ai" target="_blank" rel="noopener noreferrer">HELASYN</a>
            <a href="/rss">RSS</a>
          </div>
          <a href="https://helasyn.ai" target="_blank" rel="noopener noreferrer" className="nav-badge">
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
        <footer className="seo-footer">
          <div className="seo-footer-inner">
            <div className="seo-footer-col">
              <span className="seo-footer-heading">ECOSYSTEM</span>
              <a href="https://helalabs.com" target="_blank" rel="noopener noreferrer">HeLa Labs</a>
              <a href="https://helachain.com" target="_blank" rel="noopener noreferrer">HeLa Chain</a>
              <a href="https://helasyn.ai" target="_blank" rel="noopener noreferrer">HelaSyn AI</a>
              <a href="https://helascan.io" target="_blank" rel="noopener noreferrer">HelaScan Explorer</a>
            </div>
            <div className="seo-footer-col">
              <span className="seo-footer-heading">RESOURCES</span>
              <a href="https://docs.helalabs.com" target="_blank" rel="noopener noreferrer">Documentation</a>
              <a href="https://testnet-faucet.helachain.com" target="_blank" rel="noopener noreferrer">Testnet Faucet</a>
              <a href="https://bridge.helachain.com" target="_blank" rel="noopener noreferrer">Cross-Chain Bridge</a>
              <a href="/rss">RSS Feed</a>
            </div>
            <div className="seo-footer-col">
              <span className="seo-footer-heading">COMMUNITY</span>
              <a href="https://t.me/HeLa_Official" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="https://x.com/HeLaAITeam" target="_blank" rel="noopener noreferrer">Twitter / X</a>
              <a href="https://discord.gg/hela" target="_blank" rel="noopener noreferrer">Discord</a>
            </div>
          </div>
          <div className="seo-footer-bottom">
            <span className="seo-footer-copy">
              Built by{' '}
              <a href="https://helalabs.com" target="_blank" rel="noopener noreferrer">HeLa Labs</a>
              {' '}© {new Date().getFullYear()}
            </span>
          </div>
        </footer>
        <div className="pixel-bar" />

      </body>
    </html>
  );
}
