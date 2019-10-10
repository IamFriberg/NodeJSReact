import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  //TODO! Add call to server.
  function logOut() {
    setAuthTokens();
  }

  //TODO add logged in call to server.
  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;