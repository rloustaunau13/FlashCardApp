// Import other necessary components and utilities...
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






export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(undefined);
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);
  const abortController = new AbortController();
  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCard((values) => ({ ...values, [name]: value }));
  };

  const handleRedirect = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the updated card state
    console.log("Updated Card:", card);

    try {
      await updateCard(card, abortController.signal);
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
      <form className="mt-4">
      <h1 className="mb-4">Edit Card</h1>
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
    );
  }

  return <div>HELLO WORLD</div>;
};

export default EditCard;