import React, { useState } from "react";
import { Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import axios from 'axios';

function Admin(props) {
  const { setAuthTokens } = useAuth();
  const [setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);



  //TODO! Add call to server.
  function logOut() {
    axios.get("http://localhost:9000/user/logout", {
      params: {withCredentials: true}
    }).then(result => {
      if (result.status === 200) {
        console.log("User is logged out.");
        setAuthTokens();
        setLoggedIn(false);
      } else {
        console.log(result);
        setIsError(true);
      }
    }).catch(e => {
      console.log(e);
      setIsError(true);
    });
  }

  function getUser() {
    //axios.get("http://localhost:9000/user/data", { withCredentials: true }).then(result => {
    axios.get("http://localhost:9000/user/data", {withCredentials: true}).then(result => {
      if (result.status === 200) {
        console.log(result);
      } else {
        console.log(result);
        setIsError(true);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  //TODO add logged in call to server.
  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
      <Button onClick={getUser}>Print user</Button>
      { isError &&<Error>Could not log out!</Error> }
    </div>
  );
}

export default Admin;