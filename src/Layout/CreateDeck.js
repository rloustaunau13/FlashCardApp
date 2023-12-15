import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Route, useRouteMatch, Switch,Link} from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added

import { readDeck, updateCard } from "../utils/api";
import { createCard } from "../utils/api";
import { createDeck } from "../utils/api";
import { useState,useEffect } from "react";
import ErrorMessage from "../common/ErrorMessage";
export const CreateDeck =( ) => {

  const [error, setError] = useState(undefined);

 const [deck, setDeck] = useState({});
 
 const abortController = new AbortController(); // Declare AbortController

 let name= '';
 let value='';
 const history  = useHistory();
 const handleChange = (event) => {

  
    name=event.target.name;
    value=event.target.value;
    setDeck(values => ({...values, [name]: value}))
    
  }




const handleRedirect=()=>{
    history.push('/')
}



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the updated card state

    
    if (error) {
      return <ErrorMessage error={error} />;
    }
  


//setCard(values => ({...values, ['id']: value1}))
    // Call the API to create the card with the abort signal
    try {
      await createDeck(deck, abortController.signal);
    } catch (error) {
      setError(error);
    }
  };







return(

  <div>
  <h3>Create Deck</h3>
    <form >
    <label>Name
    <input 
      type="text" 
      name="name" 
      value={deck.name || ""} 
      onChange={handleChange}
       
    />
    </label>
    <label> Description
      <textarea 
        type="text" 
        name="description" 
        value={deck.description || ""} 
        onChange={handleChange}
      />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleRedirect}>Cancel</button>
  </form>

  </div>
      );

      
 
  
}

  
  export default CreateDeck;