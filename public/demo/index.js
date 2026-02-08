import { Users } from './api.js';

const welcomeMessage = document.getElementById('welcome-message');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const accountLink = document.getElementById('account-link');
const myFavoritesLink = document.getElementById('my-favorites-link');
const authorsLink = document.getElementById('authors-link');
const genresLink = document.getElementById('genres-link');

function showLink(link) {
  link.style.display = 'inline';
}

function hideLink(link) {
  link.style.display = 'none';
}

Users.Me().then(async (response) => {
  if (response.status !== 200) return;

  const user = await response.json();

  welcomeMessage.textContent = 'Welcome, ' + user.name;

  hideLink(registerLink);
  hideLink(loginLink);
  showLink(accountLink);
  showLink(myFavoritesLink);

  if (user.roles.find((role) => role === 'Admin')) {
    showLink(authorsLink);
    showLink(genresLink);
  }
});
