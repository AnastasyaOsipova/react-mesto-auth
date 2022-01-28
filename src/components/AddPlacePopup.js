import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          required
          type="text"
          name="name"
          value={name || ''}
          onChange={handleNameChange}
          placeholder="Название"
          id="place-input"
          className="popup__input popup__input_type_place"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error place-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          required
          type="url"
          name="link"
          value={link || ''}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          id="image-input"
          className="popup__input popup__input_type_image"
        />
        <span className="popup__input-error image-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
