import React, { useEffect, useState } from "react";
import DeckLink from "./DeckLink";
import { Route, useRouteMatch, Switch,Link} from "react-router-dom"
import { listDecks } from "../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import {Deck} from "./Deck";
import { deleteDeck } from "../utils/api";

import {useHistory } from "react-router-dom"; //dw added
export const Home = () => {
  const [cardDecks, setCardDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const { path, url } = useRouteMatch(); //dw added
  const [deck, setDeck] = useState(undefined);
  const abortController = new AbortController();


  const history  = useHistory();
  useEffect(() => {
    

    listDecks(abortController.signal).then(setCardDecks).catch(setError);

    return () => abortController.abort();
  }, []);



  const trash = async (deck) => {


 
   const confirmDelete = window.confirm("Are you sure you want to delete this deck?");

   if (!confirmDelete) {
     return; // User canceled the deletion
   }

    try {
      await deleteDeck(deck.id, abortController.signal);

      listDecks(undefined).then(setCardDecks).catch(setError);
      
    } catch (error) {
      return <ErrorMessage error={error}/>
    } finally {
      abortController.abort(); // Ensure proper cleanup
    }
  };



  if (error) {
    return <ErrorMessage error={error}/>
  }




  console.log(`${url}/decks/new`);


  const list = cardDecks.map((deck) => (
    <div key={deck.id} className="col-md-4 mb-4">
      <Deck deck={deck} trash={trash} />
    </div>
  ));




    return (
<main className="container">
  <div>
    <Link to="/decks/new" className="btn btn-secondary">
      Create Deck
    </Link>
    <section className="row">{list}</section>
    </div>
    </main>
    );
  
};

export default Home;