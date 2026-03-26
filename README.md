# Soongyu Choi Static Blog

This repository contains a GitHub Pages-ready static website built with plain HTML, CSS, and JavaScript.

## Structure

- `index.html`: landing page
- `about.html`: profile page
- `publications.html`: conference and journal papers with modal details
- `projects.html`: project gallery with modal details
- `posts.html`: blog post list
- `post.html`: markdown post renderer
- `data.js`: generated metadata bundle used by the site
- `publications/`: JSON sources for conference and journal entries
- `projects/`: JSON sources for project entries
- `posts/`: markdown sources for blog posts with front matter
- `scripts/build-content.js`: content index generator
- `assets/`: placeholder artwork and cover images

## Publishing workflow

1. Upload the repository to a GitHub repository.
2. Enable GitHub Pages from the repository settings.
3. Add a publication JSON file under `publications/conference/` or `publications/journal/`, a project JSON file under `projects/`, or a markdown post under `posts/`.
4. Publications can use an `authors` array like `{ "name": "Soongyu Choi", "highlight": true }` and an `authorsNote` field like `"Co-first author"` to append a note after the full author list.
5. Optionally add an `order` field to publication/project JSON files when you want a fixed display order.
6. Run `npm run build:content` to regenerate `data.js`.
7. Replace placeholder images and profile details as needed.
