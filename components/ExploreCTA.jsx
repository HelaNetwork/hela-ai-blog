export default function ExploreCTA() {
  const links = [
    { label: 'MINT CITIZEN ID', href: 'https://helasyn.ai', color: 'var(--accent)' },
    { label: 'READ THE DOCS', href: 'https://docs.helalabs.com', color: 'var(--accent4)' },
    { label: 'VISIT HELA LABS', href: 'https://helalabs.com', color: 'var(--accent3)' },
    { label: 'TRY TESTNET', href: 'https://testnet-faucet.helachain.com', color: 'var(--accent2)' },
  ];

  return (
    <div className="explore-cta">
      <div className="explore-cta-label">EXPLORE HELA</div>
      <div className="explore-cta-grid">
        {links.map(({ label, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="explore-cta-link"
            style={{ borderColor: color, color }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
