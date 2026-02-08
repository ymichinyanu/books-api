import { Books, Authors, Genres, Users } from './api.js';

const bookCardTemplate = document.getElementById('book-card-template');

let user;

async function initUser() {
  if (user !== undefined) return;

  const userRes = await Users.Me();

  const body = await userRes.json();

  switch (userRes.status) {
    case 200:
      break;
    case 401:
      window.location.href = './login.html';
      break;
    default:
      throw new Error(userRes.status + ': ' + body.message);
  }

  user = body;

  return [body, userRes];
}

async function createBookCard(title, authors, genres, id) {
  const clone = bookCardTemplate.content.cloneNode(true);
  const card = clone.firstElementChild;

  card.querySelector('.book-card-title').textContent = title;
  card.querySelector('.book-card-authors').textContent = authors.join(', ');
  card.querySelector('.book-card-genres').textContent = genres.join(', ');

  const removeBtn = card.querySelector('.book-card-remove');

  document.body.append(card);

  removeBtn.addEventListener('click', async () => {
    const response = await Books.RemoveFromFavorites(id);

    if (response.status === 200) {
      card.remove();
    }
  });
}

initUser()
  .then(async ([body, userRes]) => {
    if (userRes.status !== 200) return;

    const ids = body.favoriteBooks;

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
  })
  .catch((err) => {
    alert(err);
  });
