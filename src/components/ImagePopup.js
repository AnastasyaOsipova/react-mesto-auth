import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_image">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button button"
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
