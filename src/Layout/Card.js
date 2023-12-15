import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";



export const Card = ({ card, incrementCount,length,count }) => {
  const [body, setBody] = useState(card.front);
  const [flag, setFlag] = useState(true);
  if (!card) {
    return <div>No more cards Available</div>;
  }

  function flip() {
    if(flag ){
     setBody(card.back);
     setFlag(false);
    }else{
      setBody(card.front);
      setFlag(true);
    }
  }

  console.log("Card component rendered. Card ID: " + flag);

  if (flag) {
    return (
      <div>
      <p>Card {count+1} of {length}</p>
      <h3 className="font-weight-lighter flex-fill">
        
        <div>{body}</div>
     
        <button className="btn btn-secondary" onClick={flip}>FLIP</  button>
      </h3>
      </div>
    );
  }
  if (flag == false) {
  return (
    <div>
       <h3 className="font-weight-lighter flex-fill">

      <div>{body}</div>
      </h3>
      <button className="btn btn-primary" onClick={incrementCount}>Next</button>
      <button className="btn btn-secondary" onClick={flip}>FLIP</  button>
    </div>
  );
};
}

export default Card;
