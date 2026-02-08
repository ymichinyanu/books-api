import getCookie from './getCookie.js';

const BASE_URL = 'http://localhost:3000/';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

function apiUrl(endpoint) {
  return BASE_URL + endpoint;
}

function authorization() {
  return {
    Authorization: 'Bearer ' + getCookie('access_token'),
  };
}

export class Users {
  static async Me() {
    return await fetch(apiUrl('users/me'), {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
    });
  }
}

export class Auth {
  static async Register(body) {
    return await fetch(apiUrl('auth/register'), {
      method: 'POST',
      headers: { ...DEFAULT_HEADERS },
      body: JSON.stringify(body),
    });
  }

  static async Login(body) {
    return await fetch(apiUrl('auth/login'), {
      method: 'POST',
      headers: { ...DEFAULT_HEADERS },
      body: JSON.stringify(body),
    });
  }
}

export class Books {
  static async GetAllIds() {
    return await fetch(apiUrl('books'), {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
      },
    });
  }

  static async GetById(id) {
    return await fetch(apiUrl('books/by-id/' + id), {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
      },
    });
  }

  static async Create(title, authors, genres) {
    return await fetch(apiUrl('books/create'), {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
      body: JSON.stringify({ title, authors, genres }),
    });
  }

  static async Delete(id) {
    return await fetch(apiUrl('books/' + id), {
      method: 'DELETE',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
    });
  }

  static async AddToFavorites(id) {
    return await fetch(apiUrl('books/favorite/' + id), {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
    });
  }

  static async RemoveFromFavorites(id) {
    return await fetch(apiUrl('books/favorite/' + id), {
      method: 'DELETE',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
    });
  }
}

export class Authors {
  static async GetById(id) {
    return await fetch(apiUrl('authors/' + id), {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
      },
    });
  }

  static async GetAll() {
    return await fetch(apiUrl('authors'), {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
    });
  }

  static async Create(name) {
    return await fetch(apiUrl('authors/create'), {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
      body: JSON.stringify({ name }),
    });
  }
}

export class Genres {
  static async GetById(id) {
    return await fetch(apiUrl('genres/' + id), {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
      },
    });
  }

  static async GetAll() {
    return await fetch(apiUrl('genres'), {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
    });
  }

  static async Create(name) {
    return await fetch(apiUrl('genres/create'), {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
        ...authorization(),
      },
      body: JSON.stringify({ name }),
    });
  }
}
