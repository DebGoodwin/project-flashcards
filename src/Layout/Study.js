import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NotEnoughCards from "./NotEnoughCards";

function Study() {

  let { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [front, setFront] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const history = useHistory();

  // Retrieve the Flashcards for the specific deck
  const getDeck = async (deckId) => {
    const response = await readDeck(deckId);
    setDeck(response);
    setCards(response.cards);
  };
    
  useEffect(() => {
    getDeck(deckId);
  
  }, [deckId]);

  // Handle the card flip event
  const flipHandler = (event) => {
    setFront(!front);
  };

  // Handle the advance to next card event
  const nextHandler = (event) => {
    if(cardIndex + 1 < cards.length ) {
      setCardIndex(cardIndex + 1);
      setFront(true);
    } else {
      const restart = window.confirm("Do you want to restart?");
      if(restart) {
        setCardIndex(0);
        setFront(true);
      } else {
        history.push("/");
      }
    }
  }

  if(!cards) return <p>Loading...</p>;

  // If there are less than 3 cards in the deck return not enough cards page
  if (cards.length < 3) {
      return <NotEnoughCards deck={deck} deckId={deckId} cards={cards} />;
  }

  return (
    <div className="container">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h4>Study: {deck.name}</h4>
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">Card {cardIndex+1} of {cards.length}</h5>
            <p className="card-text">{front ? cards[cardIndex].front : cards[cardIndex].back} </p>
            <button className="btn btn-secondary" onClick={flipHandler}>Flip</button>  &nbsp;
            {front ? null : <button className="btn btn-primary" onClick={nextHandler}>Next</button>}
            </div>
        </div>  
    </div>
  );
}

export default Study;
