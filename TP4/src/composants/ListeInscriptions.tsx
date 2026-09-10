import { Carte } from "./Carte";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";
import type { InscriptionEnregistree } from "../lib/inscription";

export interface ListeInscriptionsProps {
  inscriptions: InscriptionEnregistree[];
  onSuppression?: (id: number) => void;
}

export function ListeInscriptions({
  inscriptions,
  onSuppression,
}: ListeInscriptionsProps) {
  if (inscriptions.length === 0) {
    return (
      <section className="rounded-lg bg-slate-100 px-4 py-8 text-center text-slate-500">
        <p>Aucune inscription pour le moment.</p>
      </section>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {inscriptions.map((inscription) => (
        <li key={inscription.id}>
          <Carte
            titre={inscription.prenom}
            sousTitre={inscription.email}
            children={<Badge texte="CGV acceptées" ton="succes" />}
            actions={
              onSuppression ? (
                <Bouton
                  libelle="Supprimer"
                  variante="danger"
                  onClick={() => onSuppression(inscription.id)}
                  type="button"
                />
              ) : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
}
