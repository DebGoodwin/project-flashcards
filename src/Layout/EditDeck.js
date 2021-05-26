import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";


function EditDeck() {
    const history = useHistory();
    let { deckId } = useParams();
    const [deck, setDeck] = useState({});
  
    const getDeckData = async (deckId) => {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    
    // Retrieve the Card Data 
    useEffect(() => {
      getDeckData(deckId);
    }, [deckId]);

    const handleNameChange = (e) => {
        e.preventDefault();
        setDeck({ ...deck, name: e.target.value });
    } 

    const handleDescChange = (e) => {
        e.preventDefault();
        setDeck({ ...deck, description: e.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await updateDeck(deck);
        history.push("/");
    }

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
      };


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/" >Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck {deckId}</li>
                </ol>
            </nav>
          
            <h3>Edit Deck</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" id="name" name="name" value={deck.name} onChange={handleNameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <textarea className="form-control" type="text" id="desc" name="desc" value={deck.description} onChange={handleDescChange}></textarea>
                </div>
                <button className="m-2 btn btn-secondary" type="cancel" onClick={handleDone}>Cancel</button>
                <button  className="m-2 btn btn-primary" type="submit" onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    )

}

export default EditDeck;