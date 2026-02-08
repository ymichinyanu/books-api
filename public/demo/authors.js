import { Authors } from './api.js';

const authorsList = document.getElementById('authors-list');

async function initCreateSection() {
  const section = document.getElementById('create-author-section');
  const form = document.getElementById('create-author-form');
  const name = document.getElementById('create-author-name');

  section.style.display = 'block';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    await Authors.Create(name.value);

    window.location.reload(true);
  });
}

async function createAuthorCard(name) {
  const listItem = document.createElement('li');

  listItem.textContent = name;

  authorsList.append(listItem);
}

initCreateSection();

Authors.GetAll().then(async (response) => {
  if (response.status !== 200) return;

  const authorsArr = await response.json();

  for (const author of authorsArr) {
    createAuthorCard(author.name);
  }
});
