import React, { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added
import ErrorMessage from "../common/ErrorMessage";
import Card from "./Card";
import { Link } from "react-router-dom";
export const Cards = ({ cards }) => {
  const [count, setCount] = useState(0);
  const [card, setCard] = useState(cards[count]);

  const history  = useHistory();
  function handleLast()  {
    const result = window.confirm("Restart Cards");
    if (!result) {
     //await deletePost(id);
      // TODO: After the post is deleted, send the user to the home page.
      history.push("/"); //dw added to send user to home page after post is deleted.
    }else{
        setCount(0);
    }
  };


  useEffect(() => {
    // Update the card state when the cards prop changes
    setCard(cards[count]);
  }, [ count]);

  const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 1);

    if (count >= cards.length-1) {
      handleLast();
      setCount(0);
    }

    // Update the card state based on the new count
    setCard(cards[count + 1]);
  };

  console.log(cards);

if(card && cards.length>2){
    return (
      <article >
        
          
      <Card key={card.id} card={card} incrementCount={incrementCount} length={cards.length} count={count} />
        
      </article>
    );
    }

    return <div></div>
 
};

export default Cards;