import { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';

import logoUt from '../assets/logo-ut.png';
import pakLoudy from '../assets/pak-loudy.png';

const FORM_LINK = 'https://forms.office.com/r/wutTs0KZfC?origin=lprLink';

const SHIMMER_STYLE = `
  /* ── Shimmer text utama ── */
  @keyframes goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes sweepLight {
    0%   { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
    15%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { transform: translateX(120%)  skewX(-20deg); opacity: 0; }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1.0; }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0px)   scale(1);   opacity: 0.8; }
    50%  { transform: translateY(-18px) scale(1.3); opacity: 1;   }
    100% { transform: translateY(0px)   scale(1);   opacity: 0.8; }
  }
  @keyframes borderGlow {
    0%, 100% { box-shadow: 0 0 12px rgba(212,160,23,0.25), inset 0 0 12px rgba(212,160,23,0.05); }
    50%       { box-shadow: 0 0 28px rgba(212,160,23,0.55), inset 0 0 20px rgba(212,160,23,0.12); }
  }
  @keyframes scanLine {
    0%   { top: 0%; }
    100% { top: 100%; }
  }

  /* ── Shimmer text class ── */
  .gold-shimmer-text {
    position: relative;
    display: inline-block;
    background: linear-gradient(
      105deg,
      #7a5200 0%,
      #c8870a 15%,
      #f5c842 30%,
      #ffe88a 40%,
      #ffffff 48%,
      #ffe88a 56%,
      #f5c842 65%,
      #c8870a 80%,
      #7a5200 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: goldShimmer 3.5s linear infinite;
    filter: drop-shadow(0 0 8px rgba(245,200,66,0.45));
  }

  /* Highlight sweep di atas text */
  .gold-shimmer-text::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255,255,255,0.55) 50%,
      transparent 70%
    );
    animation: sweepLight 3.5s linear infinite;
    pointer-events: none;
    z-index: 2;
    mix-blend-mode: overlay;
  }

  /* ── Subtitle shimmer (lebih subtle) ── */
  .gold-shimmer-subtle {
    background: linear-gradient(
      105deg,
      #c8870a 0%,
      #f5c842 25%,
      #ffe8a0 50%,
      #f5c842 75%,
      #c8870a 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: goldShimmer 4s linear infinite;
    animation-delay: -1s;
  }

  /* ── Glow border card ── */
  .gold-glow-card {
    animation: borderGlow 3s ease-in-out infinite;
  }

  /* ── Partikel bintang ── */
  .gold-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: radial-gradient(circle, #fff 0%, #f5c842 50%, transparent 100%);
    animation: particleDrift var(--dur, 3s) ease-in-out infinite;
    animation-delay: var(--delay, 0s);
  }

  /* ── Scan line (opsional, efek layar) ── */
  .scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(245,200,66,0.15), transparent);
    animation: scanLine 6s linear infinite;
    pointer-events: none;
    z-index: 5;
  }

  /* ── Divider berkilau ── */
  @keyframes dividerShimmer {
    0%   { background-position: -100% 0; }
    100% { background-position:  200% 0; }
  }
  .gold-divider-shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      #c8870a 20%,
      #f5c842 40%,
      #ffffff 50%,
      #f5c842 60%,
      #c8870a 80%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: dividerShimmer 3s linear infinite;
  }
`;

const PARTICLES = [
  { top: '12%', left: '8%', dur: '3.2s', delay: '0s' },
  { top: '28%', left: '14%', dur: '4.1s', delay: '-1.2s' },
  { top: '45%', left: '6%', dur: '2.8s', delay: '-0.6s' },
  { top: '60%', left: '18%', dur: '3.7s', delay: '-2.1s' },
  { top: '72%', left: '10%', dur: '4.5s', delay: '-0.4s' },
  { top: '15%', left: '22%', dur: '3.0s', delay: '-1.7s' },
  { top: '85%', left: '20%', dur: '2.6s', delay: '-0.9s' },
];

function AnimCounter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 30);
    const t = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(start);
      if (start >= target) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [target]);
  return <>{val.toLocaleString()}</>;
}

export default function TributeHero({
  messageCount,
}: {
  messageCount: number;
}) {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!styleRef.current) {
      const el = document.createElement('style');
      el.textContent = SHIMMER_STYLE;
      document.head.appendChild(el);
      styleRef.current = el;
    }
    return () => {
      styleRef.current?.remove();
    };
  }, []);

  return (
    <div className="relative h-screen flex items-stretch overflow-hidden bg-black select-none">
      <div className="scan-line" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 35% 50%, rgba(120,80,0,0.55) 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 75% 80%, rgba(80,50,0,0.3) 0%, transparent 60%),
              radial-gradient(ellipse 30% 25% at 20% 20%, rgba(180,120,0,0.15) 0%, transparent 55%),
              #000
            `,
          }}
        />
        {[
          { w: 180, t: '10%', l: '5%', o: 0.07 },
          { w: 120, t: '55%', l: '15%', o: 0.05 },
          { w: 240, t: '30%', l: '30%', o: 0.04 },
          { w: 90, t: '70%', l: '40%', o: 0.06 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: b.w,
              height: b.w,
              top: b.t,
              left: b.l,
              background: `radial-gradient(circle, rgba(212,160,23,${b.o}) 0%, transparent 70%)`,
              filter: 'blur(24px)',
              animation: `glowPulse ${2.5 + i * 0.7}s ease-in-out infinite`,
              animationDelay: `${-i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="gold-particle z-10"
          style={
            {
              top: p.top,
              left: p.left,
              '--dur': p.dur,
              '--delay': p.delay,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="relative z-10 w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-8 lg:px-16 shrink-0 py-8 lg:py-0">
        <img
          src={logoUt}
          className="h-8 sm:h-10 lg:h-14 w-auto object-contain self-start mb-6 lg:mb-10 drop-shadow-lg"
          alt="United Tractors"
        />
        <div className="flex items-center gap-3 mb-5">
          <div
            className="gold-divider-shimmer"
            style={{ width: 32, height: 1.5 }}
          />
          <span className="gold-shimmer-subtle text-xs tracking-[0.28em] font-semibold uppercase">
            Tribute to
          </span>
        </div>
        <h1
          className="gold-shimmer-text font-black leading-[1.0] mb-2"
          style={{
            fontSize: 'clamp(44px, 5.5vw, 78px)',
            fontFamily: '"Playfair Display", "Georgia", serif',
          }}
        >
          Pak Loudy
        </h1>
        <h1
          className="gold-shimmer-text font-black leading-[1.0] mb-5"
          style={{
            fontSize: 'clamp(44px, 5.5vw, 78px)',
            fontFamily: '"Playfair Display", "Georgia", serif',
            animationDelay: '-0.8s',
          }}
        >
          Irwanto Ellias
        </h1>
        <p
          className="gold-shimmer-subtle text-sm tracking-widest font-light italic mb-8"
          style={{ animationDelay: '-1.5s' }}
        >
          Celebrating His Dedication &amp; Leadership
        </p>
        <div
          className="gold-divider-shimmer mb-6 lg:mb-8 rounded-full"
          style={{ width: 48, height: 2 }}
        />
        <p
          className="gold-shimmer-subtle text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.22em] font-bold uppercase mb-3"
          style={{ animationDelay: '-2s' }}
        >
          Masa Purna Bakti
        </p>
        <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-loose max-w-md mb-6 lg:mb-10 font-light">
          Terima kasih atas pengabdian, inspirasi
          <br />
          dan keteladanan yang akan selalu kami kenang.
        </p>
        <div className="flex gap-6 lg:gap-10 mb-6 lg:mb-10">
          {[
            { val: messageCount, label: 'Pesan Apresiasi' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="gold-shimmer-text font-black leading-none"
                style={{
                  fontSize: 'clamp(24px, 2.5vw, 48px)',
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                <AnimCounter target={s.val} />
              </div>
              <div className="text-[8px] sm:text-[9px] lg:text-[10px] text-gray-500 tracking-widest uppercase mt-1.5 lg:mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div
          className="gold-glow-card relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 rounded-lg sm:rounded-2xl p-3 sm:p-5 overflow-hidden"
          style={{
            background: 'rgba(212,160,23,0.06)',
            border: '1px solid rgba(212,160,23,0.3)',
            maxWidth: 400,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 30%, rgba(255,240,150,0.06) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'dividerShimmer 4s linear infinite',
            }}
          />
          <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 relative z-10">
            <QRCode value={FORM_LINK} size={70} />
          </div>
          <div className="relative z-10 text-center sm:text-left">
            <p className="gold-shimmer-subtle text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
              Scan QR untuk
            </p>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              mengirim pesan apresiasi
            </p>
            <p className="text-[8px] sm:text-[10px] text-gray-600 mt-1.5 sm:mt-2 leading-relaxed break-all">
              {FORM_LINK}
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex-1 flex items-end justify-center overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
          style={{
            height: '80%',
            background:
              'radial-gradient(ellipse 70% 60% at 50% 90%, rgba(180,120,0,0.35) 0%, transparent 65%)',
            filter: 'blur(8px)',
            animation: 'glowPulse 4s ease-in-out infinite',
          }}
        />
        <img
          src={pakLoudy}
          alt="Pak Loudy Irwanto Ellias"
          className="relative z-10 h-[120%] w-auto object-contain object-bottom"
          style={{
            filter:
              'drop-shadow(0 0 40px rgba(212,160,23,0.3)) drop-shadow(0 20px 60px rgba(0,0,0,0.8))',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to top, #000, transparent)' }}
        />
      </div>
    </div>
  );
}
