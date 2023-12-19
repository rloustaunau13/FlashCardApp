import React, { Fragment } from "react"
import Form from "./Form";
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











  const handleSubmit = async (card) => {
    

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
    <div>
    <h1>Add Card</h1>
    <Form onSubmit={handleSubmit}  card={card} deck={deck} />
  </div>
  )
      
  }
  return (<div></div>)
}

  
  export default AddCard;



 