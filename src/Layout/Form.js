import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";

const Form = ({ onSubmit,card,  deck }) => {
    const [cards, setCards] = useState({});

      useEffect(() => {
        setCards({
          front: card.front || "",
          back: card.back || "",
          deckId: deck.id || "",
          id: card.id || "",
        });
      }, [card, deck]);

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCards((prevCards) => ({ ...prevCards, [name]: value }));
  };

  const handleSubmit = (event) => {
   
    event.preventDefault();
    cards.id=card.id;
    cards.deckId=deck.id;
    
    onSubmit(cards);
  };

  const handleRedirect = () => {
    history.push(`/decks/${deck.id}`);
  };

  return (
    <form className="mt-4"  onSubmit={handleSubmit}>
     <h3>{deck.name}</h3>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          id="front"
         
          className="form-control"
          name="front"
          value={cards.front }
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
         
          value={cards.back}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary me-2"
     
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
};

export default Form;