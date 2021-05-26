import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DisplayDeck( props ) {
    const { id, name, description, numCards } = props;
    const history = useHistory();

    // Delete Deck Handler
    async function deleteDeckHandler(deckId) {
        const toDelete = window.confirm("Are you sure you want to delete?");
        if(toDelete) {
            console.log("Deleting Deck", deckId)
            await deleteDeck(deckId)
            .catch((err) => {
                console.log(err)
            })
            history.go(0);
        }      
    }
    
    return (
        <div className="border m-2"> 
            <div>     
                <h3 className="m-3">{name}</h3> 
            </div>
            <div>
                <p className="float-right m-2"> {`${numCards} cards`}</p>
                <p className="m-3">{description}</p>
            </div>
            <Link to={`/decks/${id}/`} type="button" className="m-3 btn btn-secondary">View</Link>
            <Link to={`/decks/${id}/study`} type="button" className="btn btn-primary">Study</Link>
            <button className="m-3 btn btn-danger float-right" onClick={() => deleteDeckHandler(id)} >Delete</button>
        </div>   
    )

}

export default DisplayDeck;