import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createCard, readCard, updateCard } from "../utils/api";

const CardForm = ({ onSubmit, onCancel, initialData = {}, deckId, cardId }) => {
  const [cardData, setCardData] = useState(initialData);
  const [error, setError] = useState(null);
  const history = useHistory();
 
  useEffect(() => {
    if (cardId) {
      // If cardId is provided, fetch card data for editing
      const fetchData = async () => {
        try {
          const card = await readCard(cardId);
          setCardData(card);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    }
  }, [cardId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (cardId) {
        // If cardId is provided, update existing card
        await updateCard(cardData);
      } else {
        // If no cardId, create a new card
        await createCard(deckId, cardData);
      }

      // Trigger the provided onSubmit callback with the updated card data
      onSubmit(cardData);

      // Redirect to the deck page or perform other actions as needed
      history.push(`/decks/${deckId}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form input fields go here */}
      <label htmlFor="front">Front</label>
      <input
        type="text"
        id="front"
        name="front"
        value={cardData.front || ""}
        onChange={handleChange}
      />

      <label htmlFor="back">Back</label>
      <input
        type="text"
        id="back"
        name="back"
        value={cardData.back || ""}
        onChange={handleChange}
      />

      {/* Add more input fields as needed */}

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CardForm;