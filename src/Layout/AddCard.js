import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Route, useRouteMatch, Switch,Link} from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added
import ErrorMessage from "../common/ErrorMessage";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export const AddCard= ( ) => {
  const [error, setError] = useState(undefined);
const { deckId } = useParams(); // TODO: This ID will need to be pulled from parameters.
 console.log("ADD CARD");

 const [deck, setDeck] = useState(undefined);
 const [card,setCard]= useState({});
 const abortController = new AbortController(); // Declare AbortController

 let name= '';
 let value='';
 const history  = useHistory();
 const handleChange = (event) => {

  
    name=event.target.name;
    value=event.target.value;
    setCard(values => ({...values, [name]: value}))
    
  }



  const handleRedirect = () => {

    history.push(`/decks/${deckId}`); //dw added to send user to home page after post is deleted.
  }








  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the updated card state
    console.log("Updated Card:", card);
    

    try {
      await createCard(deckId, card, abortController.signal);
      history.push(`/decks/${deckId}`); //dw added to send user to home page after post is deleted.
    } catch (error) {
      return <ErrorMessage error={error} />;
    }
  };





 useEffect(() => {
  
    const fetchCard = async () => {
      try {
        const res = await readDeck(deckId, abortController.signal);
        setDeck(res);

       
      } catch (error) {
        return <ErrorMessage error={error} />;
      }
    };
  
    fetchCard();
  
    return () => abortController.abort();
  }, [deckId]);


     
console.log(deck);

if(deck){
  return(
  <form className="mt-4">
  <h1 className="mb-4">Add Card</h1>
  <h3 className="mb-3">{deck.name}</h3>

  <div className="mb-3">
    <label htmlFor="front" className="form-label">
      Front
    </label>
    <textarea
      id="front"
      className="form-control"
      name="front"
      value={card.front || ""}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="back" className="form-label">
      Back
    </label>
    <textarea
      id="back"
      className="form-control"
      name="back"
      value={card.back || ""}
      onChange={handleChange}
    />
  </div>

  <button
    type="button"
    className="btn btn-primary me-2"
    onClick={handleSubmit}
  >
    Save
  </button>
  <button
    type="button"
    className="btn btn-secondary"
    onClick={handleRedirect}
  >
    Done
  </button>
</form>
  )
      
  }
  return (<div>HELLO WORLD</div>)
}

  
  export default AddCard;



 