import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__photocard">
            <img src={currentUser.avatar} alt="Аватар" className="profile__photo" />
            <button
              onClick={props.onEditAvatar}
              className="profile__photo-edit-button"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-and-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                type="button"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
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
            <Card 
              key={item._id} 
              card={item} 
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete}
              />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
