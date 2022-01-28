import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile_edit"
      title="Редактировать профиль"
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
          id="name-input"
          className="popup__input popup__input_type_name"
          minLength="2"
          maxLength="40"
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          required
          type="text"
          name="about"
          value={description || ''}
          onChange={handleDescriptionChange}
          id="description-input"
          className="popup__input popup__input_type_description"
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error description-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
