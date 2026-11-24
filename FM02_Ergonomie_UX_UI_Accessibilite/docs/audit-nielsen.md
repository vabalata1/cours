# FM02 — TP 2 : audit heuristique

Wissam Ben Zayed · 30/09/2026. Audit réalisé avec assistance, sur les pages publiques de FUN MOOC, sans connexion. Périmètre limité à deux tâches ; aucun compte n’a été créé.

Tâche A : rechercher une formation de programmation adaptée à un débutant. Tâche B : ouvrir une fiche et comprendre sa durée, ses prérequis et son prix. Une première exploration a été suivie d’une vérification des constats. Les états transitoires de chargement ne sont pas considérés comme des résultats définitifs.

| N° | Heuristique | Observation et preuve | Sévérité |
|---|---|---|---|
| 1 | Visibilité de l’état | Compteur de résultats affiché après recherche. Preuve : capture recherche. | 0 |
| 2 | Langage de l’utilisateur | Recherche vide : intervalle commençant à 1 et finissant à 0. Preuve : capture recherche vide. | 2 |
| 3 | Contrôle et liberté | Retour navigateur : terme recherché conservé. Preuve : vérification de l’adresse et du champ. | 0 |
| 4 | Cohérence | Catalogue et fiche utilisent une navigation et des titres cohérents. | 0 |
| 5 | Prévention | La connexion est annoncée avant l’inscription. Preuve : fiche Python. | 0 |
| 6 | Reconnaissance | Informations temporelles réunies sur la fiche ; prérequis dans une section dédiée. | 0 |
| 7 | Efficacité | Filtres disponibles mais aucun filtre de niveau repéré dans le catalogue inspecté. | 2 |
| 8 | Sobriété | Nombreuses familles de filtres, dont les licences, avant les critères utiles au débutant. | 1 |
| 9 | Récupération d’erreur | Aucun conseil visible après la recherche HTML sans résultat. | 2 |
| 10 | Aide | Liens d’aide et FAQ accessibles dans le pied de page. | 0 |

Échelle : 0 aucun problème observé, 1 cosmétique, 2 mineur, 3 majeur, 4 bloquant. Les notes reflètent ce parcours, pas tout le site.

Trois recommandations vérifiables : pour zéro résultat, retirer l’intervalle incohérent ; afficher une suggestion de reformulation et un bouton d’effacement ; proposer un filtre de niveau explicite. Défaut commun évité sur SkillHub : une liste vide sans conseil. La combinaison intermédiaire/journée affiche une explication et la possibilité de réinitialiser.

Sources : [catalogue FUN MOOC](https://www.fun-mooc.fr/fr/cours/), [fiche Python](https://www.fun-mooc.fr/fr/cours/python-3-des-fondamentaux-aux-concepts-avances-du-langage/). Preuves : `preuves/fun-recherche.jpg`, `preuves/fun-programmation.jpg`, `preuves/fun-fiche.jpg`. L’attribution d’une plateforme différente par apprenant doit être confirmée avec le formateur.
