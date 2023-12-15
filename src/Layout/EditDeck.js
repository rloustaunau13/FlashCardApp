import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Route, useRouteMatch, Switch,Link} from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added

import { readDeck, updateCard } from "../utils/api";
import { createCard } from "../utils/api";
import { updateDeck } from "../utils/api";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
export const EditDeck =( ) => {


    const { deckId } = useParams(); // TODO: This ID will need to be pulled from parameters.
    const { cardId } = useParams(); // TODO: This ID will need to be pulled from parameters.
 console.log("ADD CARD");

 const [deck, setDeck] = useState(undefined);
 
 const abortController = new AbortController(); // Declare AbortController

 let name= '';
 let value='';
 const history  = useHistory();
 const handleChange = (event) => {

  
    name=event.target.name;
    value=event.target.value;
    setDeck(values => ({...values, [name]: value}))
    
  }



  const handleRedirect = () => {

    history.push(`/decks/${deckId}`); //dw added to send user to home page after post is deleted.
  }








  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the updated card state

    
   


//setCard(values => ({...values, ['id']: value1}))
    // Call the API to create the card with the abort signal
    try {
      await updateDeck(deck, abortController.signal);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };


  useEffect(() => {
    const abortController = new AbortController();
  
    const fetchCard = async () => {
      try {
        const res = await readDeck(deckId, abortController.signal);
        

        console.log(res);
        setDeck(res);

       
      } catch (error) {
        //setError(error);
      }
    };
  
    fetchCard();
  
    return () => abortController.abort();
  }, [deckId]);





if(deck){
return(

  <form className="mt-4">
  <h1 className="mb-4">Edit Deck</h1>
  <h3 className="mb-3">{deck.name}</h3>

  <div className="mb-3">
    <label htmlFor="front" className="form-label">
     Name
    </label>
    <textarea
      id="name"
      className="form-control"
      name="name"
      value={deck.name || ""}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="back" className="form-label">
      Description
    </label>
    <textarea
      id="description"
      className="form-control"
      name="description"
      value={deck.description || ""}
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
      );

      
  }
  return (<div>HELLO WORLD</div>)
}

  
  export default EditDeck;








