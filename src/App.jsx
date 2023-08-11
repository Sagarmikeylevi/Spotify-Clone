import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromUrl } from "./Spotify";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlist) => {
        console.log(playlist);
      });

      // spotify.getMySavedTracks().then((savedTracks) => {
      //   console.log(savedTracks);
      // });

      // spotify.getPlaylist().then((playlist) => {
      //   console.log(playlist);
      // });
    }
  }, []);

  console.log(token);

  return (
    <>
      {!token && <Login />}
      {token && <Player />}
    </>
  );
}

export default App;
