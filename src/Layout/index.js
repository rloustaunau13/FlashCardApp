import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, useRouteMatch, Switch } from "react-router-dom"
import AddCard from "./AddCard";
import Home from "./Home";
import VDeck from "./VDeck";
import EditDeck from "./EditDeck";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import EditCard from "./EditCard";
function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}


        <Switch>
        <Route  path="/" exact>
          <Home />
        </Route>

        <Route path="/decks/new" exact>
          <CreateDeck />
        </Route>


        <Route path="/decks/:deckId" exact>
          <VDeck />
        </Route>


        <Route path="/decks/:deckId/edit" exact>
          <EditDeck />
        </Route>


        <Route path="/decks/:deckId/study" exact>
          <Study />
        </Route>
 
        <Route path="/decks/:deckId/cards/new" exact>
          <AddCard />
        </Route>

       
          <Route path="/decks/:deckId/cards/:cardId/edit" exact>
          <EditCard />
        </Route>
        <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
   </div>
  );
}

export default Layout;
