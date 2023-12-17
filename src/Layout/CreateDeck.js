import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Route, useRouteMatch, Switch,Link} from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useHistory } from "react-router-dom" //dw added

import { readDeck, updateCard } from "../utils/api";

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
    history.push('/');
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
      setDeck({});
      history.push('/');
    } catch (error) {
      return <ErrorMessage error={error} />;
    }
  };







return(


  <form className="mt-4">
  <h1 className="mb-4">Create Deck</h1>
  

  <div className="mb-3">
    <label htmlFor="name" className="form-label">
    Name
    </label>
    <textarea
      id="name"
      className="form-control"
      name="name"
      value={deck.name || ""}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="description" className="form-label">
     Description
    </label>
    <textarea
      id="description"
      className="form-control"
      name="description"
      value={deck.description || ""}
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

  
  export default CreateDeck;





