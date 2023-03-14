function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_openPicture ${
        props.card ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_picture">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title popup__title_type_picture">
          {props.card.name}
        </h2>
      </div>
    </section>
  );
}

export default ImagePopup;
