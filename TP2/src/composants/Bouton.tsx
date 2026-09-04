export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton;
  desactive?: boolean;
  onClick?: () => void;
}

const stylesParVariante: Record<VarianteBouton, string> = {
  primaire: "bg-teal-700 text-white hover:bg-teal-800 focus-visible:outline-teal-700",
  secondaire: "bg-slate-200 text-slate-800 hover:bg-slate-300 focus-visible:outline-slate-700",
  danger: "bg-rose-700 text-white hover:bg-rose-800 focus-visible:outline-rose-700",
};

export function Bouton({
  libelle,
  variante = "primaire",
  desactive = false,
  onClick,
}: BoutonProps) {
  return (
    <button
      type="button"
      disabled={desactive}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${stylesParVariante[variante]}`}
    >
      {libelle}
    </button>
  );
}
