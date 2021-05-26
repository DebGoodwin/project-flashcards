import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import DisplayCards from "./DisplayCards";

function Deck() {

  let { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards]= useState([]);
  const history = useHistory();

  const getDeck = async (deckId) => {
    const response = await readDeck(deckId);
    setDeck(response);
    setCards(response.cards);
  };

  // Retrieve the Flashcard Decks
  useEffect(() => {
    getDeck(deckId);
  }, [deckId]);


  // Delete Deck Handler
  async function deleteDeckHandler(deckId) {
    const toDelete = window.confirm("Are you sure you want to delete?");
    
    if(toDelete) {   
      await deleteDeck(deckId)
      .catch((err) => {
        console.log(err)  
      })
    history.push("/");
    }
  } 
    
  // Display the cards
  const cardComponents = cards.map((item) => {
    return (
      <DisplayCards
          key={item.id}
          cardId={item.id}
          front={item.front}
          back={item.back}
          deckId={deck.id}
      />
    )
  })

  return (
    <div className="Deck">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" refresh="true">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
            </ol>
        </nav>
        <section >
            <h2>{deck.name} </h2>
            <p>{deck.description}</p>
            
            <Link to={`/decks/${deckId}/edit`} className="m-2 btn btn-secondary">Edit</Link>
            <Link to={`/decks/${deckId}/study`} className="m-2 btn btn-primary">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="m-2 btn btn-primary">+ Add Cards</Link>
            <button type="button" className="m-2 btn btn-danger float-right" onClick={() => deleteDeckHandler(deckId)}>Delete</button>
        </section>
        <br />
        <h3>Cards</h3>
        {cardComponents}
    </div>
  );
}

export default Deck;
