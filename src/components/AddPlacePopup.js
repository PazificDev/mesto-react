import { useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  
  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });

    evt.target.reset();
  }

  return (
    <PopupWithForm
        name="addPic"
        title="Новое место"
        btnText="Создать"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="picture"
          name="name"
          onChange={handleNameChange}
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
          onChange={handleLinkChange}
          className="popup__input popup__input_edit_pic"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="link-error popup__error"></span>
      </PopupWithForm>
  )
}

export default AddPlacePopup