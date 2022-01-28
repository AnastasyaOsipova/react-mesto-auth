import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils.js/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils.js/auth";

function App(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState({});

  const [userEmail, setUserEmail] = React.useState("");

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState(false);

  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err)
      });
      handleTokenCheck()
  }, []);

  const [cards, setCards] = React.useState([]);

  function handleCardLike(likes, _id) {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === _id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(_id) {
    api
      .deleteCard(_id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== _id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
    handleTokenCheck();
  }

  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            props.history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function changeInfoTooltipstatus(value) {
    setInfoTooltipStatus(value);
  }

  function openInfoTooltip() {
    setisInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setInfoTooltipStatus(true);
    setisInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    function closePopupByEsc(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    window.addEventListener("keydown", closePopupByEsc);
    return () => window.removeEventListener("keydown", closePopupByEsc);
  });

  function handleCardClick(name, link) {
    setSelectedCard({ name: name, link: link });
  }

  function handleUpdateUser(name, about) {
    api
      .updateUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(name, link) {
    api
      .addCard(name, link)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          id={2}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          id={3}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          id={4}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          onClose={closeAllPopups}
          id={5}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          status={infoTooltipStatus}
          onClose={closeAllPopups}
        />

        <Header email={userEmail} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleEditPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path="/signup">
            <Register
              changeInfoTooltipstatus={changeInfoTooltipstatus}
              openInfoTooltip={openInfoTooltip}
            />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Footer />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
