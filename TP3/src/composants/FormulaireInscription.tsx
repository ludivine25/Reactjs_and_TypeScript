import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Bouton } from "./Bouton";
import { ChampTexte } from "./ChampTexte";
import { type Erreurs, type Inscription, valider, valeursInitiales } from "../lib/inscription";

export interface FormulaireInscriptionProps {
  onInscription: (donnees: Inscription) => void;
}

export function FormulaireInscription({ onInscription }: FormulaireInscriptionProps) {
  const [donnees, setDonnees] = useState<Inscription>(valeursInitiales);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const valeur = type === "checkbox" ? checked : value;

    setDonnees((d) => ({
      ...d,
      [name]: valeur,
    }));
  };

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trouvees = valider(donnees);
    setErreurs(trouvees);

    if (Object.keys(trouvees).length > 0) {
      return;
    }

    setEnvoiEnCours(true);

    window.setTimeout(() => {
      setEnvoiEnCours(false);
      onInscription(donnees);
      setDonnees(valeursInitiales);
      setErreurs({});
    }, 500);
  };

  return (
    <section className="formSection">
      <h2>Inscription</h2>

      <form className="signupForm" noValidate onSubmit={gererEnvoi}>
        <ChampTexte
          nom="prenom"
          label="Prénom"
          valeur={donnees.prenom}
          onChange={gererSaisie}
          erreur={erreurs.prenom}
          placeholder="Ada"
        />

        <ChampTexte
          nom="email"
          label="Email"
          valeur={donnees.email}
          onChange={gererSaisie}
          type="email"
          erreur={erreurs.email}
          placeholder="ada@example.com"
        />

        <ChampTexte
          nom="motDePasse"
          label="Mot de passe"
          valeur={donnees.motDePasse}
          onChange={gererSaisie}
          type="password"
          erreur={erreurs.motDePasse}
          placeholder="••••••••"
        />

        <ChampTexte
          nom="confirmation"
          label="Confirmation du mot de passe"
          valeur={donnees.confirmation}
          onChange={gererSaisie}
          type="password"
          erreur={erreurs.confirmation}
          placeholder="••••••••"
        />

        <div className="cgvLine">
          <input
            id="cgv"
            name="cgv"
            type="checkbox"
            checked={donnees.cgv}
            onChange={gererSaisie}
            aria-invalid={!!erreurs.cgv}
            aria-describedby={erreurs.cgv ? "cgv-erreur" : undefined}
          />
          <label htmlFor="cgv">J’accepte les conditions d’utilisation</label>
        </div>
        {erreurs.cgv && (
          <p id="cgv-erreur" className="cgvErreur">
            {erreurs.cgv}
          </p>
        )}

        <Bouton
          libelle={envoiEnCours ? "Envoi en cours…" : "Créer le compte"}
          variante="primaire"
          desactive={envoiEnCours}
          type="submit"
        />
      </form>
    </section>
  );
}
