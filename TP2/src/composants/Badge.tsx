export type TonBadge = "neutre" | "succes" | "info" | "attention";

export interface BadgeProps {
  texte: string;
  ton?: TonBadge;
}

const stylesParTon: Record<TonBadge, string> = {
  neutre: "bg-slate-200 text-slate-700",
  succes: "bg-emerald-100 text-emerald-800",
  info: "bg-sky-100 text-sky-800",
  attention: "bg-amber-100 text-amber-800",
};

export function Badge({ texte, ton = "neutre" }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stylesParTon[ton]}`}>
      {texte}
    </span>
  );
}
