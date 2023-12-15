import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import { deleteDeck } from "../utils/api";
import {useHistory } from "react-router-dom"; //dw added
export const Deck = ({ deck,trash }) => {
    const abortController = new AbortController(); // Declare AbortController

    const history  = useHistory();
   
    const [decks, setDeck] = useState(deck);

    const handleTrash = async (event) => {

        event.preventDefault();
        trash(decks);
  
    };




  if(deck){
    return (
      <div className="card my-3">
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
  
          {/* Display the number of cards in the deck */}
          <div className="card-count">
            <p>
              {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
            </p>
          </div>
  
          {/* Links and button with Bootstrap styling */}
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/decks/${deck.id}`} className="btn btn-primary">
              View
            </Link>
  
            <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary">
              Study
            </Link>
  
            
            <button onClick={trash} className="btn btn-danger">
          Trash
        </button>
          </div>
        </div>
      </div>
    );

  }

};

export default Deck;