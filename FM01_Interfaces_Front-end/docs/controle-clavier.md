# Parcours clavier — réalisé et à compléter

Tests effectués le 30/09/2026 dans le navigateur Chromium de l’app, sur le site local. Le lecteur d’écran n’a pas été testé.

1. Activer le lien d’évitement avec Entrée : le focus arrive sur `main#contenu`.
2. Sur téléphone : Entrée ouvre Menu ; Tab atteint le premier lien avec un contour visible ; Échap ferme et rend le focus au bouton Menu.
3. Naviguer vers le catalogue. Les select sont natifs, les labels sont liés, les commandes sont accessibles.
4. Choisir intermédiaire/journée : le message de liste vide apparaît. Réinitialiser : les trois cartes reviennent.
5. Soumettre les champs vides : quatre erreurs sont listées, le focus arrive sur Prénom. Les champs reçoivent `aria-invalid="true"`.
6. Remplir avec des données de test : prénom Test, courriel test@example.com, profil apprenant, atelier Git. Valider à Entrée : la confirmation apparaît après l’état de vérification ; aucune requête d’inscription n’est prévue.
7. Ouvrir l’information à Entrée : le `dialog` natif apparaît. Échap le ferme et le focus revient au déclencheur.
8. Les SVG décoratifs sont retirés de l’arbre accessible ; la photo d’accroche a un texte alternatif ; les portraits illustratifs sont décoratifs.

À vérifier par Wissam : refaire le parcours complet en Tab et Shift+Tab, zoomer à 200 %, utiliser NVDA sur Windows ou VoiceOver sur macOS, vérifier les annonces d’erreur et de confirmation. Le `dialog` rend le fond inerte ; le focus du navigateur peut passer par son interface propre, ce qui ne signifie pas qu’un élément du fond de page est utilisable.

Preuves : `tests-interactions.json`, `arbre-accessibilite.txt`, `confirmation.jpg`, `dialog.jpg`, dans `docs/preuves/`. Le texte de l’arbre est un export de la représentation exposée par le navigateur, pas une capture du panneau DevTools : réaliser cette capture en classe si le formateur la demande.
