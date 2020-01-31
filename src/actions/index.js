//CREATE SERVICE FOR FETCH (modularize)

import jwt from 'jsonwebtoken';

export const FETCH_USER = 'fetch_user';
export const FETCH_USER_APIS = 'fetch_user_apis';
export const FETCH_SINGLE_API = 'fetch_single_api';

export const fetchUser = () => async dispatch => {
  const token = localStorage.getItem('token');
  dispatch({ type: FETCH_USER, payload: token});
};

export const submitApi = (values, history) => async dispatch => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api`;
  const token = localStorage.token;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => console.log('HERE IN FETCH', data))
    .then(() => history.push('/userDashboard'))
    .catch(e => {
      console.log('Error on Post Request');
      console.error(e);
    });
}

export const fetchUserApisAction = () => async dispatch =>{
  const token = localStorage.token;

  if (token) { // test if logged in
    const { id } = jwt.decode(token); // userId
    const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/user/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    };
    fetch(url, options)
    .then(response => response.json())
    .then(data => dispatch({ type: FETCH_USER_APIS, payload: data}))
    .catch(error => console.error(error));
  }
}


export const fetchSingleApiAction = (apiName) => async dispatch =>{
  const token = localStorage.token;

  const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/${apiName}`;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => dispatch({ type: FETCH_SINGLE_API, payload: data}))
    .catch(error => console.error(error));
}



