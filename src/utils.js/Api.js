class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponce(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}cards/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponce);
  }

  addCard(data) {
    return fetch(`${this._url}cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponce);
  }

  getUserInfoApi() {
    return fetch(`${this._url}users/me/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponce);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponce);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return api.deleteCardLike(id);
    } else {
      return api.setCardLike(id);
    }
  }

  setCardLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponce);
  }

  deleteCardLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponce);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponce);
  }

  updateAvatar(data) {
    return fetch(`${this._url}users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponce);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-30/",
  headers: {
    authorization: "6c6307bf-f204-483f-a472-5319b4c7128b",
    "Content-Type": "application/json",
  },
});

export default api;
