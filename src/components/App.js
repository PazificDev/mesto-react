import {useEffect, useState} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({}) 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
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

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      alert(err);
    });
}

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter(item =>  item._id !== card._id ))
    })
    .catch((err) => {
      alert(err);
    }) 
  }

  function handleUpdateUser(dataSet) {
    setIsLoading(true);
    api.patchUserInfo(dataSet)
    .then((data) => {
      setCurrentUser(data)
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setIsLoading(false);
    }) 
  }

  function handleUpdateAvatar(dataSet) {
    setIsLoading(true);
    api.patchUserPhoto(dataSet)
    .then((data) => {
      setCurrentUser(data)
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      alert(err);
    }) 
    .finally(() => {
      setIsLoading(false);
    }) 
  }

  function handleAddPlaceSubmit(dataSet) {
    setIsLoading(true);
    api.postNewCard(dataSet)
    .then((data) => {
      setCards([data, ...cards]); 
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setIsLoading(false);
    })  
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        cards={cards}
        onCardClick={handleOpenPicture}
      />

      <Footer />

      <EditProfilePopup 
        isLoading={isLoading}
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} 
      />

      <AddPlacePopup
        isLoading={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />  

      <EditAvatarPopup 
         isLoading={isLoading}
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm name="deleteCard" title="Вы уверены?" btnText="Да" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </CurrentUserContext.Provider>
  );
}

export default App;
