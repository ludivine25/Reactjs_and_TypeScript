import { Badge } from "./composants/Badge";
import { Bouton } from "./composants/Bouton";
import { Carte } from "./composants/Carte";
import { ListeFilms } from "./composants/ListeFilms";
import { FILMS, filtrerParGenre, trierPar } from "./lib/utils";

const filmsTries = trierPar(FILMS, "titre");
const filmsDeScienceFiction = filtrerParGenre(FILMS, "SF");
const filmsWestern = filtrerParGenre(FILMS, "Western");

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-teal-700">
            Mini design system typé
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Catalogue de films
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Une sélection de films présentée avec des composants réutilisables.
          </p>
        </header>

        <section aria-labelledby="tous-les-films" className="mb-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-teal-700">Collection complète</p>
              <h2 id="tous-les-films" className="text-2xl font-bold text-slate-950">
                Tous les films
              </h2>
            </div>
            <Badge texte={`${filmsTries.length} titres`} ton="info" />
          </div>
          <ListeFilms films={filmsTries} onSelection={() => undefined} />
        </section>

        <section aria-labelledby="science-fiction" className="mb-14">
          <div className="mb-5">
            <p className="text-sm font-semibold text-teal-700">Filtre par genre</p>
            <h2 id="science-fiction" className="text-2xl font-bold text-slate-950">
              Science-fiction
            </h2>
          </div>
          <ListeFilms films={filmsDeScienceFiction} messageVide="Aucun film de science-fiction." />
        </section>

        <section aria-labelledby="western" className="mb-14">
          <div className="mb-5">
            <p className="text-sm font-semibold text-teal-700">Démonstration du cas vide</p>
            <h2 id="western" className="text-2xl font-bold text-slate-950">
              Western
            </h2>
          </div>
          <ListeFilms films={filmsWestern} messageVide="Aucun western dans cette sélection." />
        </section>

        <Carte
          titre="Composants du système"
          sousTitre="Des contrats simples et entièrement typés"
          actions={<Bouton libelle="Composant secondaire" variante="secondaire" />}
        >
          <div className="flex flex-wrap gap-2">
            <Badge texte="neutre" />
            <Badge texte="succes" ton="succes" />
            <Badge texte="info" ton="info" />
            <Badge texte="attention" ton="attention" />
          </div>
        </Carte>
      </div>
    </main>
  );
}

export default App;
