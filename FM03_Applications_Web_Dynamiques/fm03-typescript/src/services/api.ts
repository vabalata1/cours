import type { Atelier } from "../types";
const niveaux = ["debutant", "intermediaire", "avance"];
export function estAtelier(a: unknown): a is Atelier {
  if (typeof a !== "object" || a === null) return false;
  const x = a as Record<string, unknown>;
  return (
    typeof x.id === "string" &&
    typeof x.titre === "string" &&
    typeof x.niveau === "string" &&
    niveaux.includes(x.niveau) &&
    typeof x.prix === "number" &&
    Number.isFinite(x.prix) &&
    x.prix >= 0 &&
    typeof x.places === "number" &&
    Number.isInteger(x.places) &&
    x.places >= 0 &&
    typeof x.formateur === "string" &&
    typeof x.description === "string" &&
    typeof x.duree === "number" &&
    typeof x.date === "string" &&
    typeof x.format === "string"
  );
}
export async function chargerAteliers(
  url: string,
  signal?: AbortSignal,
): Promise<Atelier[]> {
  const response = await fetch(url, { signal });
  if (!response.ok)
    throw new Error(
      `Erreur HTTP ${response.status}. Le catalogue n’a pas pu être chargé.`,
    );
  const donnees: unknown = await response.json();
  if (!Array.isArray(donnees) || !donnees.every(estAtelier))
    throw new Error("Le serveur a renvoyé des données invalides.");
  return donnees;
}
