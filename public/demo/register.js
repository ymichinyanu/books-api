import authForm from './auth-form.js';

const form = document.getElementById('register-form');

authForm(form, true, 'email', 'password', 'username');
