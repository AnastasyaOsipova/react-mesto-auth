import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Switch, withRouter } from "react-router-dom";

function Header(props) {
  function signOut() {
    localStorage.removeItem("token");
    props.history.push("/signin");
  }

  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <Switch>
        <Route path="/signin">
          <Link to="signup" className="header__link link">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link to="signin" className="header__link link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__email-container">
            <h2 className="header__email header__link">{props.email}</h2>
            <button
              className="header__sign-out-button button"
              onClick={signOut}
            >
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default withRouter(Header);
