import React from "react";

function Login() {
  return (
    <div className="login">
      <form
        noValidate
        id="3"
        className="login__form"
        name="login__form"
        //onSubmit={props.onSubmit}
      >
        <h2 className="login__title">Вход</h2>
        <input
          required
          type="email"
          name="email"
          //value={name}
          //onChange={handleNameChange}
          placeholder="Email"
          id="email-input"
          className="login__input login__input_type_email"
          maxLength="40"
        />
        <input
          required
          type="password"
          name="email"
          //value={description}
          //onChange={handleDescriptionChange}
          placeholder="Пароль"
          id="email-input"
          className="login__input login__input_type_description"
          minLength="10"
          maxLength="200"
        />
        <button type="submit" className="login__submit-button button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
