import Card from "./Card";

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__photocard">
            <img src={props.avatar} alt="Аватар" className="profile__photo" />
            <button
              onClick={props.onEditAvatar}
              className="profile__photo-edit-button"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-and-edit">
              <h1 className="profile__name">{props.name}</h1>
              <button
                onClick={props.onEditProfile}
                type="button"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__job">{props.description}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((item) => {
          return (
            <Card key={item._id} card={item} onCardClick={props.onCardClick} />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
