import { Genres } from './api.js';

const genresList = document.getElementById('genres-list');

async function initCreateSection() {
  const section = document.getElementById('create-genre-section');
  const form = document.getElementById('create-genre-form');
  const name = document.getElementById('create-genre-name');

  section.style.display = 'block';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    await Genres.Create(name.value);

    window.location.reload(true);
  });
}

async function createGenreCard(name) {
  const listItem = document.createElement('li');

  listItem.textContent = name;

  genresList.append(listItem);
}

initCreateSection();

Genres.GetAll().then(async (response) => {
  if (response.status !== 200) return;

  const genresArr = await response.json();

  for (const genre of genresArr) {
    createGenreCard(genre.name);
  }
});
