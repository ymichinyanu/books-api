import authForm from './auth-form.js';

const form = document.getElementById('login-form');

authForm(form, false, 'email', 'password');
