import React, { useState,useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import CardList from "./CardList";
import { readDeck } from "../utils/api";
import { deleteDeck } from "../utils/api";
import { deleteCard } from "../utils/api";
import { useParams } from "react-router-dom";
import {useHistory } from "react-router-dom" //dw added
export const VDeck = () => {
    const [deck, setDeck] = useState(undefined);
    const [error, setError] = useState(undefined);
    const history  = useHistory();
    const { deckId } = useParams(); // TODO: This ID will need to be pulled from parameters.

    const abortController = new AbortController();



    const trash = async (event) => {

        event.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this deck?");

        if (!confirmDelete) {
          return; // User canceled the deletion
        }
        try {
          await deleteDeck(deckId, abortController.signal);
          history.push(`/`);
        } catch (error) {
          setError(error);
        } finally {
          abortController.abort(); // Ensure proper cleanup
        }
      };


    useEffect(() => {
        
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
        return <ErrorMessage error={error} />;
      }
    

      const trashCard = async (card) => {
        //event.preventDefault();
        const abortController = new AbortController();
      
        try {
         
          //re render deck
          const confirmDelete = window.confirm("Are you sure you want to delete this card?");

          if (!confirmDelete) {
            return; // User canceled the deletion
          }
          await deleteCard(card.id, abortController.signal);
          readDeck(deckId).then(setDeck);
        } catch (error) {
          setError(error);
        } finally {
          abortController.abort(); // Ensure proper cleanup
        }
      };


console.log(deck);


  if(deck){
    const list = deck.cards.map((card) => <CardList key={card.id} card={card} deck={deck} trash={trashCard}/>);
  return (

    <div className="card mb-3">
    <div className="card-body">
      <h4 className="card-title">{deck.name}</h4>
      <p className="card-text">{deck.description}</p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="btn-group">
          <Link
            to={`/decks/${deckId}/edit/`}
            className="btn btn-md btn-primary"
          >
            Edit
          </Link>
          <Link
            to={`/decks/${deckId}/study`}
            className="btn btn-md btn-secondary"
          >
            Study
          </Link>
          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-md btn-secondary"
          >
            Add Cards
          </Link>
        </div>
        <button onClick={trash} className="btn btn-md btn-danger">
         Trash
        </button>
      </div>
      <section className="column">{list}</section>
    </div>
   

  </div>
   
  
  );


  }
  return (<div>Not Available</div>)
};

export default VDeck;