
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import React, { useState,useEffect } from "react";
import { deleteCard } from "../utils/api";
import {useHistory } from "react-router-dom" //dw added
export const CardList = ({ card,deck,trash }) => {
    const history  = useHistory();

  console.log("Card component rendered. Card ID: " + card.deckId);

  
    //setBody(body === card.front ? card.back : card.front);

   
    if (card) {
      return (
        <div className="card mb-5">
        <div className="card-body d-flex justify-content-between">
          {/* Display the front of the card on the left half */}
          <div style={{ flex: 1 }}>
            <h2 className="font-weight-lighter mb-3">{card.front}</h2>
          </div>
          
          {/* Display the back of the card on the right half */}
          <div style={{ flex: 1 }}>
            <h2 className="font-weight-lighter">{card.back}</h2>
          </div>
        </div>
      
        {/* Action buttons at the bottom */}
        <div className="d-flex justify-content-end">
          <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className="btn btn-primary me-2">
            Edit
          </Link>
          
          <button onClick={() => trash(card)} className="btn btn-danger">
            Trash
          </button>
        </div>
      </div>
      );
    }
  };

export default CardList;