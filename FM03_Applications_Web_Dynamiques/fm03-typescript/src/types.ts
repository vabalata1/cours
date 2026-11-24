export type Niveau = "debutant" | "intermediaire" | "avance";
export interface Atelier {
  id: string;
  titre: string;
  niveau: Niveau;
  prix: number;
  places: number;
  formateur: string;
  description: string;
  duree: number;
  date: string;
  format: string;
}
export interface Inscription {
  atelierId: string;
  date: string;
}
export type EtatChargement =
  | { statut: "chargement" }
  | { statut: "erreur"; message: string }
  | { statut: "vide" }
  | { statut: "succes"; ateliers: Atelier[] };
export interface Filtre {
  recherche: string;
  niveau: string;
  tri: string;
}
