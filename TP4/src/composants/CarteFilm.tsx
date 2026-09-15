import { Badge } from "./Badge";
import { Carte } from "./Carte";
import type { FilmOmdb } from "../lib/omdb";

export interface CarteFilmProps {
  film: FilmOmdb;
}

const typesFilms: Record<string, string> = {
  movie: "Film",
  series: "Série",
  game: "Jeu",
};

export function CarteFilm({ film }: CarteFilmProps) {
  return (
    <Carte titre={film.Title} sousTitre={film.Year}>
      <div className="poster-wrap">
        {film.Poster === "N/A" ? (
          <div className="poster-missing">Pas d'affiche</div>
        ) : (
          <img className="poster" src={film.Poster} alt={`Affiche de ${film.Title}`} />
        )}
      </div>
      <Badge texte={typesFilms[film.Type] ?? film.Type} ton="info" />
    </Carte>
  );
}
