export interface Inscription {
  prenom: string;
  email: string;
  motDePasse: string;
  confirmation: string;
  cgv: boolean;
}

export type InscriptionEnregistree = Omit<Inscription, "motDePasse" | "confirmation"> & {
  id: number;
};

export const valeursInitiales: Inscription = {
  prenom: "",
  email: "",
  motDePasse: "",
  confirmation: "",
  cgv: false,
};

export type Erreurs = Partial<Record<keyof Inscription, string>>;

export function valider(donnees: Inscription): Erreurs {
  const erreurs: Erreurs = {};

  const prenomSansEspaces = donnees.prenom.trim();
  if (prenomSansEspaces.length < 2) {
    erreurs.prenom = "Le prénom doit contenir au moins 2 caractères.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(donnees.email)) {
    erreurs.email = "Adresse email invalide.";
  }

  if (donnees.motDePasse.length < 8) {
    erreurs.motDePasse = "Le mot de passe doit contenir au moins 8 caractères.";
  }

  if (donnees.confirmation !== donnees.motDePasse) {
    erreurs.confirmation = "Les deux mots de passe ne correspondent pas.";
  }

  if (!donnees.cgv) {
    erreurs.cgv = "Vous devez accepter les conditions d'utilisation.";
  }

  return erreurs;
}
