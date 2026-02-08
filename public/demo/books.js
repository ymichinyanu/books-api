import { Books, Authors, Genres, Users } from './api.js';

const bookCardTemplate = document.getElementById('book-card-template');

let isAdmin;
let user;

async function initCreateBookSection() {
  const createBookSection = document.getElementById('create-book-section');
  const createBookTitle = document.getElementById('create-book-title');
  const createBookAuthors = document.getElementById('create-book-authors');
  const createBookGenres = document.getElementById('create-book-genres');
  const createBookForm = document.getElementById('create-book-form');

  createBookSection.style.display = 'block';

  const authorsRes = await Authors.GetAll();
  const authors = await authorsRes.json();

  for (const author of authors) {
    const option = document.createElement('option');
    option.value = author.id.toString();
    option.textContent = author.name;

    createBookAuthors.append(option);
  }

  const genresRes = await Genres.GetAll();
  const genres = await genresRes.json();

  for (const genre of genres) {
    const option = document.createElement('option');
    option.value = genre.id.toString();
    option.textContent = genre.name;

    createBookGenres.append(option);
  }

  createBookForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const title = createBookTitle.value;

    const selectedAuthors = Array.from(createBookAuthors.selectedOptions);
    const authors = selectedAuthors.map((option) => Number(option.value));

    const selectedGenres = Array.from(createBookGenres.selectedOptions);
    const genres = selectedGenres.map((option) => Number(option.value));

    await Books.Create(title, authors, genres);

    window.location.reload(true);
  });
}

async function initUser() {
  if (user !== undefined) return;

  const userRes = await Users.Me();

  if (userRes.status !== 200) return;

  user = await userRes.json();

  isAdmin = user.roles.find((role) => role === 'Admin') ? true : false;

  if (isAdmin) {
    initCreateBookSection();
  }
}

initUser();

async function createBookCard(title, authors, genres, id) {
  const clone = bookCardTemplate.content.cloneNode(true);

  await initUser();

  clone.querySelector('.book-card-title').textContent = title;
  clone.querySelector('.book-card-authors').textContent = authors.join(', ');
  clone.querySelector('.book-card-genres').textContent = genres.join(', ');

  const favoriteBtn = clone.querySelector('.book-card-favorite');

  let isFavorited = false;

  if (user) {
    favoriteBtn.style.display = 'inline-block';
  }

  if (user && user.favoriteBooks.find((bookId) => bookId === id)) {
    isFavorited = true;
    favoriteBtn.textContent = 'Remove from favorites';
  }

  favoriteBtn.addEventListener('click', async () => {
    if (isFavorited) {
      const response = await Books.RemoveFromFavorites(id);

      if (response.status !== 200) return;

      isFavorited = false;
      favoriteBtn.textContent = 'Add to favorites';
    } else {
      const response = await Books.AddToFavorites(id);

      if (response.status !== 200) return;

      isFavorited = true;
      favoriteBtn.textContent = 'Remove from favorites';
    }
  });

  if (isAdmin) {
    const deleteBtn = clone.querySelector('.book-card-delete');

    deleteBtn.style.display = 'inline-block';

    deleteBtn.addEventListener('click', async () => {
      await Books.Delete(id);
      window.location.reload(true);
    });
  }

  document.body.append(clone);
}

Books.GetAllIds().then(async (response) => {
  if (response.status !== 200)
    alert('An error occured while getting all the book ids');

  const ids = await response.json();

  for (const id of ids) {
    const book = await (await Books.GetById(id)).json();

    const title = book.title;
    const authors = [];
    const genres = [];

    for (const authorId of book.authors) {
      const authorRes = await Authors.GetById(authorId);
      const author = await authorRes.json();

      authors.push(author.name);
    }

    for (const genreId of book.genres) {
      const genreRes = await Genres.GetById(genreId);
      const genre = await genreRes.json();

      genres.push(genre.name);
    }

    createBookCard(title, authors, genres, book.id);
  }
});
