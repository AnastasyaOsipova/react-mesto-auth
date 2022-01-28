import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils.js/auth";

function Login(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          setValues({
            username: "",
            password: "",
          });
          localStorage.setItem("token", res.token);
          props.handleLogin();
          props.history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <form
        noValidate
        id="3"
        className="login__form"
        name="login__form"
        onSubmit={handleSubmit}
      >
        <h2 className="login__title">Вход</h2>
        <input
          required
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Email"
          id="email-input"
          className="login__input login__input_type_email"
          maxLength="40"
        />
        <input
          required
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
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

export default withRouter(Login);
