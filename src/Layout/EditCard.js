// Import other necessary components and utilities...
import React, { Fragment } from "react"

import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added
import CardForm from "./CardForm";
import { readDeck, updateCard } from "../utils/api";
import { createCard } from "../utils/api";
import { readCard } from "../utils/api";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";

import Form from "./Form";




export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(undefined);
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);
  const abortController = new AbortController();
  

  const history = useHistory();


  const handleSubmit = async (card) => {
    
    
    
    console.log('Card data before update:', card);
    try {
      await updateCard(card, abortController.signal);
      history.push(`/decks/${deckId}`);
      console.log('Card data after update:', card);

    } catch (error) {
      setError(error);
    }
  
  };

  useEffect(() => {
    const fetchData = async () => {


      try {
        const [deckRes, cardRes] = await Promise.all([
          readDeck(deckId, abortController.signal),
          readCard(cardId, abortController.signal),
        ]);

        setDeck(deckRes);
        setCard(cardRes);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [deckId, cardId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (deck) {
    return (
      <div>
      
      <Form onSubmit={handleSubmit}  card={card} deck={deck} />
      </div>
    );
  }

  return <div>HELLO WORLD</div>;
};

export default EditCard;