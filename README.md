# Marie

Le cahier de laboratoire des femmes scientifiques : une entrée par femme, datée et sourcée.

**Site : https://carolinedanslesnuages.github.io/marie/**

Le nom rend hommage à Marie Curie, seule personne à avoir reçu deux prix Nobel dans deux sciences
différentes (physique en 1903, chimie en 1911), et à toutes celles dont le travail a été oublié
ou signé par un autre.

## Le cahier

- **Papier à petits carreaux**, comme un vrai cahier de laboratoire : chaque entrée porte un
  numéro, une date et une discipline en tête de page, et une case « Visa » en bas.
- **Une femme par double page** : ses notes commencent sous son nom, à gauche, et continuent à
  droite, suivies des références. Sur un petit écran, les deux pages se suivent.
- **On tourne les pages** avec les liens ou les flèches du clavier. L'animation disparaît si le
  système demande de réduire les mouvements.
- **Pas d'ordre imposé** : les entrées paraissent de temps en temps, dans le désordre de
  l'histoire des sciences.
- **Une table des matières** classe les entrées par mois de parution, avec une recherche et un
  filtre par discipline.

Toutes les disciplines (mathématiques, informatique, physique, astronomie, chimie, Terre et climat,
médecine, biologie, ingénierie), toutes les époques, tous les pays. Deux autres cahiers
accompagnent celui-ci : [Séverine](https://github.com/Carolinedanslesnuages/severine), les
révolutionnaires, et [Simone](https://github.com/Carolinedanslesnuages/simone), les droits des
femmes.

## Les références

Chaque fait vient d'une référence citée dans l'entrée : Fondation Nobel, encyclopédies,
académies, instituts de recherche, musées, universités, livres d'historiennes et d'historiens des
sciences. Wikipédia sert à repérer une piste, jamais de référence (le test le refuse).

## Ajouter une entrée

Une entrée = un fichier `data/women/<identifiant>.json` (minuscules, sans accents, tirets) :

```json
{
  "name": "Marie Curie",
  "birth": "1867",
  "death": "1934",
  "country": "Pologne et France",
  "region": "europe",
  "field": "physique",
  "published": "2026-11-28",
  "summary": "Une phrase courte.",
  "notes": ["Premier paragraphe.", "Deuxième paragraphe."],
  "actions": [
    { "date": "1898-07-18", "theme": "decouverte", "text": "Ce qu'elle a fait, en une ou deux phrases." }
  ],
  "sources": [
    { "title": "Titre de la page (Institution)", "url": "https://…" }
  ]
}
```

- `published` : jour de parution (`AAAA-MM-JJ`), un seul par jour. Une entrée datée dans le
  futur reste cachée jusqu'à ce jour-là (le site est reconstruit chaque nuit).
- `death` : vide (`""`) si elle est vivante.
- `field` : [data/fields.json](data/fields.json) ; `region` : [data/regions.json](data/regions.json) ;
  `theme` : [data/themes.json](data/themes.json).
- `actions` : ses travaux datés (`AAAA`, `AAAA-MM` ou `AAAA-MM-JJ`, dans l'ordre chronologique ;
  l'an 415 s'écrit `0415`). Ils ne s'affichent pas : ils servent à vérifier les notes.
- Une référence sans lien cite au moins son auteur.

`npm test` vérifie toutes les entrées.

## Développer

Il faut Node.js 20 ou plus récent.

```sh
npm install
npm run dev            # site local
npm test               # entrées et fonctions
npm run build && npm run preview &
npm run test:browser   # parcours et accessibilité dans Chromium
```

Vue 3 et Vite, sans autre dépendance. Chaque push sur `main` vérifie les entrées, construit le
site, contrôle le parcours et l'accessibilité (RGAA 4.1.2 : titres, lien d'évitement, focus,
flèches du clavier, message de statut, reflow à 320 px, texte à 200 %, axe-core en clair et en
sombre), puis publie sur GitHub Pages. Ces contrôles automatiques ne remplacent pas un audit RGAA
complet.

## Licence

[MIT](LICENSE).
