export const facilityAccentStyles = [
  {
    chip: "bg-pop-cyan text-navy-950",
    bloom: "hover:shadow-[0_22px_48px_-22px_rgba(45,212,220,.8)]",
  },
  {
    chip: "bg-pop-coral text-white",
    bloom: "hover:shadow-[0_22px_48px_-22px_rgba(255,92,92,.75)]",
  },
  {
    chip: "bg-pop-amber text-navy-950",
    bloom: "hover:shadow-[0_22px_48px_-22px_rgba(255,201,60,.8)]",
  },
] as const;

export function getFacilityAccent(name: string, description: string, index: number) {
  const text = `${name} ${description}`.toLowerCase();
  let label = "Study Space";

  if (/silent|quiet|focus/.test(text)) label = "Quiet Zone";
  else if (/discussion|group|collaborat|project|team/.test(text)) label = "Group Collab";
  else if (/audio|visual|media|presentation|tech/.test(text)) label = "Media Ready";
  else if (/laboratory|hands-on|applied/.test(text)) label = "Hands On";
  else if (/research|reference|source/.test(text)) label = "Research Hub";
  else if (/hangout|relax|social|communal|break/.test(text)) label = "Chill Space";
  else if (/play|recreation|casual learning/.test(text)) label = "Play Zone";

  return { label, ...facilityAccentStyles[index % facilityAccentStyles.length] };
}
