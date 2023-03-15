import {useEffect, useState} from 'react';
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleOpenPicture(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <>
      <Header />

      <Main
        avatar={userAvatar}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        name={userName}
        description={userDescription}
        cards={cards}
        onCardClick={handleOpenPicture}
      />

      <Footer />

      <PopupWithForm
        name="editInfo"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="name"
          name="name"
          className="popup__input popup__input_edit_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="name-error popup__error"></span>
        <input
          type="text"
          id="about"
          name="about"
          className="popup__input popup__input_edit_about"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="about-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="addPic"
        title="Новое место"
        btnText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="picture"
          name="name"
          className="popup__input popup__input_edit_title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="picture-error popup__error"></span>
        <input
          type="url"
          id="link"
          name="link"
          className="popup__input popup__input_edit_pic"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="link-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="editPhoto"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          id="linkPhoto"
          name="link"
          className="popup__input popup__input_edit_pic"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="linkPhoto-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="deleteCard" title="Вы уверены?" btnText="Да" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </>
  );
}

export default App;
