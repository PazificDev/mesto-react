import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    
    evt.target.reset();
  } 

  return (
    <PopupWithForm
        name="editPhoto"
        title="Обновить аватар"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="url"
          id="linkPhoto"
          name="link"
          className="popup__input popup__input_edit_pic"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        <span className="linkPhoto-error popup__error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;
