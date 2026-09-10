import { useState } from "react";
import { FormulaireInscription } from "./composants/FormulaireInscription";
import { ListeInscriptions } from "./composants/ListeInscriptions";
import type { Inscription, InscriptionEnregistree } from "./lib/inscription";

export default function App() {
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);

  const gererNouvelleInscription = (donnees: Inscription) => {
    const nouvelle: InscriptionEnregistree = {
      prenom: donnees.prenom,
      email: donnees.email,
      cgv: donnees.cgv,
      id: Date.now(),
    };

    setInscriptions((liste) => [nouvelle, ...liste]);
  };

  const gererSuppression = (id: number) => {
    setInscriptions((liste) => liste.filter((inscription) => inscription.id !== id));
  };

  return (
    <main className="app">
      <section className="appHeading">
        <h1>Créer un compte</h1>
        <p>Formulaire contrôlé, typé et validé à la soumission.</p>
      </section>

      <section className="appLayout">
        <section className="panel panelForm">
          <FormulaireInscription onInscription={gererNouvelleInscription} />
        </section>

        <section className="panel panelList">
          <section className="listPanel">
            <h2>Inscriptions ({inscriptions.length})</h2>
            <ListeInscriptions inscriptions={inscriptions} onSuppression={gererSuppression} />
          </section>
        </section>
      </section>

      <section className="formFooter">
        Le formulaire après une soumission invalide
      </section>
    </main>
  );
}
