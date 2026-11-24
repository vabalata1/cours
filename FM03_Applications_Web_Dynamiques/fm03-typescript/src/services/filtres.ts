import type { Atelier, Filtre } from "../types";
export const libelleNiveau = (n: string) =>
  ({ debutant: "Débutant", intermediaire: "Intermédiaire", avance: "Avancé" })[
    n
  ] || n;
export function filtrer(ateliers: Atelier[], f: Filtre): Atelier[] {
  const normaliser = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return ateliers
    .filter(
      (a) =>
        (!f.niveau || a.niveau === f.niveau) &&
        normaliser(a.titre + " " + a.formateur).includes(
          normaliser(f.recherche),
        ),
    )
    .sort((a, b) =>
      f.tri === "desc"
        ? b.prix - a.prix
        : f.tri === "asc"
          ? a.prix - b.prix
          : a.titre.localeCompare(b.titre, "fr"),
    );
}
