import React from "react";
import { Link, NavLink } from "react-router-dom";

function NotEnoughCards({ deck, deckId, cards }) {
  return (
    <div className="container">
        <nav className="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" key="0"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item" key="1"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page" key="2">Study</li>
            </ol>
        </nav>
      <div>
        <h3> Study: {deck.name}</h3>
        <p>
          Not Enough Cards! You need at least 3 cards to study. There are only {cards.length} cards in this deck.
        </p>
      </div>
      <Link to={`/decks/${deck.id}/cards/new`} type="button" className="m-2 btn btn-primary">Add Cards</Link>
    </div>
  );
}

export default NotEnoughCards;

