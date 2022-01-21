import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card.name, props.card.link);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.owner === currentUser._id;

  const cardDeleteButtonClassName = `button card__delete-button ${
    isOwn ? " " : "card__delete-button_inactive"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : " "
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card.likes, props.card._id);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
    <div className="card">
      <img
        alt={props.card.name}
        src={props.card.link}
        className="card__image"
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
