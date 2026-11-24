'use strict';
// HTML utilisable sans JS ; les contrôles supplémentaires apparaissent au démarrage.
document.documentElement.classList.add('js');
const boutonMenu = document.querySelector('#btn-menu');
const menu = document.querySelector('#menu-principal');
const grandEcran = window.matchMedia('(min-width: 64em)');
function fermerMenu() { menu.hidden = true; boutonMenu.setAttribute('aria-expanded', 'false'); }
function synchroniserMenu() {
  // Éviter de masquer l'élément actuellement au focus en redimensionnant.
  if (grandEcran.matches) {
    if (document.activeElement === boutonMenu) menu.querySelector('a').focus();
    boutonMenu.hidden = true; menu.hidden = false; boutonMenu.setAttribute('aria-expanded', 'false');
  } else {
    boutonMenu.hidden = false;
    if (menu.contains(document.activeElement)) boutonMenu.focus();
    fermerMenu();
  }
}
synchroniserMenu();
grandEcran.addEventListener('change', synchroniserMenu);
boutonMenu.addEventListener('click', () => {
  const ouvert = boutonMenu.getAttribute('aria-expanded') === 'true';
  menu.hidden = ouvert; boutonMenu.setAttribute('aria-expanded', String(!ouvert));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !grandEcran.matches && !menu.hidden) {
    fermerMenu(); boutonMenu.focus();
  }
});
menu.addEventListener('click', (e) => {
  if (e.target.closest('a') && !grandEcran.matches) {
    const cible = document.querySelector(e.target.closest('a').getAttribute('href'));
    fermerMenu();
    if (cible) { cible.setAttribute('tabindex', '-1'); cible.focus({ preventScroll: true }); }
  }
});
document.addEventListener('click', (e) => {
  if (!grandEcran.matches && !menu.hidden && !e.target.closest('nav')) {
    const focusDansMenu = menu.contains(document.activeElement);
    fermerMenu(); if (focusDansMenu) boutonMenu.focus();
  }
});
const filtres = document.querySelector('#filtres');
filtres.hidden = false;
function filtrer() {
  const niveau = document.querySelector('#niveau-filtre').value;
  const horaire = document.querySelector('#horaire-filtre').value;
  let nombre = 0;
  document.querySelectorAll('.atelier').forEach((carte) => {
    const visible = (niveau === 'tous' || carte.dataset.niveau === niveau) && (horaire === 'tous' || carte.dataset.horaire === horaire);
    carte.closest('li').hidden = !visible; if (visible) nombre++;
  });
  document.querySelector('#resultats').textContent = `${nombre} atelier${nombre === 1 ? '' : 's'} disponible${nombre === 1 ? '' : 's'}`;
  document.querySelector('#catalogue-vide').hidden = nombre !== 0;
}
filtres.addEventListener('change', filtrer);
filtres.addEventListener('submit', (e) => { e.preventDefault(); filtrer(); });
filtres.addEventListener('reset', () => setTimeout(filtrer, 0));
const formulaire = document.querySelector('#form-inscription');
document.querySelector('#envoyer').disabled = false;
// Sans JS, la validation native reste présente ; avec JS, messages reliés et résumé.
formulaire.noValidate = true;
const champs = [...formulaire.querySelectorAll('input, select')];
const touches = new Set();
function messageErreur(champ) {
  if (champ.validity.valueMissing) return champ.tagName === 'SELECT' ? 'Choisissez une option.' : 'Complétez ce champ.';
  if (champ.validity.typeMismatch) return 'Saisissez une adresse comme nom@domaine.fr.';
  if (champ.id === 'prenom' && !champ.value.trim()) return 'Saisissez un prénom, sans utiliser seulement des espaces.';
  return '';
}
function verifier(champ) {
  const message = messageErreur(champ);
  const erreur = document.querySelector(`#erreur-${champ.id}`);
  champ.setAttribute('aria-invalid', String(Boolean(message)));
  erreur.textContent = message; erreur.hidden = !message;
  return !message;
}
champs.forEach((champ) => {
  champ.addEventListener('blur', () => { touches.add(champ.id); verifier(champ); });
  champ.addEventListener('input', () => {
    if (touches.has(champ.id)) verifier(champ);
    document.querySelector('#confirmation').textContent = '';
    document.querySelector('#resume-erreurs').hidden = true;
  });
  champ.addEventListener('change', () => { touches.add(champ.id); verifier(champ); document.querySelector('#confirmation').textContent = ''; });
});
document.querySelector('#profil').addEventListener('change', (e) => {
  if (e.target.value === 'formateur') {
    document.querySelector('#atelier-choisi').value = 'Je souhaite proposer un atelier';
    verifier(document.querySelector('#atelier-choisi'));
  }
});
document.querySelectorAll('[data-atelier]').forEach((lien) => {
  lien.addEventListener('click', () => {
    document.querySelector('#atelier-choisi').value = lien.dataset.atelier;
    document.querySelector('#profil').value = 'apprenant';
    verifier(document.querySelector('#atelier-choisi')); verifier(document.querySelector('#profil'));
    document.querySelector('#prenom').focus({ preventScroll: true });
  });
});
let enCours = false;
formulaire.addEventListener('submit', (e) => {
  e.preventDefault(); // Démonstration sans serveur : ne transmettre aucune donnée.
  if (enCours) return;
  document.querySelector('#confirmation').textContent = '';
  const erreurs = champs.filter((champ) => { touches.add(champ.id); return !verifier(champ); });
  const resume = document.querySelector('#resume-erreurs');
  if (erreurs.length) {
    resume.hidden = false; resume.textContent = `${erreurs.length} champ${erreurs.length > 1 ? 's' : ''} à corriger. ${erreurs.map(c => document.querySelector(`label[for="${c.id}"]`).textContent).join(', ')}.`;
    erreurs[0].focus(); return;
  }
  resume.hidden = true; enCours = true;
  const bouton = document.querySelector('#envoyer');
  bouton.setAttribute('aria-disabled', 'true'); bouton.textContent = 'Vérification en cours…'; formulaire.setAttribute('aria-busy', 'true');
  setTimeout(() => {
    const confirmation = document.querySelector('#confirmation');
    confirmation.textContent = 'Test réussi : les champs sont valides. Aucun compte n’a été créé, aucune inscription n’a été enregistrée et aucun courriel n’a été envoyé.';
    bouton.removeAttribute('aria-disabled'); bouton.textContent = 'Tester mon inscription'; formulaire.removeAttribute('aria-busy'); enCours = false;
  }, 450);
});
const dialog = document.querySelector('#dialog-atelier');
const ouvrir = document.querySelector('#ouvrir-dialog');
if (typeof dialog.showModal === 'function') {
  ouvrir.hidden = false;
  ouvrir.addEventListener('click', () => dialog.showModal());
  document.querySelector('#fermer-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => ouvrir.focus());
}
