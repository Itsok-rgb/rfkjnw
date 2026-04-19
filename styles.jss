/* --- Tokens --- */
:root {
  --bg-deep: #120810;
  --bg-mid: #1f0c18;
  --rose: #e8a0bf;
  --rose-deep: #c76b8f;
  --gold: #f3d2a1;
  --cream: #fff5f8;
  --glass: rgba(255, 245, 248, 0.06);
  --glass-border: rgba(255, 200, 220, 0.18);
  --shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  --radius: 20px;
  --font-body: "Quicksand", system-ui, sans-serif;
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-script: "Great Vibes", cursive;
  --safe-bottom: env(safe-area-inset-bottom, 0);
  --safe-top: env(safe-area-inset-top, 0);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100dvh;
  font-family: var(--font-body);
  color: var(--cream);
  background: radial-gradient(120% 80% at 50% -10%, #3a1530 0%, var(--bg-deep) 45%, #050308 100%);
  overflow-x: hidden;
  padding-top: var(--safe-top);
  padding-bottom: calc(88px + var(--safe-bottom));
  --env-h: 88px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

code {
  font-size: 0.85em;
  color: var(--gold);
  background: rgba(0, 0, 0, 0.25);
  padding: 0.15em 0.4em;
  border-radius: 6px;
}

/* Floating hearts background */
.hearts-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ctext x='10' y='40' font-size='24' fill='%23e8a0bf' opacity='0.15'%3E♥%3C/text%3E%3C/svg%3E");
  animation: drift 80s linear infinite;
}

@keyframes drift {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 800px;
  }
}

/* Soft glow orbs */
.orbs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
  animation: orbFloat 18s ease-in-out infinite;
}

.orb--1 {
  width: min(55vw, 320px);
  height: min(55vw, 320px);
  background: radial-gradient(circle, rgba(232, 160, 191, 0.55), transparent 70%);
  top: -8%;
  left: -15%;
}

.orb--2 {
  width: min(45vw, 260px);
  height: min(45vw, 260px);
  background: radial-gradient(circle, rgba(243, 210, 161, 0.35), transparent 70%);
  bottom: 20%;
  right: -10%;
  animation-delay: -6s;
}

.orb--3 {
  width: min(40vw, 200px);
  height: min(40vw, 200px);
  background: radial-gradient(circle, rgba(199, 107, 143, 0.4), transparent 70%);
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: -12s;
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(18px, -12px) scale(1.05);
  }
  66% {
    transform: translate(-14px, 16px) scale(0.95);
  }
}

.orb--3 {
  animation-name: orbFloatCenter;
}

@keyframes orbFloatCenter {
  0%,
  100% {
    transform: translate(-50%, 0) scale(1);
  }
  50% {
    transform: translate(-50%, -20px) scale(1.08);
  }
}

/* Rising sparkles (filled by JS) */
.floaties {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.floaty {
  position: absolute;
  bottom: -2rem;
  font-size: clamp(0.85rem, 3vw, 1.1rem);
  opacity: 0;
  animation: floatyUp linear forwards;
}

@keyframes floatyUp {
  0% {
    opacity: 0;
    transform: translateY(0) rotate(0deg);
  }
  8% {
    opacity: 0.85;
  }
  100% {
    opacity: 0;
    transform: translateY(-110vh) rotate(360deg);
  }
}

/* Hero */
.hero {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: clamp(2.5rem, 8vw, 5rem) 1.25rem 2rem;
  max-width: 40rem;
  margin: 0 auto;
}

.hero__ring {
  position: absolute;
  left: 50%;
  top: 42%;
  width: min(92vw, 340px);
  height: min(92vw, 340px);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(243, 210, 161, 0.15);
  box-shadow:
    0 0 40px rgba(232, 160, 191, 0.12),
    inset 0 0 50px rgba(232, 160, 191, 0.06);
  animation: ringPulse 5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes ringPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.04);
    opacity: 1;
  }
}

.hero__eyebrow {
  letter-spacing: 0.35em;
  text-transform: uppercase;
  font-size: 0.7rem;
  color: var(--gold);
  opacity: 0.9;
  margin: 0 0 1rem;
  animation: fadeUp 0.9s ease both;
}

.hero__title {
  font-family: var(--font-script);
  font-size: clamp(3.5rem, 14vw, 5.5rem);
  font-weight: 400;
  line-height: 1;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, var(--rose) 50%, var(--gold) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 40px rgba(232, 160, 191, 0.35);
  animation: fadeUp 0.9s ease 0.1s both, shimmer 6s ease-in-out infinite;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

@keyframes shimmer {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.15);
  }
}

.hero__subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 4vw, 1.35rem);
  font-style: italic;
  color: rgba(255, 245, 248, 0.88);
  margin: 1.25rem auto 1.75rem;
  max-width: 28ch;
  animation: fadeUp 0.9s ease 0.2s both;
}

.hero__hint {
  font-size: 0.8rem;
  color: rgba(255, 245, 248, 0.55);
  margin-top: 1.5rem;
  animation: fadeUp 1s ease 0.5s both;
}

.hint--pulse {
  animation: fadeUp 1s ease 0.5s both, pulseHint 3s ease-in-out infinite 1.5s;
}

@keyframes pulseHint {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Buttons */
.btn {
  font-family: var(--font-body);
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.btn:active {
  transform: scale(0.97);
}

.btn--primary {
  color: var(--bg-deep);
  background: linear-gradient(135deg, var(--cream), var(--rose));
  box-shadow: 0 10px 35px rgba(232, 160, 191, 0.45);
  animation: fadeUp 0.9s ease 0.35s both;
}

.btn--primary:hover {
  box-shadow: 0 14px 45px rgba(232, 160, 191, 0.55);
}

.btn--ghost {
  color: var(--cream);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(8px);
}

.btn--ghost:hover {
  border-color: rgba(255, 220, 235, 0.45);
}

/* Sections */
main {
  position: relative;
  z-index: 1;
}

.section {
  padding: clamp(2rem, 6vw, 3.5rem) 1.25rem;
}

.section--sparkle {
  background: linear-gradient(180deg, transparent, rgba(255, 180, 210, 0.04));
}

.section--rose {
  background: radial-gradient(ellipse at 50% 0%, rgba(232, 160, 191, 0.12), transparent 55%);
}

.section--envelopes {
  background: linear-gradient(180deg, rgba(255, 200, 220, 0.05), transparent);
  position: relative;
}

.section--envelopes::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 22px 22px;
  pointer-events: none;
  opacity: 0.4;
  animation: twinkleGrid 12s linear infinite;
}

.section--envelopes .section__inner {
  position: relative;
  z-index: 1;
}

@keyframes twinkleGrid {
  to {
    opacity: 0.65;
    background-position: 22px 22px;
  }
}

.section--final {
  text-align: center;
  padding-bottom: 3rem;
}

.section__inner {
  max-width: 720px;
  margin: 0 auto;
}

.section__inner--narrow {
  max-width: 420px;
}

.section__title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--cream);
}

.section__lede {
  margin: 0 0 1.75rem;
  color: rgba(255, 245, 248, 0.72);
  font-size: 0.95rem;
  line-height: 1.55;
}

/* Timeline */
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.timeline__item {
  border-radius: var(--radius);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  overflow: hidden;
  box-shadow: var(--shadow);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s;
}

.timeline__item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline__item:has(.timeline__star[aria-expanded="true"]) {
  border-color: rgba(243, 210, 161, 0.35);
}

.timeline__star {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.15rem;
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.timeline__star::after {
  content: "✦";
  color: var(--gold);
  opacity: 0.6;
  font-size: 0.9rem;
  transition: transform 0.35s ease, opacity 0.35s;
}

.timeline__star[aria-expanded="true"]::after {
  transform: rotate(72deg) scale(1.2);
  opacity: 1;
}

.timeline__date {
  font-weight: 600;
  color: var(--rose);
  letter-spacing: 0.02em;
}

.timeline__card {
  padding: 0 1.15rem 1.15rem;
  animation: unfold 0.45s ease both;
}

.timeline__card h3 {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  margin: 0 0 0.35rem;
  color: var(--gold);
}

.timeline__card p {
  margin: 0;
  color: rgba(255, 245, 248, 0.82);
  line-height: 1.55;
  font-size: 0.95rem;
}

@keyframes unfold {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vault */
.vault {
  margin-bottom: 1rem;
}

.vault__label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 245, 248, 0.75);
}

.vault__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.vault__input {
  flex: 1 1 180px;
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: rgba(0, 0, 0, 0.25);
  color: var(--cream);
  padding: 0 1rem;
  font: inherit;
}

.vault__input:focus {
  outline: 2px solid var(--rose);
  outline-offset: 2px;
}

.vault__hint {
  font-size: 0.8rem;
  color: rgba(255, 245, 248, 0.45);
  margin: 0.65rem 0 0;
}

.vault__secret {
  position: relative;
  margin-top: 1.25rem;
  padding: 1.25rem;
  border-radius: var(--radius);
  background: linear-gradient(145deg, rgba(232, 160, 191, 0.15), rgba(0, 0, 0, 0.35));
  border: 1px solid rgba(243, 210, 161, 0.25);
  animation: popIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  overflow: hidden;
}

.vault__secret p {
  margin: 0 0 0.75rem;
  position: relative;
  z-index: 1;
}

.vault__love {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.5;
  color: var(--cream);
}

.vault__sparkles::before,
.vault__sparkles::after {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0 2px, transparent 3px) 0 0 / 24px 24px;
  animation: sparkleMove 14s linear infinite;
  pointer-events: none;
}

.vault__sparkles::after {
  animation-direction: reverse;
  opacity: 0.5;
}

@keyframes sparkleMove {
  to {
    transform: rotate(20deg) translateY(30px);
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Envelope grid */
.envelope-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.85rem;
}

@media (min-width: 520px) {
  .envelope-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem 1rem;
  }
}

@media (min-width: 720px) {
  .envelope-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.env-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
}

.env-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.env-btn:focus-visible {
  outline: 2px solid var(--rose);
  outline-offset: 6px;
  border-radius: 12px;
}

.env-btn__hint {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 245, 248, 0.45);
  transition: color 0.3s ease, transform 0.3s ease;
}

.env-btn[aria-expanded="true"] .env-btn__hint {
  color: var(--gold);
  transform: translateY(-2px);
}

/* CSS envelope */
.env {
  position: relative;
  width: 100px;
  height: 68px;
  perspective: 200px;
  transform-style: preserve-3d;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.4));
  transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.env-btn:hover .env,
.env-btn:focus-visible .env {
  transform: translateY(-4px) scale(1.03);
}

.env-btn[aria-expanded="true"] .env {
  transform: translateY(-2px) scale(1.02);
}

.env__pocket {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70%;
  background: linear-gradient(165deg, #4a2840 0%, #2c1528 100%);
  border-radius: 0 0 8px 8px;
  border: 1px solid rgba(255, 200, 220, 0.2);
  box-shadow: inset 0 8px 20px rgba(0, 0, 0, 0.35);
}

.env__pocket::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 28px solid #3d2240;
  margin-left: auto;
  margin-right: auto;
  width: 0;
  filter: brightness(1.08);
}

.env__flap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 52%;
  background: linear-gradient(180deg, #6d3d5c 0%, #4a2840 100%);
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  transform-origin: 50% 0%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1);
  border-bottom: 1px solid rgba(255, 200, 220, 0.12);
  z-index: 2;
}

.env-btn[aria-expanded="true"] .env__flap {
  transform: rotateX(-155deg);
}

.env__wax {
  position: absolute;
  left: 50%;
  top: 38%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ffd4e5, #c76b8f);
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  line-height: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  transition: transform 0.4s ease, opacity 0.35s ease;
}

.env-btn[aria-expanded="true"] .env__wax {
  transform: translate(-50%, -50%) scale(0.85);
  opacity: 0.85;
}

.env-note {
  width: 100%;
  max-width: 220px;
  padding: 0.65rem 0.75rem;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(243, 210, 161, 0.22);
  font-size: 0.82rem;
  line-height: 1.45;
  color: rgba(255, 245, 248, 0.92);
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  animation: notePop 0.5s cubic-bezier(0.34, 1.35, 0.64, 1) both;
}

.env-note[hidden] {
  display: none;
}

@keyframes notePop {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 1rem;
  padding-bottom: calc(1rem + var(--safe-bottom));
}

.modal[hidden] {
  display: none;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(5, 3, 8, 0.72);
  backdrop-filter: blur(6px);
}

.modal__panel {
  position: relative;
  z-index: 1;
  width: min(100%, 480px);
  max-height: min(88vh, 720px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: calc(var(--radius) + 4px);
  background: linear-gradient(165deg, #2a1422, #150810);
  border: 1px solid rgba(255, 200, 220, 0.2);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.55);
  padding: 1.5rem 1.35rem 1.75rem;
  animation: letterIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes letterIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal__close {
  position: absolute;
  top: 0.65rem;
  right: 0.75rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: rgba(0, 0, 0, 0.3);
  color: var(--cream);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.modal__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: var(--gold);
}

.letter__body p {
  font-size: 0.98rem;
  line-height: 1.65;
  color: rgba(255, 245, 248, 0.9);
  margin: 0 0 0.9rem;
}

.letter__confession {
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--rose);
  background: rgba(232, 160, 191, 0.08);
  border-radius: 0 10px 10px 0;
}

.letter__signoff {
  margin-top: 1.25rem !important;
}

.signature {
  font-family: var(--font-script);
  font-size: 1.75rem;
  color: var(--rose);
}

/* Toast */
.toast {
  position: fixed;
  left: 50%;
  bottom: calc(96px + var(--safe-bottom));
  transform: translateX(-50%) translateY(12px);
  z-index: 60;
  max-width: min(90vw, 360px);
  padding: 0.85rem 1.1rem;
  border-radius: 14px;
  background: rgba(30, 10, 24, 0.92);
  border: 1px solid rgba(243, 210, 161, 0.35);
  color: var(--cream);
  font-size: 0.9rem;
  text-align: center;
  box-shadow: var(--shadow);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.toast.is-on {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Heart hold */
.final__text {
  color: rgba(255, 245, 248, 0.75);
  margin-bottom: 1rem;
}

.heart-lock {
  position: relative;
  width: 88px;
  height: 88px;
  margin: 0 auto;
  border-radius: 50%;
  border: 2px solid rgba(232, 160, 191, 0.5);
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12), transparent);
  cursor: pointer;
  display: grid;
  place-items: center;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.heart-lock__icon {
  font-size: 2.25rem;
  color: var(--rose);
  z-index: 1;
  animation: heartbeat 1.6s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.12);
  }
  30% {
    transform: scale(1);
  }
}

.heart-lock__fill {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: conic-gradient(var(--rose-deep) var(--hold, 0%), transparent 0);
  opacity: 0.35;
  transition: opacity 0.2s;
}

.heart-lock.is-holding .heart-lock__fill {
  opacity: 0.65;
}

.final__tiny {
  margin-top: 1rem;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--gold);
  animation: fadeUp 0.6s ease both;
}

/* Footer */
.footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem 1rem calc(2rem + var(--safe-bottom));
  color: rgba(255, 245, 248, 0.45);
  font-size: 0.85rem;
}

.footer__name {
  color: var(--rose);
  cursor: pointer;
}

.footer__egg {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  opacity: 0.55;
}

.moon {
  cursor: pointer;
  user-select: none;
  display: inline-block;
  transition: transform 0.3s ease;
}

.moon.is-spin {
  animation: moonSpin 0.6s ease;
}

@keyframes moonSpin {
  to {
    transform: rotate(180deg);
  }
}

/* FAB confetti */
.fab {
  position: fixed;
  right: calc(1rem + env(safe-area-inset-right, 0));
  bottom: calc(1rem + var(--safe-bottom));
  z-index: 40;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 220, 235, 0.35);
  background: linear-gradient(145deg, rgba(232, 160, 191, 0.35), rgba(0, 0, 0, 0.4));
  color: var(--cream);
  font-size: 1.35rem;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  -webkit-tap-highlight-color: transparent;
}

.fab:active {
  transform: scale(0.94);
}

.fx-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 35;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .hearts-bg {
    animation: none;
  }

  .orb,
  .floaty {
    animation: none !important;
  }

  .hero__ring {
    animation: none !important;
  }

  .env__flap {
    transition-duration: 0.15s;
  }
}
