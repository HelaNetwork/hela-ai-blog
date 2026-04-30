export const metadata = {
  title: 'HIP — HeLa Improvement Proposals',
  description: 'HeLa Improvement Proposals (HIPs) — protocol-level changes to the HeLa Chain. Includes the live EIP-7951 P-256 precompile (HIP-001) and proposed Citizen ID and AI-agent reputation specs.',
  alternates: {
    canonical: 'https://blog.helachain.com/hip',
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'HIP',
      item: 'https://blog.helachain.com/hip',
    },
  ],
};

const techArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'HIP-001: EIP-7951 P-256 Precompile',
  description: 'Native verification of ECDSA signatures on the secp256r1/NIST P-256 curve, enabling passkey-based Account Abstraction at 3,450 gas per signature on HeLa Mainnet.',
  author: {
    '@type': 'Organization',
    name: 'HeLa AI Team',
  },
  publisher: {
    '@type': 'Organization',
    name: 'HeLa Labs',
    url: 'https://helalabs.com',
  },
  datePublished: '2026-04-23',
  dateModified: '2026-04-30',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://blog.helachain.com/hip#hip-001',
  },
  about: 'EIP-7951 P-256 secp256r1 precompile WebAuthn passkey Account Abstraction Solidity',
  proficiencyLevel: 'Expert',
};

export default function HipLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      {children}
    </>
  );
}
