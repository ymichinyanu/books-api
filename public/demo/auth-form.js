import { Auth } from './api.js';

export default (form, register, emailId, passwordId, usernameId) => {
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const apiMethod = register ? Auth.Register : Auth.Login;
    const expectedStatus = register ? 201 : 200;

    const email = document.getElementById(emailId).value;
    const username = register
      ? document.getElementById(usernameId).value
      : undefined;
    const password = document.getElementById(passwordId).value;

    try {
      const response = await apiMethod({ email, username, password });

      const responseJson = await response.json();

      switch (response.status) {
        case expectedStatus:
          document.cookie = 'access_token=' + responseJson.accessToken;

          window.location.href = './';
          break;
        case 400:
          alert(
            'Error: ' +
              (Array.isArray(responseJson.message)
                ? responseJson.message[0]
                : responseJson.message),
          );
          break;
        default:
          alert(response.json.message ?? 'Unknown error');
      }
    } catch (err) {
      alert('Error: ' + err);
    }
  });
};
