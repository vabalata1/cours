# FM01 — TP 1 : structure et erreurs corrigées

Arbre de titres :

```text
h1 Changez de cap. Apprenez en faisant.
  h2 Moins de jargon. Plus de pratique.
    h3 Proximité / Transparence / Pratique / Progression / Souplesse / Accessibilité
  h2 Un petit pas. Une vraie compétence.
    h3 Votre première page en HTML et CSS
    h3 Git, sans perdre le fil
    h3 Des interfaces accessibles au clavier
  h2 Des personnes, avant des profils.
    h3 Sarah Benali / Karim Diallo / Lina Moreau
  h2 Votre prochain chapitre commence par un atelier.
```

La fenêtre d’information contient un h2 lorsqu’elle est ouverte. Les cinq sections demandées sont présentes : accroche, valeurs, ateliers, formateurs, inscription. Les fiches sont des `article`. La navigation, l’en-tête, le contenu principal et le pied utilisent leurs balises natives. Les champs possèdent des labels reliés. Langue, titre, description et viewport sont déclarés.

Trois erreurs réellement corrigées pendant la création assistée :

1. Deux ouvertures d’option étaient écrites comme des fermetures avec attributs. Correction : fermer l’option précédente puis ouvrir la suivante. Une erreur HTML peut changer le DOM malgré un rendu tolérant.
2. Le petit formulaire de filtres n’avait que Réinitialiser. Ajout d’Afficher comme bouton submit, avec prévention de rechargement. Une action explicite complète le changement automatique.
3. Le prénom n’avait pas de type explicite. Ajout de `type="text"`, pour rendre l’intention lisible et passer la règle locale de validation.

Ces erreurs sont celles de la création avec assistance ; elles ne doivent pas être présentées comme une expérience personnelle antérieure de Wissam. Le validateur officiel W3C a renvoyé zéro message d’erreur pour les deux pages. Fichiers JSON : `validation-w3c-index.html.json` et `validation-w3c-credits.html.json`.

La relecture avec CSS désactivé et la relecture du plan par un camarade sont à faire. L’intégration a été vérifiée structurellement ; aucun retour de camarade n’a été inventé.
