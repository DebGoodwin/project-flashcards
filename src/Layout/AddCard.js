import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    let { deckId } = useParams();
    const history = useHistory();

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
    
    const cardFrontChange = (e) => {
        e.preventDefault();
        setCard({ ...card, front: e.target.value });
    } 

    const cardBackChange = (e) => {
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
                    <CardForm
                        card={card}
                        cardFrontChange={cardFrontChange}
                        cardBackChange={cardBackChange}
                    />
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