# FM01 — TP 3 : responsive

Le CSS utilise une base mobile puis deux enrichissements : 48em et 64em. Ce sont trois paliers de mise en page ; ils ne correspondent pas à des marques d’appareils.

| Seuil | Intention | Justification de la version créée |
|---|---|---|
| Base, sans media query | Une colonne, menu repliable, cartes fluides | Le contenu reste lisible sur 320 et 360 px. Une carte ne dépasse pas la largeur de son conteneur. |
| 48em | Accroche et inscription en deux colonnes ; trois profils côte à côte | À la largeur tablette testée, deux blocs peuvent tenir côte à côte. La grille d’ateliers calcule ses colonnes indépendamment. |
| 64em | Navigation complète, marges plus larges | L’ensemble des liens et de l’action tient dans l’en-tête à la largeur ordinateur. |

Vérifications réalisées : 320, 360, 768, 1280 px, images chargées, aucun débordement horizontal. Captures enregistrées pour 360, 768 et 1280. Le document conserve le même ordre de lecture à chaque palier. Grid sert au catalogue ; Flexbox sert à chaque carte et à la navigation.

Les seuils ont été choisis pour la composition puis vérifiés à ces largeurs. La recherche de la largeur exacte où la page casse, en redimensionnant lentement, reste à réaliser en classe : ne pas présenter ces valeurs comme des largeurs issues d’une observation utilisateur.
