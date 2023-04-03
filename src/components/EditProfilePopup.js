import { useState, useContext, useEffect } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
        name="editInfo"
        title="Редактировать профиль"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="name"
          name="name"
          value={name || ''} 
          onChange={handleNameChange}
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
          value={description || ''}
          onChange={handleDescriptionChange}
          className="popup__input popup__input_edit_about"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="about-error popup__error"></span>
      </PopupWithForm>
  )
}

export default EditProfilePopup