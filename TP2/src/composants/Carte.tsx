import type { ReactNode } from "react";

export interface CarteProps {
  titre: string;
  sousTitre?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function Carte({ titre, sousTitre, children, actions }: CarteProps) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-white p-5 shadow-md shadow-slate-200/70">
      <h3 className="text-xl font-bold text-slate-900">{titre}</h3>
      {sousTitre && <p className="mt-1 text-sm text-slate-500">{sousTitre}</p>}
      <div className="mt-5 flex-1">{children}</div>
      {actions && <footer className="mt-5 border-t border-slate-100 pt-4">{actions}</footer>}
    </article>
  );
}
