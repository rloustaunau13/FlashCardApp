
import React, { Fragment } from "react"
import { Route, useRouteMatch, Switch,Link } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { useParams } from "react-router-dom" //dw added
import Cards from "./Cards";

import { readDeck } from "../utils/api";
import { useState,useEffect } from "react";

import { useParams } from "react-router-dom";



import ErrorMessage from "../common/ErrorMessage";
import AddCard from "./AddCard.js";


export const Study = () => {
    const [cards, setCard] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [deck, setDeck] = useState(undefined);
    const [count, setCount] = useState(1);

  

   
    const { deckId } = useParams(); // TODO: This ID will need to be pulled from parameters.



  

    useEffect(() => {
        const abortController = new AbortController();
      
        const fetchCard = async () => {
          try {
            const res = await readDeck(deckId, abortController.signal);
            

            console.log(res);
            setCard(res);

           
          } catch (error) {
            setError(error);
          }
        };
      
        fetchCard();
      
        return () => abortController.abort();
      }, [count]);
    

      useEffect(() => {
        const abortController = new AbortController();
      
        const fetchDeck = async () => {
          try {
            const res = await readDeck(deckId, abortController.signal);
            

            console.log(res);
            setDeck(res);

           
          } catch (error) {
            setError(error);
          }
        };
      
        fetchDeck();
      
        return () => abortController.abort();
      }, []);
    
      if (error) {
        return <ErrorMessage error={error}/>
      }

if(cards && cards.cards.length>2 &&  deck){



return (
  <div>

  

    <article className="deck-container border p-4 h-100 d-flex flex-colum">
   
      <div className="deck-side border p-4 h-100 d-flex flex-column">
      
       
       
        {cards.name}
         <Cards cards={cards.cards}  />
        
      </div>
    </article>
    </div>
  );
}

if(deck){
return(
  
    <div>
        <h3>{deck.name}</h3>
        <h4>Not enough cards.</h4>
     <div>You need more than 2 cards to study.There are {cards.cards.length} in this deck</div>
     <Link to={`/decks/${deckId}/cards/new`} exact>Add Cards</Link>
     
     </div>
  );
}

return <div></div>
}

export default Study;