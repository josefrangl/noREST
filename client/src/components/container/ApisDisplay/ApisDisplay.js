import React, {useEffect, useState} from "react";
import ApiCard from "../../presentional/ApiCard/ApiCard";
import { Link } from "react-router-dom";
import jwt from 'jsonwebtoken'

import './style.css';

const ApisDisplay = () => {
  const [apis, setApis] = useState([]); // redux??

  useEffect(() => {
    getAllApis();
  }, []);


  function getAllApis () {
    const token = localStorage.token;
    const { id } = jwt.decode(token); // userId

    const url = `http://localhost:3000/logistics/api/user/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    };

    fetch(url, options)  // get userId from??
    .then(response => response.json())
    .then(data => setApis(data))
    .catch(error => console.error(error));
  }

  return (
    <>
      <h1>APIS GO HERE</h1>
      <div style={{maxWidth: '10px'}}>
        {apis.length ? apis.map(el => <ApiCard apiInfo={el} key={el._id} />) :
        <div className="no-apis">
          No APIs to display
        </div>
        }
      </div>
    </>
  );
};

export default ApisDisplay;
