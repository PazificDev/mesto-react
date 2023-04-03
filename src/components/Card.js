import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `elements__like-button ${isLiked && 'elements__like-button_active'}` 
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="elements__item">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="elements__image"
        onClick={handleClick}
      />
      {isOwn && <div className="elements__trash" onClick={handleDeleteClick} />}
      {/* <div className="elements__trash"></div> */}
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
          <span className="elements__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
