import "./style.css";
import type { Atelier, EtatChargement, Filtre } from "./types";
import { chargerAteliers } from "./services/api";
import { filtrer, libelleNiveau } from "./services/filtres";
const root = document.querySelector<HTMLDivElement>("#root");
if (!root) throw new Error("Racine absente");
root.innerHTML = `<a class="skip" href="#contenu">Aller au contenu</a><header><nav id="navigation" aria-label="Navigation principale"><a class="marque" href="/">SkillHub<span class="petit"> / Catalogue dynamique</span></a><button aria-expanded="false" aria-controls="sous-menu" data-menu="ressources">Ressources</button><div id="sous-menu" hidden><a href="#catalogue">Les ateliers</a><button data-menu="aide" aria-expanded="false" aria-controls="aide-menu">Aide</button><div id="aide-menu" hidden><button data-dialog="aide">Comment choisir ?</button></div></div></nav></header><main id="contenu"><section class="hero"><div><p class="eyebrow">Apprendre · pratiquer · avancer</p><h1>Une compétence.<br>Un nouveau départ.</h1><p class="intro">Trouvez votre prochain atelier parmi douze expériences guidées. Filtrez, comparez et choisissez à votre rythme.</p><a class="bouton" href="#catalogue">Explorer les ateliers</a><p class="petit">Version TypeScript · FM03 · Wissam Ben Zayed</p></div><img src="/assets/images/atelier-800.webp" alt="Groupe travaillant ensemble autour d’un ordinateur" width="800" height="534"></section><section id="catalogue"><h2>Votre prochain atelier</h2><form class="filtres" role="search"><label><span>Rechercher un atelier</span><input type="search" name="recherche" placeholder="HTML, Git, accessibilité…"></label><label><span>Niveau</span><select name="niveau"><option value="">Tous les niveaux</option value="debutant">Débutant</option><option value="intermediaire">Intermédiaire</option><option value="avance">Avancé</option></select></label><label><span>Trier</span><select name="tri"><option value="titre">Par titre</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option></select></label></form><p id="compteur" aria-live="polite" aria-atomic="true"></p><div id="resultats" class="grille" aria-busy="true"></div></section><section><h2>Recevoir une confirmation de démonstration</h2><form id="inscription" class="creation" novalidate><label for="prenom">Prénom</label><input id="prenom" name="prenom" required minlength="2" maxlength="60" autocomplete="given-name" aria-describedby="err-prenom"><p id="err-prenom" class="erreur"></p><label for="email">Adresse e-mail</label><input id="email" name="email" type="email" required autocomplete="email" aria-describedby="err-email"><p id="err-email" class="erreur"></p><button type="submit">Tester l’inscription</button><p id="confirmation" role="status"></p><p class="petit">Simulation locale : aucun compte ni courriel envoyé.</p></form></section></main><dialog id="fiche" aria-labelledby="titre-fiche"><h2 id="titre-fiche"></h2><div id="details"></div><button data-fermer>Fermer</button></dialog><footer>SkillHub · Projet pédagogique assisté de Wissam Ben Zayed · Ateliers et profils fictifs</footer>`;
const nav = document.querySelector<HTMLElement>("#navigation")!;
const dialogue = document.querySelector<HTMLDialogElement>("#fiche")!;
const liste = document.querySelector<HTMLDivElement>("#resultats")!;
const compteur = document.querySelector<HTMLParagraphElement>("#compteur")!;
let etat: { ouvert: string[]; filtre: Filtre; donnees: EtatChargement } = {
  ouvert: [],
  filtre: { recherche: "", niveau: "", tri: "titre" },
  donnees: { statut: "chargement" },
};
let declencheur: HTMLElement | null = null;
let controller: AbortController | null = null;
function rendreMenu() {
  nav.querySelectorAll<HTMLButtonElement>("[data-menu]").forEach((b) => {
    const ouvert = etat.ouvert.includes(b.dataset.menu || "");
    b.setAttribute("aria-expanded", String(ouvert));
    const cible = document.getElementById(
      b.getAttribute("aria-controls") || "",
    );
    if (cible) cible.hidden = !ouvert;
  });
}
// Un seul écouteur de clic sur toute la navigation : les futurs sous-menus en bénéficient.
nav.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const b = event.target.closest<HTMLButtonElement>("[data-menu]");
  if (b) {
    const cle = b.dataset.menu!;
    etat.ouvert = etat.ouvert.includes(cle)
      ? etat.ouvert.filter((x) => x !== cle)
      : [...etat.ouvert, cle];
    if (cle === "ressources" && !etat.ouvert.includes(cle)) etat.ouvert = [];
    rendreMenu();
  }
  if (event.target.closest("[data-dialog]"))
    ouvrir(
      "Choisir un atelier",
      "Commencez par le niveau débutant et utilisez les filtres. Tous les ateliers sont des exemples pédagogiques.",
      event.target as HTMLElement,
    );
});
nav.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const dernier = etat.ouvert.pop();
    rendreMenu();
    nav.querySelector<HTMLButtonElement>(`[data-menu="${dernier}"]`)?.focus();
  }
});
function ouvrir(titre: string, texte: string, source: HTMLElement) {
  declencheur = source;
  document.querySelector("#titre-fiche")!.textContent = titre;
  document.querySelector("#details")!.textContent = texte;
  dialogue.showModal();
}
dialogue
  .querySelector("[data-fermer]")!
  .addEventListener("click", () => dialogue.close());
dialogue.addEventListener("close", () => declencheur?.focus());
function carte(a: Atelier) {
  const article = document.createElement("article");
  article.className = "carte";
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = libelleNiveau(a.niveau);
  const titre = document.createElement("h3");
  titre.textContent = a.titre;
  const description = document.createElement("p");
  description.className = "petit";
  description.textContent = `${a.formateur} · ${a.places} places · ${a.format}`;
  const prix = document.createElement("p");
  prix.className = "prix";
  prix.textContent = a.prix === 0 ? "Gratuit" : `${a.prix} €`;
  const bouton = document.createElement("button");
  bouton.textContent = "Voir cet atelier";
  bouton.setAttribute("aria-label", `Voir cet atelier : ${a.titre}`);
  bouton.addEventListener("click", () =>
    ouvrir(a.titre, a.description, bouton),
  );
  article.append(badge, titre, description, prix, bouton);
  return article;
}
function rendreCatalogue() {
  liste.replaceChildren();
  liste.setAttribute("aria-busy", String(etat.donnees.statut === "chargement"));
  switch (etat.donnees.statut) {
    case "chargement":
      compteur.textContent = "Chargement des ateliers…";
      for (let i = 0; i < 3; i++) {
        const d = document.createElement("div");
        d.className = "squelette";
        d.setAttribute("aria-hidden", "true");
        liste.append(d);
      }
      break;
    case "erreur": {
      compteur.textContent = "";
      const bloc = document.createElement("div");
      bloc.setAttribute("role", "alert");
      const p = document.createElement("p");
      p.textContent = etat.donnees.message;
      const b = document.createElement("button");
      b.textContent = "Réessayer";
      b.addEventListener("click", () => void charger());
      bloc.append(p, b);
      liste.append(bloc);
      break;
    }
    case "vide":
      compteur.textContent = "Aucun atelier disponible pour le moment.";
      break;
    case "succes": {
      const visibles = filtrer(etat.donnees.ateliers, etat.filtre);
      compteur.textContent = `${visibles.length} atelier${visibles.length > 1 ? "s" : ""} trouvé${visibles.length > 1 ? "s" : ""}.`;
      if (!visibles.length) {
        const p = document.createElement("p");
        p.textContent =
          "Aucun résultat. Essayez un autre mot ou réinitialisez les filtres.";
        const b = document.createElement("button");
        b.textContent = "Réinitialiser les filtres";
        b.addEventListener("click", () => {
          document.querySelector<HTMLFormElement>(".filtres")!.reset();
          modifierFiltre({ recherche: "", niveau: "", tri: "titre" });
          document.querySelector<HTMLInputElement>("[name=recherche]")?.focus();
        });
        liste.append(p, b);
      } else liste.append(...visibles.map(carte));
    }
  }
}
function modifierFiltre(f: Filtre) {
  etat.filtre = f;
  rendreCatalogue();
}
const filtres = document.querySelector<HTMLFormElement>(".filtres")!;
filtres.addEventListener("submit", (e) => e.preventDefault());
filtres.addEventListener("input", () => {
  const f = new FormData(filtres);
  modifierFiltre({
    recherche: String(f.get("recherche") || ""),
    niveau: String(f.get("niveau") || ""),
    tri: String(f.get("tri") || "titre"),
  });
});
async function charger() {
  controller?.abort();
  controller = new AbortController();
  etat.donnees = { statut: "chargement" };
  rendreCatalogue();
  try {
    const url =
      new URLSearchParams(location.search).get("api") || "/ateliers.json";
    const ateliers = await chargerAteliers(url, controller.signal);
    etat.donnees = ateliers.length
      ? { statut: "succes", ateliers }
      : { statut: "vide" };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") return;
    etat.donnees = {
      statut: "erreur",
      message: e instanceof Error ? e.message : "Réseau indisponible.",
    };
  }
  rendreCatalogue();
}
window.addEventListener("pagehide", () => controller?.abort());
const form = document.querySelector<HTMLFormElement>("#inscription")!;
let envoi = false;
function valider(champ: HTMLInputElement) {
  let message = "";
  if (!champ.checkValidity())
    message = champ.validity.valueMissing
      ? "Ce champ est obligatoire."
      : champ.type === "email"
        ? "Saisissez une adresse e-mail valide."
        : "Au moins deux caractères sont nécessaires.";
  else if (champ.name === "prenom" && champ.value.trim().length < 2)
    message = "Le prénom doit contenir deux caractères utiles.";
  champ.setAttribute("aria-invalid", String(Boolean(message)));
  document.getElementById(`err-${champ.name}`)!.textContent = message;
  return !message;
}
form.addEventListener("input", (e) => {
  if (e.target instanceof HTMLInputElement) valider(e.target);
});
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (envoi) return;
  const champs = [...form.querySelectorAll<HTMLInputElement>("input")];
  const valides = champs.map(valider);
  if (valides.includes(false)) {
    champs[valides.indexOf(false)].focus();
    return;
  }
  envoi = true;
  const bouton = form.querySelector<HTMLButtonElement>("button")!;
  bouton.disabled = true;
  bouton.textContent = "Inscription en cours…";
  await new Promise((r) => setTimeout(r, 650));
  document.querySelector("#confirmation")!.textContent =
    "Démonstration réussie. Aucun compte créé ni message envoyé.";
  bouton.textContent = "Tester à nouveau";
  bouton.disabled = false;
  envoi = false;
});
rendreMenu();
void charger();
