import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {

  const history = useHistory();
  const [deck, setDeck] = useState({
      name: "",
      description: "",
  });

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
    const response = await createDeck(deck);
    history.push(`/decks/${response.id}`);
}

const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/" >Home</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
        <h3>Create Deck</h3>
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" id="name" name="name" value={deck.name} placeholder="Deck Name" onChange={handleNameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <textarea className="form-control" type="text" id="desc" name="desc" value={deck.description} placeholder="Brief description of the deck" onChange={handleDescChange}></textarea>
            </div>
            <button className="m-2 btn btn-secondary" type="cancel" onClick={handleCancel}>Cancel</button>
            <button  className="m-2 btn btn-primary" type="submit" onClick={handleSubmit} >Submit</button>
        </form>
    </div>
  );
}

export default CreateDeck;
