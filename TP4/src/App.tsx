import { useEffect, useState } from "react";
import { CarteFilm } from "./composants/CarteFilm";
import { construireUrlRecherche, type ReponseRecherche } from "./lib/omdb";
import { useFetch } from "./hooks/useFetch";

export default function App() {
  const [terme, setTerme] = useState("");
  const [termeDiffere, setTermeDiffere] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => setTermeDiffere(terme.trim()), 400);
    return () => window.clearTimeout(id);
  }, [terme]);

  const url = termeDiffere ? construireUrlRecherche(termeDiffere) : null;
  const { donnees, chargement, erreur } = useFetch<ReponseRecherche>(url);
  const films = donnees?.Response === "True" ? donnees.Search ?? [] : [];
  const erreurRecherche = donnees?.Response === "False" ? donnees.Error : null;
  const messageErreur = erreur ?? erreurRecherche ?? null;
  const rechercheEnCours = chargement || terme.trim() !== termeDiffere;

  return (
    <main className="app-shell">
      <header className="page-heading">
        <h1>Recherche de films</h1>
        <p>Données fournies par l'API OMDB.</p>
      </header>

      <section className="search-panel" aria-label="Recherche de films">
        <label htmlFor="recherche">Rechercher un film</label>
        <div className="search-field">
          <input
            id="recherche"
            type="search"
            value={terme}
            onChange={(event) => setTerme(event.target.value)}
            placeholder="Batman, Amélie, Dune..."
            autoComplete="off"
          />
        </div>
      </section>

      <section className="results-area" aria-live="polite">
        {!terme.trim() && <p className="state-message">Tapez un titre pour lancer la recherche.</p>}
        {terme.trim() && rechercheEnCours && <p className="state-message">Chargement...</p>}
        {terme.trim() && !rechercheEnCours && messageErreur && (
          <p className="state-message state-error">{messageErreur}</p>
        )}
        {terme.trim() && !rechercheEnCours && !messageErreur && films.length === 0 && (
          <p className="state-message">Aucun film ne correspond à « {termeDiffere} ».</p>
        )}
        {terme.trim() && !rechercheEnCours && !messageErreur && films.length > 0 && (
          <ul className="film-grid">
            {films.map((film) => (
              <li key={film.imdbID}>
                <CarteFilm film={film} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="states-demo" aria-label="Exemples des quatre états">
        <h2>Les quatre états, avant d'arriver à la grille</h2>
        <div className="states-grid">
          <article>
            <h3>Champ vide</h3>
            <p>Tapez un titre pour lancer la recherche.</p>
          </article>
          <article>
            <h3>Chargement</h3>
            <p>Chargement...</p>
          </article>
          <article>
            <h3>Erreur</h3>
            <p className="state-error">Erreur HTTP 401</p>
          </article>
          <article>
            <h3>Aucun résultat</h3>
            <p>Aucun film ne correspond à « qzqzdqd ».</p>
          </article>
        </div>
      </section>
    </main>
  );
}
