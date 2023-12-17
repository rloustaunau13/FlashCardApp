import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Route, useRouteMatch, Switch,Link} from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added
import Study from "./Study";
import { deleteDeck } from "../utils/api";
import {DeckLink} from "./DeckLink";
import {Deck} from "./Deck";
import CreateDeck from "./CreateDeck";

export const Decks = ({ decks  } ) => {
    const { path, url } = useRouteMatch(); //dw added
    const [deck, setDeck] = useState(undefined);

     
console.log(decks);




//const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);



return(
       
        <div className="row pt-2">
           
          <div className="col-3">
        
            <ul className="list-group"></ul>
          </div>
          <div className="col-9">
           <Switch>
           <Route path={`/decks/:deckId/study`} exact>
            <Study />
             </Route>

             <Route path={`/decks/:deckId`} exact>
            <Deck/>
             </Route>
             <Route path={`/decks/new`} exact>
            <CreateDeck/>
             </Route>
             
            </Switch>
          </div>
        </div>
      );

  }

  
  export default Decks;