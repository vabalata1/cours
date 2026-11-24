# Trois diagnostics réels avant typage

La copie non typée du script FM02 a été passée au compilateur strict le 30 octobre 2026. Le fichier complet des erreurs est dans preuves/compilation-initiale. Ce sont des diagnostics obtenus pendant cette préparation assistée, pas des souvenirs inventés de l’apprenant.

1. TS18047 : `menu` peut être null. Une page qui ne contient pas le sélecteur fait échouer le script ; la nouvelle racine est vérifiée avant de construire le DOM.
2. TS2339 : `hidden` n’existe pas sur `Element`. La sélection générique ne précise pas un élément HTML ; utiliser `querySelector<HTMLElement>`.
3. TS7006 : un paramètre de fonction tel que `champ` est implicitement any. Il faut un `HTMLInputElement` ou une union réelle des contrôles ; les branches gèrent ensuite leurs propriétés.

Les sélections internes non nulles du nouveau script ciblent le HTML construit juste au-dessus et sont typées. Elles constituent une précondition locale, pas une solution universelle à null. Les données JSON sont inconnues jusqu’à leur validation à l’exécution. Aucun any explicite dans les sources finales.
