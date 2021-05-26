import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api/index";

function EditCard() {
    const history = useHistory();
    let { cardId, deckId } = useParams();
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});

    const getDeck = async (deckId) => {
        const response = await readDeck(deckId);
        setDeck(response);
      };

    const getCardData = async (cardId) => {
      const response = await readCard(cardId);
      setCard(response);
    }
    
    // Retrieve the Card Data 
    useEffect(() => {
      getCardData(cardId);
      getDeck(deckId);
    }, [deckId, cardId]);

    const handleFrontChange = (e) => {
        e.preventDefault();
        setCard({ ...card, front: e.target.value });
    } 

    const handleBackChange = (e) => {
        e.preventDefault();
        setCard({ ...card, back: e.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    }

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
      };


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/" >Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>Deck {deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
          
            <h3>Edit Card</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea className="form-control" type="text" id="front" name="front" value={card.front} onChange={handleFrontChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea className="form-control" type="text" id="back" name="back" value={card.back} onChange={handleBackChange}></textarea>
                </div>
                <button className="m-2 btn btn-secondary" type="cancel" onClick={handleDone}>Cancel</button>
                <button  className="m-2 btn btn-primary" type="submit" onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    )

}

export default EditCard;