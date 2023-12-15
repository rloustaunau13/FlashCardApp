import React from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
/*
  TODO: Change the below to be a link that goes to the specific post route using the post id. Hint: you can use the `useRouteMatch()` hook from "react-router-dom" to get the current URL path
*/

export const DeckLink = ({ deck }) => {
  const { url,path } = useRouteMatch();

  
console.log(deck);
  const deckId = deck.id; //dw added to use in link
  return (
    <li>
      <Link to={`/decks/${deckId}`} exact >{deck.name}</Link>

    </li>



  );

};

export default DeckLink;
