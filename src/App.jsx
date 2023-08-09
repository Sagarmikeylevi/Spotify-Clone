import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { getTokenFromUrl } from "./Spotify";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      console.log(_token);
    }

    
  }, []);
  return (
    <>
      {token && <h1>I am logged in...</h1>}

      {!token && <Login />}
    </>
  );
}

export default App;
