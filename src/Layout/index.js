import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";

import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import Deck from "./DeckDetails";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import { listDecks } from "../utils/api/index";


function Layout() {
  const [decks, setDecks] = useState([]);
  
  const getDecks = async () => {
    try
    {
    const response = await listDecks();
    setDecks(response);
    }
    catch(error){}
  }

  // Retrieve the Flashcard Decks
  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home  
              decks={decks}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck/>
          </Route>       
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default Layout;
