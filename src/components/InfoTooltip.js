import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup popup_type_register ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button button"
        ></button>
        {props.status === true ? (
          <div className="popup__register-container">
            <div className="popup__register-complete-icon"></div>
            <p className="popup__text">Вы успешно зарегистрировались!</p>
          </div>
        ) : (
          <div className="popup__register-container">
            <div className="popup__register-failed-icon"></div>
            <p className="popup__text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
