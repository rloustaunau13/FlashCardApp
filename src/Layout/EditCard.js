import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Route, useRouteMatch, Switch,Link} from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added

import { readDeck, updateCard } from "../utils/api";
import { createCard } from "../utils/api";
import { readCard } from "../utils/api";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
export const EditCard= ( ) => {
    const { deckId } = useParams(); // TODO: This ID will need to be pulled from parameters.
    const { cardId } = useParams(); // TODO: This ID will need to be pulled from parameters.
 console.log("ADD CARD");

 const [deck, setDeck] = useState(undefined);
 const [card,setCard]= useState({});
 const [error, setError] = useState(undefined);
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
    
   


//setCard(values => ({...values, ['id']: value1}))
    // Call the API to create the card with the abort signal
    try {
      await updateCard(card, abortController.signal);
    } catch (error) {
      setError(error);
    }
  };


  useEffect(() => {
    const abortController = new AbortController();
  
    const fetchCard = async () => {
      try {
        const res = await readCard(cardId, abortController.signal);
        

        console.log(res);
        setCard(res);

       
      } catch (error) {
        setError(error);
      }
    };
  
    fetchCard();
  
    return () => abortController.abort();
  }, [deckId]);



 useEffect(() => {
    const abortController = new AbortController();
  
    const fetchCard = async () => {
      try {
        const res = await readDeck(deckId, abortController.signal);
        

        console.log(res);
        setDeck(res);

       
      } catch (error) {
        setError(error);
      }
    };
  
    fetchCard();
  
    return () => abortController.abort();
  }, [deckId]);




  if (error) {
    return <ErrorMessage error={error}/>
  }


if(deck){
return(

  <form>
  <div className="mb-3">
    <label htmlFor="front" className="form-label">Front</label>
    <input
      type="text"
      id="front"
      name="front"
      placeholder={card.front}
      value={card.front || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  <div className="mb-3">
    <label htmlFor="back" className="form-label">Back</label>
    <input
      type="text"
      id="back"
      name="back"
      value={card.back || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
    Save
  </button>

  <button type="button" className="btn btn-secondary ms-2" onClick={handleRedirect}>
    Done
  </button>
</form>
      );

      
  }
  return (<div>HELLO WORLD</div>)
}

  
  export default EditCard;










 