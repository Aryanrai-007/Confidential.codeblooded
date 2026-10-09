'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useBeatStore } from '@/lib/beat-store';

const HeartScene = dynamic(() => import('@/components/heart-scene'), {
  ssr: false,
  loading: () => <div className="scene-fallback" aria-hidden="true"><span className="fallback-heart" /></div>,
});

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const beat = useBeatStore((state) => state.beat);

  useEffect(() => {
    const alreadyEntered = sessionStorage.getItem('cb-entered') === '1';
    if (alreadyEntered) setEntered(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(reduce);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--beat', String(beat));
  }, [beat]);

  function enterWorld() {
    sessionStorage.setItem('cb-entered', '1');
    setEntered(true);
  }

  return (
    <main className={`site-shell ${entered ? 'is-entered' : 'is-intro'} ${reduced ? 'reduce-motion' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="masthead" aria-label="Codeblooded">
        <a className="wordmark" href="#top" aria-label="Codeblooded home">CODEBLOODED<span className="wordmark-dot">.</span></a>
        <span className="masthead-note">A living system for builders</span>
        <span className="status"><i /> SYSTEM {loaded ? 'READY' : 'WAKING'}</span>
      </header>

      {!entered && (
        <section className="intro-screen" aria-label="Introduction">
          <div className="intro-kicker">CODEBLOODED / ENTRY SEQUENCE</div>
          <div className="intro-center">
            <div className="intro-ring" aria-hidden="true"><span /></div>
            <p className="eyebrow">YOU ARE AT THE THRESHOLD</p>
            <h1>ENTER THE WORLD,<br /><em>THROUGH THE HEART.</em></h1>
            <p className="intro-copy">The signal is alive. The work begins on the other side.</p>
            <button className="enter-button" onClick={enterWorld} type="button">
              <span>Enter the world</span><span className="button-arrow" aria-hidden="true">↗</span>
            </button>
            <p className="microcopy">SOUND OFF BY DEFAULT · {reduced ? 'REDUCED MOTION' : '66 BPM / LIVING SYSTEM'}</p>
          </div>
          <div className="intro-foot"><span>CB—001</span><span>NO SHORTCUTS. NO STATIC.</span><span>SCROLL TO FEEL IT</span></div>
        </section>
      )}

      <section id="top" className="hero" aria-label="Codeblooded introduction">
        <div className="hero-copy" id="main-content">
          <p className="eyebrow hero-eyebrow"><span className="red-rule" /> BUILT FOR THE PRESSURE</p>
          <h2>BUILT IN BLOOD.<br /><span>PROVEN IN CODE.</span></h2>
          <p className="hero-description">We build after the idea gets uncomfortable. We test what breaks. We ship what holds. Codeblooded is for people who want their work to stand up under pressure.</p>
          <div className="hero-actions">
            <button className="enter-button hero-enter" onClick={() => setEntered(true)} type="button"><span>Enter the world</span><span className="button-arrow" aria-hidden="true">↗</span></button>
            <a className="text-link" href="#signal">Read the signal <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract extruded crimson heart study">
          <div className="art-index"><span>FORM STUDY / 01</span><span>EXTRUDED RELIEF</span></div>
          <HeartScene onReady={() => setLoaded(true)} reducedMotion={reduced} />
          <div className="art-caption"><span className="caption-line" /> <span>NOT A LOGO REPLACEMENT — TEMPORARY 3D STUDY</span></div>
        </div>
        <div className="hero-coordinate">28° 36' N / 77° 12' E <span>—</span> ORIGIN: UNKNOWN</div>
      </section>

      <section id="signal" className="signal-section">
        <div className="section-index"><span>01 / THE SIGNAL</span><span>ONE HEARTBEAT. ONE STANDARD.</span></div>
        <div className="signal-grid">
          <h2>THE WORK<br /><em>IS THE SIGNAL.</em></h2>
          <div>
            <p>Less performance. More proof. Make something worth testing, put it under pressure, and let the work speak.</p>
            <p className="small-note">A first look at Codeblooded. The wider journey waits until this foundation earns it.</p>
          </div>
        </div>
        <div className="heartbeat-meter" aria-label="Heartbeat animation, approximately 66 beats per minute">
          <div className="meter-label"><span>LIVE RHYTHM</span><span>~66 BPM / LUB—DUB</span></div>
          <svg viewBox="0 0 800 110" role="img" aria-label="Illustrated double heartbeat waveform">
            <path className="wave-baseline" d="M0 58 H800" />
            <path className="wave-line" d="M0 58 H110 L126 58 L142 15 L157 89 L178 58 H205 L224 34 L240 75 L256 58 H800" />
          </svg>
          <div className="meter-controls">
            <button type="button" className={soundOn ? 'utility active' : 'utility'} onClick={() => setSoundOn((v) => !v)} aria-pressed={soundOn}>
              <span className="utility-dot" /> SOUND {soundOn ? 'ON' : 'OFF'}
            </button>
            <button type="button" className={reduced ? 'utility active' : 'utility'} onClick={() => setReduced((v) => !v)} aria-pressed={reduced}>
              <span className="utility-dot" /> REDUCE EFFECTS {reduced ? 'ON' : 'OFF'}
            </button>
          </div>
          <p className="small-note">{soundOn ? 'Sound toggle is a visual prototype in this spike; no audio file is connected yet.' : 'Audio remains off by default. This spike does not play audio.'}</p>
        </div>
      </section>

      <footer className="site-footer"><span>CODEBLOODED © 2026</span><span>BUILT IN BLOOD. PROVEN IN CODE.</span><a href="https://github.com/Aryanrai-007/Confidential.codeblooded" target="_blank" rel="noreferrer">THE REPOSITORY ↗</a></footer>
    </main>
  );
}
