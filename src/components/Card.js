function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className="elements__item">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="elements__image"
        onClick={handleClick}
      />
      <div className="elements__trash"></div>
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like">
          <button type="button" className="elements__like-button"></button>
          <span className="elements__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
