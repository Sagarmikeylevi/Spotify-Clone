import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromUrl } from "./Spotify";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token, playlists }, dispatch] = useDataLayerValue();

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

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists.items);

        playlists.items.map((item) => {
          dispatch({
            type: "ADD_PLAYLIST",
            playlist: {
              title: item.name,
              imgURL: item.images[0].url,
              other: item.owner.display_name,
            },
          });
        });
        // pla
      });

      // spotify.getPlaylist().then((playlist) => {
      //   console.log(playlist);
      // });
    }

    // spotify.getMySavedTracks().then((savedTracks) => {
    //   console.log(savedTracks);
    // });
  }, []);

  // console.log(playlists);

  return (
    <>
      {!token && <Login />}
      {token && <Player />}
    </>
  );
}

export default App;


