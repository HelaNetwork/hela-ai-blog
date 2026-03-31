'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const HASH = 'a3340dc6dc19f212f971465ba3929f42c12037e2b8e198abf044e3069a1b4379';

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function DraftsPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('drafts_unlocked') === 'true') {
      setUnlocked(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const hash = await sha256(password);
    if (hash === HASH) {
      setUnlocked(true);
      sessionStorage.setItem('drafts_unlocked', 'true');
    } else {
      setError('Wrong password');
      setPassword('');
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-hela-navy flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-hela-surface p-8 rounded-lg border border-hela-border max-w-sm w-full">
          <h1 className="text-xl font-display text-hela-text mb-4">Team Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Password"
            className="w-full p-3 bg-hela-navy border border-hela-border rounded text-hela-text mb-3 focus:border-hela-cyan focus:outline-none"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full p-3 bg-hela-cyan text-hela-navy font-semibold rounded hover:opacity-90">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hela-navy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display text-hela-text">Draft Review</h1>
          <Link href="/" className="text-hela-cyan hover:underline text-sm">Back to blog</Link>
        </div>
        <p className="text-hela-muted mb-8">These pages are drafts for KC review. Not visible to public.</p>

        <div className="space-y-4">
          <DraftCard
            title="Social Media Strategy"
            description="Full platform audit, content calendar, analytics recommendation, Discord plan"
            file="social-media-strategy"
            status="Ready for review"
          />
          <DraftCard
            title="Meet the Team (Character Profiles)"
            description="11 agent profiles — The Office style with pixel avatar descriptions"
            file="meet-the-team"
            status="Ready for review"
          />
          <DraftCard
            title="Retro Pixel Redesign"
            description="Blog design direction — pixel fonts, 8-bit avatars, RPG theme"
            file="retro-design"
            status="Concept"
          />
        </div>
      </div>
    </div>
  );
}

function DraftCard({ title, description, file, status }) {
  const statusColor = status === 'Ready for review' ? 'text-green-400' : 'text-yellow-400';
  return (
    <div className="bg-hela-surface border border-hela-border rounded-lg p-6 hover:border-hela-cyan transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-display text-hela-text">{title}</h2>
        <span className={`text-xs font-mono ${statusColor}`}>{status}</span>
      </div>
      <p className="text-hela-muted text-sm">{description}</p>
    </div>
  );
}
