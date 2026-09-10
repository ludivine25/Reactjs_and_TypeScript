import type { ChangeEvent } from "react";

export interface ChampTexteProps {
  nom: string;
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  erreur?: string;
  placeholder?: string;
}

export function ChampTexte({
  nom,
  label,
  valeur,
  onChange,
  type = "text",
  erreur,
  placeholder,
}: ChampTexteProps) {
  const idErreur = `${nom}-erreur`;

  return (
    <div className="mb-4">
      <label htmlFor={nom} className="block font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        value={valeur}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? idErreur : undefined}
        className={`mt-2 w-full rounded-md border px-3 py-2 outline-none ${
          erreur
            ? "border-red-500 bg-red-50"
            : "border-slate-300 bg-white"
        }`}
      />
      {erreur && (
        <p id={idErreur} className="mt-1 text-sm text-red-600">
          {erreur}
        </p>
      )}
    </div>
  );
}
