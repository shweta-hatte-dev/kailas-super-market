import type { ReactNode } from 'react';
import type { ArtShape, Product } from '../types';
import { getProduct } from '../data/lookup';

const parse = (h: string) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
/** amt -1..1: negative darkens, positive lightens */
export const shade = (hex: string, amt: number) => {
  const [r, g, b] = parse(hex); const t = amt < 0 ? 0 : 255; const k = Math.abs(amt);
  const f = (c: number) => Math.round(c + (t - c) * k);
  return `rgb(${f(r)},${f(g)},${f(b)})`;
};

const CREAM = '#FAF7F0';
const Label = ({ x, y, w, h, text }: { x: number; y: number; w: number; h: number; text: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={CREAM} />
    <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#222821"
      textLength={text.length > 7 ? w - 8 : undefined} lengthAdjust="spacingAndGlyphs">{text}</text>
  </g>
);

type Draw = (c: string, a: string, label: string) => ReactNode;
const shapes: Record<ArtShape, Draw> = {
  sack: (c, _a, l) => (<>
    <path d="M30 30 Q60 22 90 30 L98 100 Q60 110 22 100 Z" fill={c} />
    <path d="M30 30 Q60 38 90 30 L91 24 Q60 16 29 24 Z" fill={shade(c, -0.25)} />
    <path d="M30 30 L22 100 Q30 104 36 104 L42 33Z" fill="#fff" opacity=".22" />
    <Label x={36} y={58} w={48} h={26} text={l} /></>),
  bottle: (c, a, l) => (<>
    <rect x="51" y="10" width="18" height="12" rx="2" fill={a} />
    <path d="M52 22h16v10q14 6 14 18v48q0 8-8 8H46q-8 0-8-8V50q0-12 14-18Z" fill={c} />
    <rect x="44" y="38" width="4" height="52" rx="2" fill="#fff" opacity=".25" />
    <Label x={40} y={58} w={40} h={26} text={l} /></>),
  spray: (c, a, l) => (<>
    <rect x="50" y="10" width="22" height="10" rx="2" fill={a} />
    <rect x="70" y="12" width="14" height="5" rx="2" fill={a} />
    <rect x="54" y="20" width="14" height="10" fill={shade(a, -0.2)} />
    <path d="M48 30h26q10 4 10 16v52q0 8-8 8H46q-8 0-8-8V46q0-12 10-16Z" fill={c} />
    <Label x={42} y={58} w={36} h={26} text={l} /></>),
  carton: (c, _a, l) => (<>
    <path d="M34 40L60 22l26 18Z" fill={shade(c, -0.2)} />
    <rect x="34" y="40" width="52" height="64" fill={c} />
    <rect x="34" y="40" width="10" height="64" fill={shade(c, -0.15)} />
    <Label x={42} y={58} w={40} h={28} text={l} /></>),
  jar: (c, a, l) => (<>
    <rect x="34" y="20" width="52" height="14" rx="3" fill={a} />
    <rect x="30" y="34" width="60" height="72" rx="12" fill={c} />
    <rect x="36" y="42" width="5" height="50" rx="2.5" fill="#fff" opacity=".35" />
    <Label x={40} y={58} w={44} h={30} text={l} /></>),
  box: (c, a, l) => (<>
    <rect x="24" y="24" width="72" height="80" rx="4" fill={c} />
    <rect x="24" y="24" width="72" height="14" rx="4" fill={a} />
    <Label x={32} y={52} w={56} h={30} text={l} /></>),
  pouch: (c, a, l) => (<>
    <path d="M28 26H92L96 98Q60 108 24 98Z" fill={c} />
    <path d="M28 26H92V35H28Z" fill={a} />
    <line x1="28" y1="30.5" x2="92" y2="30.5" stroke="#fff" strokeOpacity=".5" strokeDasharray="2 3" />
    <Label x={34} y={52} w={52} h={30} text={l} /></>),
  tin: (c, a, l) => (<>
    <path d="M30 34v62a30 9 0 0 0 60 0V34a30 9 0 0 1-60 0Z" fill={c} />
    <ellipse cx="60" cy="34" rx="30" ry="9" fill={shade(a, 0.1)} />
    <Label x={38} y={56} w={44} h={28} text={l} /></>),
  bar: (c, a) => (
    <g transform="rotate(-12 60 64)">
      <rect x="34" y="18" width="52" height="90" rx="5" fill={a} />
      <rect x="39" y="24" width="42" height="78" rx="3" fill={c} />
      {[0, 1, 2, 3].map((i) => <line key={'h' + i} x1="39" x2="81" y1={43 + i * 19} y2={43 + i * 19} stroke={shade(c, -0.3)} strokeWidth="1.5" />)}
      <line x1="60" x2="60" y1="24" y2="102" stroke={shade(c, -0.3)} strokeWidth="1.5" />
    </g>),
  roll: (c, a) => (
    <g transform="rotate(-8 60 62)">
      <rect x="28" y="40" width="64" height="44" fill={c} />
      <rect x="28" y="40" width="64" height="7" fill="#fff" opacity=".25" />
      <ellipse cx="92" cy="62" rx="10" ry="22" fill={shade(c, -0.2)} />
      <ellipse cx="28" cy="62" rx="10" ry="22" fill={shade(c, 0.18)} />
      <ellipse cx="28" cy="62" rx="4" ry="9" fill={CREAM} />
      <rect x="48" y="52" width="24" height="5" rx="2.5" fill={a} /></g>),
  tube: (c, a, l) => (
    <g transform="rotate(-18 60 64)">
      <rect x="48" y="10" width="24" height="14" rx="3" fill={a} />
      <path d="M44 24H76L82 100H38Z" fill={c} />
      <rect x="38" y="96" width="44" height="8" fill={shade(c, -0.2)} />
      <Label x={46} y={44} w={28} h={24} text={l} /></g>),
  round: (c, a) => (<>
    <circle cx="60" cy="68" r="32" fill={c} />
    <ellipse cx="48" cy="54" rx="8" ry="12" fill="#fff" opacity=".22" transform="rotate(-25 48 54)" />
    <path d="M60 38q0-10 6-16" stroke="#5a3d22" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M62 30q12-10 22-2-10 10-22 2Z" fill={a} /></>),
  banana: (c) => (<>
    <path d="M24 46Q40 112 100 62" fill="none" stroke={shade(c, -0.18)} strokeWidth="24" strokeLinecap="round" />
    <path d="M24 46Q40 112 100 62" fill="none" stroke={c} strokeWidth="19" strokeLinecap="round" />
    <path d="M30 48Q44 100 92 62" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="4" strokeLinecap="round" />
    <circle cx="22" cy="42" r="4.5" fill="#5a3d22" /><circle cx="102" cy="60" r="4.5" fill="#5a3d22" /></>),
  carrot: (c, a) => (<>
    <path d="M84 50Q86 28 96 22Q98 40 90 52Z" fill={a} />
    <path d="M80 46Q70 28 76 18Q88 30 86 46Z" fill={shade(a, -0.15)} />
    <path d="M74 40Q98 52 98 64L24 108Z" fill={c} />
    {[[70, 62, 80, 66], [58, 78, 70, 82], [44, 92, 54, 94]].map(([x1, y1, x2, y2], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={shade(c, -0.25)} strokeWidth="2" strokeLinecap="round" />)}</>),
  leafy: (c) => (<>
    <rect x="57" y="76" width="6" height="30" rx="3" fill={shade(c, -0.3)} />
    <ellipse cx="60" cy="58" rx="15" ry="36" fill={c} transform="rotate(-32 60 90)" />
    <ellipse cx="60" cy="58" rx="15" ry="36" fill={shade(c, 0.12)} transform="rotate(32 60 90)" />
    <ellipse cx="60" cy="56" rx="16" ry="38" fill={shade(c, -0.08)} />
    <path d="M60 28V88" stroke={shade(c, 0.35)} strokeWidth="2" /></>),
  potato: (c) => (<>
    <path d="M24 70Q22 44 54 40Q92 34 98 64Q100 94 66 98Q28 102 24 70Z" fill={c} />
    <ellipse cx="50" cy="60" rx="9" ry="6" fill="#fff" opacity=".18" transform="rotate(-20 50 60)" />
    {[[44, 78], [72, 62], [78, 82]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2.5" ry="1.8" fill={shade(c, -0.35)} />)}</>),
  bread: (c) => (<>
    <path d="M26 96V58Q20 30 60 28Q100 30 94 58V96Q94 102 88 102H32Q26 102 26 96Z" fill={shade(c, -0.18)} />
    <path d="M34 94V60Q32 40 60 38Q88 40 86 60V94Z" fill={shade(c, 0.4)} />
    {[48, 60, 72].map((x) => <path key={x} d={`M${x} 46q4 12 0 24`} stroke={shade(c, 0.1)} strokeWidth="2" fill="none" strokeLinecap="round" />)}</>),
};

export function ProductArt({ p, className = '' }: { p: Pick<Product, 'shape' | 'color' | 'accent' | 'unit' | 'name'>; className?: string }) {
  const accent = p.accent ?? shade(p.color, -0.3);
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={p.name} className={className} focusable="false">
      <ellipse cx="60" cy="108" rx="34" ry="4" fill="#173F2B" opacity=".1" />
      {shapes[p.shape](p.color, accent, p.unit)}
    </svg>
  );
}

/** A small still-life made from up to 3 products — used for categories and combos. */
export function ArtGroup({ ids, className = '' }: { ids: string[]; className?: string }) {
  const items = ids.map(getProduct).filter((x): x is Product => !!x);
  const pos = ['left-[2%] bottom-0 h-[78%] -rotate-6', 'right-[2%] bottom-0 h-[78%] rotate-6', 'left-1/2 bottom-0 h-[92%] -translate-x-1/2'];
  const order = items.length === 3 ? [0, 1, 2] : items.map((_, i) => (i === 0 ? 2 : i));
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {items.map((p, i) => (
        <div key={p.id} className={`absolute aspect-square ${pos[order[i]]}`}><ProductArt p={p} className="h-full w-full" /></div>
      ))}
    </div>
  );
}
