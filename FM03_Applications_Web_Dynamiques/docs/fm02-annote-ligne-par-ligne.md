# Lecture ligne par ligne du script FM02

Code original conservé avec une explication par ligne. Support de révision assisté : l’explication orale avec un voisin reste à réaliser.

**Ligne 1.** Initialise le mode strict, la classe JS et les références du menu ; matchMedia suit le palier 64em.
```js
'use strict';
```

**Ligne 2.** Commentaire explicatif ; aucune instruction exécutée.
```js
// HTML utilisable sans JS ; les contrôles supplémentaires apparaissent au démarrage.
```

**Ligne 3.** Initialise le mode strict, la classe JS et les références du menu ; matchMedia suit le palier 64em.
```js
document.documentElement.classList.add('js');
```

**Ligne 4.** Initialise le mode strict, la classe JS et les références du menu ; matchMedia suit le palier 64em.
```js
const boutonMenu = document.querySelector('#btn-menu');
```

**Ligne 5.** Initialise le mode strict, la classe JS et les références du menu ; matchMedia suit le palier 64em.
```js
const menu = document.querySelector('#menu-principal');
```

**Ligne 6.** Initialise le mode strict, la classe JS et les références du menu ; matchMedia suit le palier 64em.
```js
const grandEcran = window.matchMedia('(min-width: 64em)');
```

**Ligne 7.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
function fermerMenu() { menu.hidden = true; boutonMenu.setAttribute('aria-expanded', 'false'); }
```

**Ligne 8.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
function synchroniserMenu() {
```

**Ligne 9.** Commentaire explicatif ; aucune instruction exécutée.
```js
  // Éviter de masquer l'élément actuellement au focus en redimensionnant.
```

**Ligne 10.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
  if (grandEcran.matches) {
```

**Ligne 11.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
    if (document.activeElement === boutonMenu) menu.querySelector('a').focus();
```

**Ligne 12.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
    boutonMenu.hidden = true; menu.hidden = false; boutonMenu.setAttribute('aria-expanded', 'false');
```

**Ligne 13.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
  } else {
```

**Ligne 14.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
    boutonMenu.hidden = false;
```

**Ligne 15.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
    if (menu.contains(document.activeElement)) boutonMenu.focus();
```

**Ligne 16.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
    fermerMenu();
```

**Ligne 17.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  }
```

**Ligne 18.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
}
```

**Ligne 19.** Ferme ou synchronise le menu selon la largeur, en déplaçant le focus avant de cacher un contrôle actif.
```js
synchroniserMenu();
```

**Ligne 20.** Appelle la synchronisation et écoute les changements de largeur et le bouton ; aria-expanded reflète l’ouverture.
```js
grandEcran.addEventListener('change', synchroniserMenu);
```

**Ligne 21.** Appelle la synchronisation et écoute les changements de largeur et le bouton ; aria-expanded reflète l’ouverture.
```js
boutonMenu.addEventListener('click', () => {
```

**Ligne 22.** Appelle la synchronisation et écoute les changements de largeur et le bouton ; aria-expanded reflète l’ouverture.
```js
  const ouvert = boutonMenu.getAttribute('aria-expanded') === 'true';
```

**Ligne 23.** Appelle la synchronisation et écoute les changements de largeur et le bouton ; aria-expanded reflète l’ouverture.
```js
  menu.hidden = ouvert; boutonMenu.setAttribute('aria-expanded', String(!ouvert));
```

**Ligne 24.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 25.** Appelle la synchronisation et écoute les changements de largeur et le bouton ; aria-expanded reflète l’ouverture.
```js
document.addEventListener('keydown', (e) => {
```

**Ligne 26.** Appelle la synchronisation et écoute les changements de largeur et le bouton ; aria-expanded reflète l’ouverture.
```js
  if (e.key === 'Escape' && !grandEcran.matches && !menu.hidden) {
```

**Ligne 27.** Intercepte Échap pour fermer le menu mobile et rendre le focus au bouton.
```js
    fermerMenu(); boutonMenu.focus();
```

**Ligne 28.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  }
```

**Ligne 29.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 30.** Intercepte Échap pour fermer le menu mobile et rendre le focus au bouton.
```js
menu.addEventListener('click', (e) => {
```

**Ligne 31.** Intercepte Échap pour fermer le menu mobile et rendre le focus au bouton.
```js
  if (e.target.closest('a') && !grandEcran.matches) {
```

**Ligne 32.** Intercepte Échap pour fermer le menu mobile et rendre le focus au bouton.
```js
    const cible = document.querySelector(e.target.closest('a').getAttribute('href'));
```

**Ligne 33.** Délègue les liens du menu ; ferme puis concentre la section cible, rendue focalisable avec tabindex=-1.
```js
    fermerMenu();
```

**Ligne 34.** Délègue les liens du menu ; ferme puis concentre la section cible, rendue focalisable avec tabindex=-1.
```js
    if (cible) { cible.setAttribute('tabindex', '-1'); cible.focus({ preventScroll: true }); }
```

**Ligne 35.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  }
```

**Ligne 36.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 37.** Délègue les liens du menu ; ferme puis concentre la section cible, rendue focalisable avec tabindex=-1.
```js
document.addEventListener('click', (e) => {
```

**Ligne 38.** Délègue les liens du menu ; ferme puis concentre la section cible, rendue focalisable avec tabindex=-1.
```js
  if (!grandEcran.matches && !menu.hidden && !e.target.closest('nav')) {
```

**Ligne 39.** Délègue les liens du menu ; ferme puis concentre la section cible, rendue focalisable avec tabindex=-1.
```js
    const focusDansMenu = menu.contains(document.activeElement);
```

**Ligne 40.** Délègue les liens du menu ; ferme puis concentre la section cible, rendue focalisable avec tabindex=-1.
```js
    fermerMenu(); if (focusDansMenu) boutonMenu.focus();
```

**Ligne 41.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  }
```

**Ligne 42.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 43.** Ferme lors d’un clic extérieur ; restaure le focus uniquement si son contrôle allait être masqué.
```js
const filtres = document.querySelector('#filtres');
```

**Ligne 44.** Ferme lors d’un clic extérieur ; restaure le focus uniquement si son contrôle allait être masqué.
```js
filtres.hidden = false;
```

**Ligne 45.** Ferme lors d’un clic extérieur ; restaure le focus uniquement si son contrôle allait être masqué.
```js
function filtrer() {
```

**Ligne 46.** Ferme lors d’un clic extérieur ; restaure le focus uniquement si son contrôle allait être masqué.
```js
  const niveau = document.querySelector('#niveau-filtre').value;
```

**Ligne 47.** Ferme lors d’un clic extérieur ; restaure le focus uniquement si son contrôle allait être masqué.
```js
  const horaire = document.querySelector('#horaire-filtre').value;
```

**Ligne 48.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
  let nombre = 0;
```

**Ligne 49.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
  document.querySelectorAll('.atelier').forEach((carte) => {
```

**Ligne 50.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
    const visible = (niveau === 'tous' || carte.dataset.niveau === niveau) && (horaire === 'tous' || carte.dataset.horaire === horaire);
```

**Ligne 51.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
    carte.closest('li').hidden = !visible; if (visible) nombre++;
```

**Ligne 52.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  });
```

**Ligne 53.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
  document.querySelector('#resultats').textContent = `${nombre} atelier${nombre === 1 ? '' : 's'} disponible${nombre === 1 ? '' : 's'}`;
```

**Ligne 54.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
  document.querySelector('#catalogue-vide').hidden = nombre !== 0;
```

**Ligne 55.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
}
```

**Ligne 56.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
filtres.addEventListener('change', filtrer);
```

**Ligne 57.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
filtres.addEventListener('submit', (e) => { e.preventDefault(); filtrer(); });
```

**Ligne 58.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
filtres.addEventListener('reset', () => setTimeout(filtrer, 0));
```

**Ligne 59.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
const formulaire = document.querySelector('#form-inscription');
```

**Ligne 60.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
document.querySelector('#envoyer').disabled = false;
```

**Ligne 61.** Commentaire explicatif ; aucune instruction exécutée.
```js
// Sans JS, la validation native reste présente ; avec JS, messages reliés et résumé.
```

**Ligne 62.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
formulaire.noValidate = true;
```

**Ligne 63.** Expose les filtres, calcule les cartes visibles, masque les autres et met à jour le compteur et l’état vide.
```js
const champs = [...formulaire.querySelectorAll('input, select')];
```

**Ligne 64.** Active la validation enrichie et rassemble les contrôles et les champs déjà visités.
```js
const touches = new Set();
```

**Ligne 65.** Active la validation enrichie et rassemble les contrôles et les champs déjà visités.
```js
function messageErreur(champ) {
```

**Ligne 66.** Active la validation enrichie et rassemble les contrôles et les champs déjà visités.
```js
  if (champ.validity.valueMissing) return champ.tagName === 'SELECT' ? 'Choisissez une option.' : 'Complétez ce champ.';
```

**Ligne 67.** Active la validation enrichie et rassemble les contrôles et les champs déjà visités.
```js
  if (champ.validity.typeMismatch) return 'Saisissez une adresse comme nom@domaine.fr.';
```

**Ligne 68.** Active la validation enrichie et rassemble les contrôles et les champs déjà visités.
```js
  if (champ.id === 'prenom' && !champ.value.trim()) return 'Saisissez un prénom, sans utiliser seulement des espaces.';
```

**Ligne 69.** Active la validation enrichie et rassemble les contrôles et les champs déjà visités.
```js
  return '';
```

**Ligne 70.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
}
```

**Ligne 71.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
function verifier(champ) {
```

**Ligne 72.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
  const message = messageErreur(champ);
```

**Ligne 73.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
  const erreur = document.querySelector(`#erreur-${champ.id}`);
```

**Ligne 74.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
  champ.setAttribute('aria-invalid', String(Boolean(message)));
```

**Ligne 75.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
  erreur.textContent = message; erreur.hidden = !message;
```

**Ligne 76.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
  return !message;
```

**Ligne 77.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
}
```

**Ligne 78.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
champs.forEach((champ) => {
```

**Ligne 79.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
  champ.addEventListener('blur', () => { touches.add(champ.id); verifier(champ); });
```

**Ligne 80.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
  champ.addEventListener('input', () => {
```

**Ligne 81.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
    if (touches.has(champ.id)) verifier(champ);
```

**Ligne 82.** Calcule un message selon validity, puis associe le texte, aria-invalid et la visibilité du message.
```js
    document.querySelector('#confirmation').textContent = '';
```

**Ligne 83.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
    document.querySelector('#resume-erreurs').hidden = true;
```

**Ligne 84.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  });
```

**Ligne 85.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
  champ.addEventListener('change', () => { touches.add(champ.id); verifier(champ); document.querySelector('#confirmation').textContent = ''; });
```

**Ligne 86.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 87.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
document.querySelector('#profil').addEventListener('change', (e) => {
```

**Ligne 88.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
  if (e.target.value === 'formateur') {
```

**Ligne 89.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
    document.querySelector('#atelier-choisi').value = 'Je souhaite proposer un atelier';
```

**Ligne 90.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
    verifier(document.querySelector('#atelier-choisi'));
```

**Ligne 91.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  }
```

**Ligne 92.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 93.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
document.querySelectorAll('[data-atelier]').forEach((lien) => {
```

**Ligne 94.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
  lien.addEventListener('click', () => {
```

**Ligne 95.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
    document.querySelector('#atelier-choisi').value = lien.dataset.atelier;
```

**Ligne 96.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
    document.querySelector('#profil').value = 'apprenant';
```

**Ligne 97.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
    verifier(document.querySelector('#atelier-choisi')); verifier(document.querySelector('#profil'));
```

**Ligne 98.** Valide à la sortie et à la modification ; retire les confirmations devenues obsolètes et préremplit le choix formateur.
```js
    document.querySelector('#prenom').focus({ preventScroll: true });
```

**Ligne 99.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  });
```

**Ligne 100.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 101.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
let enCours = false;
```

**Ligne 102.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
formulaire.addEventListener('submit', (e) => {
```

**Ligne 103.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
  e.preventDefault(); // Démonstration sans serveur : ne transmettre aucune donnée.
```

**Ligne 104.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
  if (enCours) return;
```

**Ligne 105.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
  document.querySelector('#confirmation').textContent = '';
```

**Ligne 106.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
  const erreurs = champs.filter((champ) => { touches.add(champ.id); return !verifier(champ); });
```

**Ligne 107.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
  const resume = document.querySelector('#resume-erreurs');
```

**Ligne 108.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
  if (erreurs.length) {
```

**Ligne 109.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
    resume.hidden = false; resume.textContent = `${erreurs.length} champ${erreurs.length > 1 ? 's' : ''} à corriger. ${erreurs.map(c => document.querySelector(`label[for="${c.id}"]`).textContent).join(', ')}.`;
```

**Ligne 110.** Préremplit les contrôles à partir d’une carte d’atelier et porte le focus au premier champ.
```js
    erreurs[0].focus(); return;
```

**Ligne 111.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
  }
```

**Ligne 112.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  resume.hidden = true; enCours = true;
```

**Ligne 113.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  const bouton = document.querySelector('#envoyer');
```

**Ligne 114.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  bouton.setAttribute('aria-disabled', 'true'); bouton.textContent = 'Vérification en cours…'; formulaire.setAttribute('aria-busy', 'true');
```

**Ligne 115.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  setTimeout(() => {
```

**Ligne 116.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
    const confirmation = document.querySelector('#confirmation');
```

**Ligne 117.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
    confirmation.textContent = 'Test réussi : les champs sont valides. Aucun compte n’a été créé, aucune inscription n’a été enregistrée et aucun courriel n’a été envoyé.';
```

**Ligne 118.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
    bouton.removeAttribute('aria-disabled'); bouton.textContent = 'Tester mon inscription'; formulaire.removeAttribute('aria-busy'); enCours = false;
```

**Ligne 119.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  }, 450);
```

**Ligne 120.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
});
```

**Ligne 121.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
const dialog = document.querySelector('#dialog-atelier');
```

**Ligne 122.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
const ouvrir = document.querySelector('#ouvrir-dialog');
```

**Ligne 123.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
if (typeof dialog.showModal === 'function') {
```

**Ligne 124.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  ouvrir.hidden = false;
```

**Ligne 125.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  ouvrir.addEventListener('click', () => dialog.showModal());
```

**Ligne 126.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  document.querySelector('#fermer-dialog').addEventListener('click', () => dialog.close());
```

**Ligne 127.** Bloque le double envoi, vérifie tous les contrôles, concentre la première erreur ou affiche une confirmation simulée après attente.
```js
  dialog.addEventListener('close', () => ouvrir.focus());
```

**Ligne 128.** Termine le bloc ou la fonction de rappel commencé au-dessus.
```js
}
```

