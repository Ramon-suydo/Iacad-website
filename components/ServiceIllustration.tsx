import type { ServiceCategoryId } from "@/lib/service-categories";

const navy = "#16255a";
const blue = "#5b7fff";
const gold = "#e8c874";
const cyan = "#2dd4dc";
const coral = "#ff5c5c";

export function Person({ x, y, shirt = blue, seated = false }: { x: number; y: number; shirt?: string; seated?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-10 2q-3-22 10-22T12 2" fill={navy} />
      <rect x="-3" y="7" width="6" height="9" rx="2" fill="#dba27c" />
      <ellipse cx="0" cy="0" rx="10" ry="13" fill="#f0c5a6" />
      <path d="M-10-4q2-17 17-10l5 10q-11 2-18-6Z" fill={navy} />
      <path d="M-17 22q17-14 34 0l4 37h-42Z" fill={shirt} />
      <path d="M-15 24-24 46-6 52M15 24l13 21-17 7" fill="none" stroke="#f0c5a6" strokeWidth="7" strokeLinecap="round" />
      {seated ? (
        <path d="M-10 59h27l-6 28M4 60l-18 12 4 17" fill="none" stroke={navy} strokeWidth="10" strokeLinecap="round" />
      ) : (
        <path d="m-10 59-3 30M9 59l4 30" stroke={navy} strokeWidth="10" strokeLinecap="round" />
      )}
      <path d="M-16 90h10M8 90h12" stroke={navy} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

export default function ServiceIllustration({ category }: { category: ServiceCategoryId }) {
  return (
    <svg viewBox="0 0 260 160" fill="none" aria-hidden="true" className="service-scene h-full w-full">
      <ellipse cx="130" cy="145" rx="111" ry="8" fill={navy} opacity=".06" />
      <circle cx="132" cy="75" r="64" fill={blue} opacity=".06" />
      {category === "circulation" && (
        <>
          <g opacity=".8">
            <path d="M183 25h47v91h-47z" fill="#e9edf9" />
            <path d="M182 55h49M182 85h49" stroke={navy} strokeWidth="3" />
            <path d="M190 32v21M198 29v24M207 35v18M216 31l6 22" stroke={blue} strokeWidth="6" />
            <path d="M191 64v19M200 61v22M211 64l7 19" stroke={gold} strokeWidth="6" />
          </g>
          <Person x={80} y={47} shirt={coral} />
          <Person x={154} y={35} shirt={blue} />
          <path d="M38 91h154v9H38z" fill={navy} />
          <path d="M47 100h135v43H47z" fill={blue} />
          <path d="M47 100h135v5H47z" fill={cyan} />
          <rect x="90" y="116" width="48" height="14" rx="3" fill={navy} opacity=".7" />
          <path d="M100 120h28M106 126h16" stroke={gold} strokeWidth="2" />
          <path d="M103 82h28v8h-28z" fill={gold} />
          <path d="M109 75h28v6h-28z" fill={coral} />
        </>
      )}
      {category === "digital" && (
        <>
          <path d="M39 86h15v54H39z" fill={coral} />
          <path d="M58 68h15v72H58z" fill={gold} />
          <path d="m74 84 13-4 18 57-13 4z" fill={cyan} />
          <path d="M41 97h11M61 81h9" stroke="white" strokeWidth="3" />
          <rect x="99" y="19" width="83" height="122" rx="9" fill={navy} />
          <rect x="105" y="27" width="71" height="103" rx="4" fill="#f7f5f0" />
          <path d="M128 23h24" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          <rect x="115" y="39" width="51" height="12" rx="4" fill={blue} />
          <circle cx="123" cy="45" r="3" stroke="white" strokeWidth="1.5" />
          <path d="m126 48 3 3" stroke="white" />
          <path d="M115 65h17v24h-17z" fill={gold} />
          <path d="M138 65h27M138 73h20M138 81h24" stroke={navy} strokeWidth="3" strokeLinecap="round" opacity=".5" />
          <path d="M115 101h50M115 110h38M115 119h43" stroke={blue} strokeWidth="3" strokeLinecap="round" opacity=".6" />
          <path d="M187 128h37v12h-37z" fill={coral} />
          <path d="M188 118h30v9h-30z" fill={gold} />
          <path d="M203 116V67m0 0 25 13-25 7" stroke={navy} strokeWidth="4" strokeLinecap="round" />
          <path d="m200 65 29 14-3 8-29-14z" fill={cyan} />
          <path d="m55 35 3-9 3 9 9 3-9 3-3 9-3-9-9-3z" fill={gold} />
        </>
      )}
      {category === "collaborative" && (
        <>
          <path d="M89 19h74a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8h-25l-12 12V59H89a8 8 0 0 1-8-8V27a8 8 0 0 1 8-8Z" fill={gold} />
          <path d="M103 37h45M113 46h25" stroke={navy} strokeWidth="3" strokeLinecap="round" opacity=".6" />
          <Person x={60} y={52} shirt={blue} seated />
          <Person x={202} y={52} shirt={coral} seated />
          <Person x={133} y={59} shirt={cyan} seated />
          <path d="M45 110h173v8H45z" fill={navy} />
          <path d="m57 118-6 24m153-24 6 24" stroke={navy} strokeWidth="6" />
          <path d="m110 89 34 0 7 21h-34z" fill={blue} stroke={navy} strokeWidth="2" />
          <circle cx="129" cy="100" r="3" fill={gold} />
          <path d="M77 103h24v6H77z" fill={gold} />
          <path d="M167 99h16v10h-16z" fill={coral} />
        </>
      )}
      {category === "individual" && (
        <>
          <rect x="167" y="22" width="54" height="62" rx="5" fill="#e9edf9" />
          <path d="M194 23v60M168 53h52" stroke="white" strokeWidth="4" />
          <Person x={116} y={46} shirt={blue} seated />
          <path d="M59 105h154v8H59z" fill={navy} />
          <path d="M71 113v30m130-30v30" stroke={navy} strokeWidth="6" />
          <path d="M92 92q15-6 30 0v13q-15-6-30 0Zm30 0q15-6 30 0v13q-15-6-30 0Z" fill={gold} stroke={navy} strokeWidth="1.5" />
          <path d="M58 104V57l23-15" stroke={navy} strokeWidth="4" strokeLinecap="round" />
          <path d="m70 39 21-4 8 15-25 8z" fill={coral} />
          <path d="M172 98h26v6h-26z" fill={cyan} />
          <path d="M176 91h22v6h-22z" fill={gold} />
          <path d="M227 138v-20m0 0q-17-2-13-17 14 0 13 17Zm0-6q15-1 15-16-17 2-15 16Z" fill={cyan} />
          <path d="M217 134h20l-3 11h-14z" fill={gold} />
        </>
      )}
    </svg>
  );
}
