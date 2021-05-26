import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function AddCard() {
    const history = useHistory();
    let { deckId } = useParams();

    const initialState = {
        front:"",
        back:"",
        deckId
    }
    
    const [card, setCard] = useState(initialState);
    const [deck, setDeck] = useState({});

    const getDeck = async (deckId) => {
        const response = await readDeck(deckId);
        setDeck(response);
      };

    // Retrieve the Deck Data 
    useEffect(() => {
        getDeck(deckId);
      }, [deckId]);
    
    const cardFrontHandleChange = (e) => {
        e.preventDefault();
        setCard({ ...card, front: e.target.value });
    } 

    const cardBackHandleChange = (e) => {
        e.preventDefault();
        setCard({ ...card, back: e.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await createCard(deckId, card);
        setCard(initialState); 
    }

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
      };

    if(deck) {
        return(
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/" >Home</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
            
                <h3>{deck.name}: Add Card</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="front">Front</label>
                        <textarea className="form-control" type="text" id="front" name="front" value={card.front} placeholder="Front side of card" onChange={cardFrontHandleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="back">Back</label>
                        <textarea className="form-control" type="text" id="back" name="back" value={card.back} placeholder="Back side of card" onChange={cardBackHandleChange}></textarea>
                    </div>
                    <button className="m-2 btn btn-secondary" type="cancel" onClick={handleDone}>Done</button>
                    <button  className="m-2 btn btn-primary" type="submit" onClick={handleSubmit} >Save</button>
                </form>
            </div>
        )
    } else {
        return "Loading...";
    }

}

export default AddCard;