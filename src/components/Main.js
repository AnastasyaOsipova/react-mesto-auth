import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils.js/Api";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div
            onClick={props.onEditAvatar}
            className="profile__avatar-edit-icon"
          >
            <img
              src={currentUser.avatar}
              alt="Фото"
              className="profile__avatar"
            />
          </div>
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            onClick={props.onEditProfile}
            type="button"
            className="profile__edit-button button"
          ></button>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button button"
        ></button>
      </section>
      <section className="photo-grid">
        {props.cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            owner={item.owner._id}
            onCardClick={props.handleClick}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
