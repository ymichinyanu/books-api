import { Users } from './api.js';

const email = document.getElementById('email');
const username = document.getElementById('username');
const roles = document.getElementById('roles');
const logout = document.getElementById('logout');

Users.Me().then(async (response) => {
  if (response.status === 401) window.location.href = './login.html';

  const body = await response.json();

  email.textContent = body.email;
  username.textContent = body.name;
  roles.textContent = body.roles.join(', ');
});

logout.addEventListener('click', async () => {
  document.cookie = 'access_token=';
  window.location.href = './';
});
