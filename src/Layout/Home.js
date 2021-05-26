import React from "react";
import { Link } from "react-router-dom";
import DisplayDeck from "./DisplayDeck";


function Home({ decks }) {

    const deckComponents = decks.map((item) => {
        return (
           <DisplayDeck 
                key={item.id} 
                id={item.id} 
                name={item.name} 
                description={item.description} 
                numCards={item.cards.length} />
        )
    })
    
  return (
    <div>
        <Link to="/decks/new" className="m-2 btn btn-secondary">+ Create Deck</Link>
        <section>  
            {deckComponents}          
        </section>
    </div>
  );
}
export default Home;
