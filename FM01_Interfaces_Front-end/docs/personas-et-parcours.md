# FM02 — TP 1 : personas et parcours

Projet : SkillHub. Auteur : Wissam Ben Zayed. Date : 30 septembre 2026.

## Source et limites

Ces deux profils sont des **proto-personas**, construits à partir des exemples du support FM02 (pages 9–19). Aucune enquête ou entretien n’a été réalisé. Les hypothèses doivent être vérifiées par des utilisateurs réels. Ils servent à décider de l’interface, pas à prouver le comportement de tous les apprenants.

## Persona apprenant — Inès

| Champ | Hypothèse de travail |
|---|---|
| Contexte | En reconversion, consulte les formations le soir, sur téléphone et parfois avec une connexion faible. |
| Objectif | Choisir rapidement un atelier débutant qu’elle peut suivre après le travail. |
| Aisance | Habituée au téléphone, peu familière avec le vocabulaire du développement. |
| Freins | Prix tardif, niveau ambigu, formulaire long, erreur incompréhensible. |
| Contraintes d’accès | Lecture en extérieur, besoin de contrastes élevés ; écran étroit et réseau limité. |
| Sur quoi elle repose | Hypothèses inspirées du persona Inès du support, datées du 30/09/2026. |

Décision 1 : afficher niveau, prix, durée, format et créneau directement dans chaque carte. Décision 2 : proposer les filtres niveau/créneau et un formulaire court, avec des messages de correction visibles. Idée abandonnée : une inscription avec mot de passe, plusieurs écrans et prix révélé à la fin. Le prototype front-end ne crée pas de compte réel ; l’authentification sera traitée plus tard dans la formation.

## Persona formateur — Karim

| Champ | Hypothèse de travail |
|---|---|
| Contexte | Formateur indépendant, utilise un ordinateur entre deux missions. |
| Objectif | Comprendre comment proposer un atelier et rejoindre la plateforme. |
| Aisance | À l’aise avec les outils, souhaite éviter un apprentissage supplémentaire. |
| Freins | Formulaire qui efface la saisie, fonctionnement uniquement à la souris, confirmation ambiguë. |
| Contraintes d’accès | Utilise beaucoup le clavier ; a besoin d’un ordre de navigation logique et d’un focus visible. |
| Sur quoi il repose | Hypothèses inspirées du persona Karim du support, datées du 30/09/2026. |

Décision 1 : rendre chaque lien, filtre et champ accessible au clavier, avec indicateur de focus. Décision 2 : garder les valeurs saisies en cas d’erreur et adapter le choix d’atelier lorsque le profil formateur est sélectionné. Idée abandonnée : une interface fondée sur le survol et des cartes cliquables sans bouton ou lien natif. Le tableau de bord de publication est hors du périmètre de FM01/FM02.

## Parcours d’inscription d’Inès — six colonnes

| Étape | Point de contact | Action | Attente | Douleur envisagée | Décision d’interface |
|---|---|---|---|---|---|
| Découverte | Accroche de la page | Lit la promesse | Savoir si c’est pour elle | Termes techniques qui découragent | Promesse simple, orientée pratique et reconversion. |
| Exploration | Catalogue | Choisit niveau et créneau | Trouver une séance compatible | Trop de choix, mauvais niveau | Deux filtres explicites et compteur de résultats. |
| Décision | Carte d’atelier | Compare prix et durée | Comprendre le coût avant de s’engager | Prix ou format dissimulé | Informations visibles dès la carte, avant l’action. |
| Inscription | Formulaire | Saisit prénom et courriel | Finir sans recommencer | Adresse refusée sans raison ; saisie effacée | Label relié, aide de format, erreur précise, données conservées. |
| Validation | Bouton et zone de message | Confirme les champs | Voir une réponse immédiate | Double clic ou absence de retour | État de vérification et confirmation annoncée en région live. |
| Confirmation | Message de démonstration | Lit le résultat | Connaître la suite | Croire qu’un compte réel existe | Dire explicitement qu’aucun compte ni courriel n’est créé dans cette démonstration. |

## Ce que le parcours condamne

Comme aucun ancien site n’existait, il ne s’agit pas d’un constat sur un travail antérieur de Wissam. Sur la version initiale pédagogique jointe, on rejette les contrastes faibles, les champs sans liaison avec leurs labels et le focus invisible. Sur la version finale, prix et niveau sont visibles, la saisie est conservée, et le catalogue vide guide vers un autre filtre. Les entretiens et l’observation du ressenti restent à mener ; aucune courbe émotionnelle n’est présentée comme une mesure.
