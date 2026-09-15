import { useEffect, useState } from "react";

interface EtatFetch<T> {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
}

export function useFetch<T>(url: string | null): EtatFetch<T> {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (url === null) {
      setDonnees(null);
      setChargement(false);
      setErreur(null);
      return;
    }

    const controleur = new AbortController();
    setDonnees(null);
    setChargement(true);
    setErreur(null);

    const charger = async () => {
      try {
        const reponse = await fetch(url, { signal: controleur.signal });
        if (!reponse.ok) {
          throw new Error(`La requête a échoué (${reponse.status}).`);
        }
        const resultat = (await reponse.json()) as T;
        setDonnees(resultat);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        if (!controleur.signal.aborted) {
          setChargement(false);
        }
      }
    };

    void charger();
    return () => controleur.abort();
  }, [url]);

  return { donnees, chargement, erreur };
}
