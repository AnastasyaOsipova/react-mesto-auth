import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils.js/auth";
import InfoTooltip from "./InfoTooltip";

function Register(props) {
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
    auth
      .register(values.email, values.password)
      .then((res) => {
        if (res.data.email) {
          props.changeInfoTooltipstatus(true);
        }
      })
      .catch(() => {
        props.changeInfoTooltipstatus(false);
      })
      .finally(() => {
        props.openInfoTooltip();
      });
  }

  return (
    <div>
      <div className="login">
        <form
          noValidate
          id="4"
          className="login__form"
          name="login__form"
          onSubmit={handleSubmit}
        >
          <h2 className="login__title">Регистрация</h2>
          <input
            required
            type="email"
            name="email"
            value={values.email}
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
            value={values.password}
            onChange={handleChange}
            placeholder="Пароль"
            id="email-input"
            className="login__input login__input_type_description"
            minLength="10"
            maxLength="200"
          />
          <button type="submit" className="login__submit-button button">
            Зарегистрироваться
          </button>
          <Link to="/signin" className="login__link link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Register);
