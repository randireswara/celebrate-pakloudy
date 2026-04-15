import { useEffect, useRef } from "react";
import QRCode from "react-qr-code";

import logoUt from "../assets/logo-ut-black.png";
import line from "../assets/linegradient.png";

const FORM_LINK = "https://forms.office.com/r/wutTs0KZfC?origin=lprLink";

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
      #000000 20%,
      #c3960e 40%,
      #980606 50%,
      #423203 60%,
      #000000 80%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: dividerShimmer 3s linear infinite;
  }
`;

const PARTICLES = [
  { top: "12%", left: "8%", dur: "3.2s", delay: "0s" },
  { top: "28%", left: "14%", dur: "4.1s", delay: "-1.2s" },
  { top: "45%", left: "6%", dur: "2.8s", delay: "-0.6s" },
  { top: "60%", left: "18%", dur: "3.7s", delay: "-2.1s" },
  { top: "72%", left: "10%", dur: "4.5s", delay: "-0.4s" },
  { top: "15%", left: "22%", dur: "3.0s", delay: "-1.7s" },
  { top: "85%", left: "20%", dur: "2.6s", delay: "-0.9s" },
];

export default function TributeHero() {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!styleRef.current) {
      const el = document.createElement("style");
      el.textContent = SHIMMER_STYLE;
      document.head.appendChild(el);
      styleRef.current = el;
    }
    return () => {
      styleRef.current?.remove();
    };
  }, []);

  return (
    <div className="relative h-screen flex items-stretch overflow-hidden select-none">
      <div className="scan-line" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" />
        {[
          { w: 180, t: "10%", l: "5%", o: 0.07 },
          { w: 120, t: "55%", l: "15%", o: 0.05 },
          { w: 240, t: "30%", l: "30%", o: 0.04 },
          { w: 90, t: "70%", l: "40%", o: 0.06 },
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
              filter: "blur(24px)",
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
              "--dur": p.dur,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="relative z-11 w-full lg:w-[70%] flex flex-col justify-center px-6 sm:px-8 lg:px-16 shrink-0 py-8 lg:py-0">
        <img
          src={logoUt}
          className="h-8 sm:h-10 lg:h-14 w-auto object-contain self-start mb-6 lg:mb-10 drop-shadow-lg"
          alt="United Tractors"
        />

        <p className="text-black text-[28px] font-inter leading-[1.5] max-w-md mb-3 font-regular">
          The Journey of
        </p>

        <h1 className="text-black text-[96px] leading-[1.0] mb-2 font-prata">
          Loudy
        </h1>
        <h1 className="text-black text-[96px] leading-[1.0] mb-2 font-prata">
          Irwanto
        </h1>
        <h1 className="text-black text-[96px] leading-[1.0] mb-2 font-prata">
          Ellias
        </h1>

        <div
          className="mb-6 lg:mb-8 rounded-full w-[50%] bg-gradient-to-r from-transparent via-black to-transparent blur-[1px] opacity-70 "
          style={{ height: 2 }}
        />

        <div className="bg-transparent backdrop-blur-md p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0  w-fit relative z-10 flex flex-col justify-center items-center border-4 border-white shadow-lg shadow-black-400/30">
          <QRCode value={FORM_LINK} size={200} />
          <p className="font-inter text-center text-black text-[20px] font-semibold tracking-wider mb-1 mt-2">
            Kirim pesan dan <br /> kesan disini!
          </p>
        </div>
      </div>
    </div>
  );
}
