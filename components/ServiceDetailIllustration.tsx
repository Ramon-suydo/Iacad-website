import type { ReactNode } from "react";
import ServiceIllustration, { Person } from "@/components/ServiceIllustration";
import type { ServiceCategoryId } from "@/lib/service-categories";

const navy = "#16255a";
const blue = "#5b7fff";
const gold = "#e8c874";
const cyan = "#2dd4dc";
const coral = "#ff5c5c";
const paper = "#f7f5f0";

function Books({ x = 38, y = 75 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width="14" height="60" rx="2" fill={coral} />
    <rect x="18" y="-12" width="16" height="72" rx="2" fill={gold} />
    <path d="m38 6 13-4 17 56-13 4z" fill={cyan} />
    <path d="M3 12h8M22 2h8M3 46h8" stroke="white" strokeWidth="2" />
  </g>;
}

function Monitor({ x = 90, y = 32 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width="115" height="77" rx="7" fill={navy} />
    <rect x="7" y="7" width="101" height="59" rx="3" fill={paper} />
    <path d="M49 77v18h-22v5h62v-5H66V77" fill={navy} />
    <rect x="17" y="17" width="81" height="12" rx="3" fill={blue} />
    <circle cx="25" cy="23" r="3" stroke="white" strokeWidth="1.5" />
    <path d="m28 26 3 3" stroke="white" strokeWidth="1.5" />
    <rect x="17" y="38" width="20" height="20" rx="2" fill={gold} />
    <path d="M45 40h49M45 48h35M45 56h43" stroke={blue} strokeWidth="3" strokeLinecap="round" opacity=".65" />
  </g>;
}

function Desk() {
  return <g fill={navy}><rect x="43" y="108" width="174" height="8" rx="2" /><path d="M54 116h6v28h-6zM200 116h6v28h-6z" /></g>;
}

function OpenBook({ x = 95, y = 90 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M0 0q17-8 34 0 17-8 34 0v24q-17-8-34 0-17-8-34 0Z" fill={gold} stroke={navy} strokeWidth="2" />
    <path d="M34 0v24M6 6q11-3 22 0M40 6q11-3 22 0M6 13q11-3 22 0M40 13q11-3 22 0" stroke={navy} strokeWidth="1.5" opacity=".45" />
  </g>;
}

function scene(serviceId: string): ReactNode {
  switch (serviceId) {
    case "research-hub":
      return <><Person x={76} y={48} seated /><Monitor x={109} y={31} /><Desk /><OpenBook x={55} y={96} /><circle cx="210" cy="32" r="17" fill={cyan} /><circle cx="208" cy="30" r="7" stroke={navy} strokeWidth="3" /><path d="m213 36 7 7" stroke={navy} strokeWidth="3" strokeLinecap="round" /></>;
    case "current-awareness":
      return <><rect x="61" y="25" width="134" height="108" rx="7" fill={navy} /><rect x="68" y="32" width="120" height="94" rx="3" fill={paper} /><rect x="78" y="43" width="100" height="16" rx="3" fill={blue} /><rect x="78" y="69" width="40" height="43" rx="3" fill={gold} /><path d="M130 73h37M130 84h29M130 95h37M130 106h24" stroke={navy} strokeWidth="3" strokeLinecap="round" opacity=".5" /><path d="m177 61 39-17v49l-39-17z" fill={coral} /><rect x="166" y="61" width="14" height="15" rx="4" fill={navy} /><path d="m180 76 5 20h10l-6-24" fill={navy} /><path d="m226 48 10-7m-7 27h12m-15 18 10 7" stroke={gold} strokeWidth="3" strokeLinecap="round" /></>;
    case "opac":
      return <><Books x={36} y={73} /><Monitor /><path d="M83 139h128" stroke={navy} strokeWidth="4" strokeLinecap="round" /><circle cx="217" cy="109" r="17" fill={cyan} /><circle cx="215" cy="107" r="7" stroke={navy} strokeWidth="3" /><path d="m220 113 7 7" stroke={navy} strokeWidth="3" strokeLinecap="round" /></>;
    case "ebscohost":
      return <><Monitor x={72} y={28} /><Books x={30} y={78} /><rect x="176" y="74" width="49" height="64" rx="6" fill={blue} /><rect x="182" y="81" width="37" height="45" rx="2" fill={paper} /><path d="M189 91h22M189 99h17M189 107h22M189 115h13" stroke={navy} strokeWidth="2" opacity=".5" /><circle cx="201" cy="132" r="2" fill={gold} /></>;
    case "il-rosa":
      return <><Person x={104} y={50} seated /><Desk /><path d="M86 99h39l7 9H79Z" fill={blue} /><path d="M168 26h50a8 8 0 0 1 8 8v28a8 8 0 0 1-8 8h-27l-14 13V70h-9a8 8 0 0 1-8-8V34a8 8 0 0 1 8-8Z" fill={cyan} /><path d="M174 41h37M174 51h27M174 61h32" stroke={navy} strokeWidth="3" strokeLinecap="round" opacity=".6" /><rect x="36" y="30" width="46" height="33" rx="5" fill={gold} /><path d="m40 36 19 14 19-14" stroke={navy} strokeWidth="2" /><path d="M90 45q14-20 29 0" stroke={navy} strokeWidth="4" /><path d="M90 43v15m29-15v15" stroke={coral} strokeWidth="6" strokeLinecap="round" /></>;
    case "libtap":
      return <><rect x="120" y="65" width="92" height="65" rx="7" fill={navy} /><rect x="129" y="73" width="74" height="43" rx="4" fill={cyan} /><circle cx="166" cy="94" r="12" fill={paper} /><path d="m160 94 4 4 9-10" stroke={navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><rect x="52" y="24" width="58" height="82" rx="7" fill={blue} /><rect x="59" y="34" width="44" height="63" rx="3" fill={paper} /><circle cx="81" cy="52" r="10" fill={gold} /><path d="M68 73h26M72 81h18" stroke={navy} strokeWidth="3" strokeLinecap="round" /><path d="M119 39q13 5 13 18m-10-10q5 3 5 9" stroke={coral} strokeWidth="3" strokeLinecap="round" /><path d="M108 138h117" stroke={navy} strokeWidth="4" strokeLinecap="round" /></>;
    case "audiovisual-room":
      return <><rect x="56" y="23" width="157" height="90" rx="5" fill={navy} /><rect x="64" y="31" width="141" height="72" rx="2" fill={blue} /><circle cx="134" cy="67" r="23" fill={paper} /><path d="m128 54 19 13-19 13z" fill={coral} /><path d="M134 113v24m-24 0h48" stroke={navy} strokeWidth="5" strokeLinecap="round" /><rect x="28" y="100" width="24" height="38" rx="4" fill={gold} /><rect x="215" y="100" width="24" height="38" rx="4" fill={gold} /><circle cx="40" cy="119" r="7" fill={navy} /><circle cx="227" cy="119" r="7" fill={navy} /></>;
    case "headphone-borrowing":
      return <><path d="M74 94V75a56 56 0 0 1 112 0v19" stroke={navy} strokeWidth="13" strokeLinecap="round" /><path d="M82 67a48 48 0 0 1 96 0" stroke={blue} strokeWidth="7" strokeLinecap="round" /><rect x="65" y="77" width="29" height="49" rx="11" fill={blue} /><rect x="166" y="77" width="29" height="49" rx="11" fill={blue} /><rect x="85" y="85" width="11" height="33" rx="5" fill={cyan} /><rect x="164" y="85" width="11" height="33" rx="5" fill={cyan} /><path d="M184 125q0 15-39 15" stroke={navy} strokeWidth="3" /><rect x="132" y="134" width="20" height="9" rx="4" fill={gold} /><path d="M40 56V39l15-4v17" stroke={coral} strokeWidth="3" /><ellipse cx="36" cy="57" rx="6" ry="4" fill={coral} /><ellipse cx="51" cy="53" rx="6" ry="4" fill={coral} /></>;
    case "computer-section":
      return <><Monitor x={46} y={25} /><Person x={189} y={49} shirt={cyan} seated /><Desk /><path d="M70 107h65l7 7H63Z" fill={blue} /><rect x="174" y="102" width="21" height="6" rx="3" fill={gold} /></>;
    case "charging-station":
      return <><rect x="75" y="22" width="67" height="113" rx="9" fill={navy} /><rect x="82" y="31" width="53" height="91" rx="4" fill={paper} /><rect x="93" y="57" width="30" height="40" rx="4" fill={cyan} /><path d="m110 62-10 17h9l-4 13 13-20h-10z" fill={navy} /><path d="M106 136v7h72q12 0 12-12v-25" stroke={blue} strokeWidth="4" /><rect x="175" y="66" width="30" height="42" rx="6" fill={gold} /><path d="M182 66V54m15 12V54" stroke={navy} strokeWidth="4" strokeLinecap="round" /><path d="m162 34 4-9 4 9 9 4-9 4-4 9-4-9-9-4z" fill={coral} /></>;
    case "wifi":
      return <><path d="M63 57q67-63 134 0M83 79q47-44 94 0M106 101q24-24 48 0" stroke={blue} strokeWidth="11" strokeLinecap="round" /><circle cx="130" cy="121" r="9" fill={cyan} /><rect x="44" y="128" width="46" height="13" rx="4" fill={navy} /><path d="M52 128v-21" stroke={navy} strokeWidth="4" strokeLinecap="round" /><circle cx="78" cy="134" r="2" fill={gold} /><path d="M184 128h30v13h-30z" fill={gold} /></>;
    case "discussion-rooms":
      return <><Person x={73} y={49} seated /><Person x={190} y={49} shirt={coral} seated /><Desk /><OpenBook x={98} y={88} /><rect x="105" y="19" width="52" height="31" rx="7" fill={gold} /><path d="m117 50 8 10 7-10" fill={gold} /><path d="M116 31h30M116 40h19" stroke={navy} strokeWidth="2" strokeLinecap="round" opacity=".55" /></>;
    case "playsmart":
      return <><rect x="69" y="36" width="122" height="100" rx="6" fill={gold} /><path d="M79 46h102v80H79z" fill={paper} /><path d="M79 66h102M79 86h102M79 106h102M99 46v80M119 46v80M139 46v80M159 46v80" stroke={blue} strokeWidth="2" opacity=".3" /><path d="m99 46 20 0v20H99zm40 0h20v20h-20zm-60 20h20v20H79zm40 0h20v20h-20zm40 0h22v20h-22zm-60 20h20v20H99zm40 0h20v20h-20zm-60 20h20v20H79zm40 0h20v20h-20zm40 0h22v20h-22z" fill={blue} opacity=".6" /><rect x="174" y="99" width="44" height="39" rx="8" fill={coral} /><g fill="white"><circle cx="185" cy="110" r="3" /><circle cx="207" cy="110" r="3" /><circle cx="196" cy="119" r="3" /><circle cx="185" cy="128" r="3" /><circle cx="207" cy="128" r="3" /></g><path d="M48 112h13v25H40v-7h8z" fill={navy} /><circle cx="54" cy="104" r="9" fill={cyan} /></>;
    case "hangout":
      return <><Person x={91} y={45} seated /><Person x={167} y={45} shirt={coral} seated /><rect x="51" y="95" width="160" height="40" rx="10" fill={blue} /><rect x="43" y="84" width="23" height="51" rx="7" fill={cyan} /><rect x="195" y="84" width="23" height="51" rx="7" fill={cyan} /><path d="M64 135v10m132-10v10" stroke={navy} strokeWidth="5" /><rect x="109" y="19" width="42" height="24" rx="6" fill={gold} /><path d="m124 43 7 8 7-8" fill={gold} /><circle cx="120" cy="31" r="2" fill={navy} /><circle cx="130" cy="31" r="2" fill={navy} /><circle cx="140" cy="31" r="2" fill={navy} /></>;
    default:
      return null;
  }
}

export default function ServiceDetailIllustration({ serviceId, category }: { serviceId: string; category: ServiceCategoryId }) {
  // Reuse the original scenes for borrowing and quiet study; other services get their own scene.
  const detail = scene(serviceId);
  if (!detail) return <ServiceIllustration category={category} />;
  return <svg viewBox="0 0 260 160" fill="none" aria-hidden="true" focusable="false" className="h-full w-full">
    <ellipse cx="130" cy="145" rx="111" ry="8" fill={navy} opacity=".06" />
    <circle cx="132" cy="75" r="64" fill={blue} opacity=".06" />
    {detail}
  </svg>;
}
