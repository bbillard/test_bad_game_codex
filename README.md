# Badminton Lite

Mini-jeu de badminton 2D jouable dans le navigateur, codé avec **Phaser 3** et lancé avec **Deno seulement**.

## Lancer le jeu

Depuis la racine du projet:

```bash
deno run --allow-net --allow-read https://deno.land/std/http/file_server.ts
```

Puis ouvrir:

- http://localhost:8000

## Contrôles

- `←` `→` : déplacement
- `↑` : saut
- `Space` : frappe

## Règles

- Un point est marqué quand le volant touche le sol du camp adverse.
- Premier à **5 points** gagne.
- Après chaque point, les positions sont réinitialisées et un nouveau service démarre.

## Structure

- `index.html` : page d'entrée
- `main.js` : config Phaser
- `scenes/` : Boot, Menu, Game
- `entities/` : Player, AIPlayer, Shuttlecock
- `assets/` : dossier placeholder

Aucune dépendance npm, aucun build step.
