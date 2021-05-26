import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function DisplayCards(props) {
    const { id, cardId, front, back, deckId } = props;
    const history = useHistory();


    const removeCard = async (cardId) => {
        await deleteCard(cardId);
        history.go(0)
      };

    // Delete Card Handler
    function deleteCardHandler (cardId) {
        if(window.confirm("Are you sure you want to delete?")) {
            removeCard(cardId);  
        }
    }

    return (
        <div>
            <div className="container" key={id}>
                <div className="row">   
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <p class="card-text">{front}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <p class="card-text">{back}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                    <button className="m-2 btn btn-danger btn-sm float-right" onClick={() => deleteCardHandler(cardId)} refresh="true">Delete</button>
                    <Link to={`/decks/${deckId}/cards/${cardId}/edit`} className="m-2 btn btn-secondary btn-sm float-right">Edit</Link>
                </div>
            </div>
            <div className="row">
            </div> 
        </div> 
    );

}

export default DisplayCards;