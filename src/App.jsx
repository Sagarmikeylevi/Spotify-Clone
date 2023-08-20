import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromUrl } from "./Spotify";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  const fetchPlaylistCards = async (title) => {
    try {
      const playlistCards = await spotify.search(title, ["playlist"], {
        limit: 3,
      });

      dispatch({
        type: "ADD_PLAYLIST_CARD",
        cardDetails: {
          heading: title,
          items: playlistCards.playlists.items,
        },
      });

      console.log("Playlist Cards ---->", playlistCards);
      console.log(playlistCards.playlists.items[0].description);
    } catch (error) {
      console.log("Error fetching playlist cards: ", error);
    }
  };

  const fetchSponsoredPlaylist = async () => {
    try {
      const sponsoredPlaylist = await spotify.getPlaylist(
        "7BpibltBeSLWXvFOxRQCHZ"
      );

      dispatch({
        type: "ADD_SPONSOREDPLAYLIST",
        sponsoredPlaylist: {
          title: sponsoredPlaylist.name,
          imgURL: sponsoredPlaylist.images[0].url,
        },
      });
      // console.log("Sponsored Playlist ---->", sponsoredPlaylist);
    } catch (error) {
      console.log("Error fetching sponsored playlist: ", error);
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const likedSongs = await spotify.getMySavedTracks();

      dispatch({
        type: "ADD_PLAYLIST",
        playlist: {
          id: 1,
          title: "Liked Songs",
          imgURL:
            "https://spotify-static-clone.netlify.app/images/likedsongs.jpg",
          other: likedSongs.total + " songs",
        },
      });
    } catch (error) {
      console.log("Error feting liked songs ", error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const playlists = await spotify.getUserPlaylists();
      playlists.items.map((item) => {
        dispatch({
          type: "ADD_PLAYLIST",
          playlist: {
            id: item.id,
            title: item.name,
            imgURL:
              item.images.length === 0
                ? "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=1.0"
                : item.images[0].url,
            other: item.owner.display_name,
          },
        });
      });
    } catch (error) {
      console.log("Error fetching playlists ", error);
    }
  };

  const setAccessTokenAndFetchUser = async (_token) => {
    dispatch({
      type: "SET_TOKEN",
      token: _token,
    });

    spotify.setAccessToken(_token);

    try {
      const user = await spotify.getMe();
      dispatch({
        type: "SET_USER",
        user,
      });
    } catch (error) {
      console.log("Error finding user: ", error);
    }
  };

  const handleTokenAndUser = async () => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      setAccessTokenAndFetchUser(_token);
      fetchLikedSongs();
      fetchPlaylists();
      fetchSponsoredPlaylist();
      fetchPlaylistCards("Punjabi Trending");
      
    }
  };

  useEffect(() => {
    handleTokenAndUser();
  }, []);

  return (
    <>
      {!token && <Login />}
      {token && <Player />}
    </>
  );
}

export default App;

/*
 // Define a function to create a new playlist
        const createPlaylist = async (userId, playlistName, isPublic) => {
          try {
            // Use the .createPlaylist() method to create a new playlist
            const playlist = await spotify.createPlaylist(userId, {
              name: playlistName,
              public: isPublic,
            });

            // Log the created playlist details
            console.log("Created Playlist:", playlist);
          } catch (error) {
            console.error("Error:", error);
          }
        };

        // Call the function to create a new playlist
        // Replace 'USER_ID' with the ID of the user you want to create the playlist for
        // Replace 'PLAYLIST_NAME' with the desired name of the playlist
        // Set 'IS_PUBLIC' to true if the playlist should be public, or false if it should be private
        createPlaylist("31nnblugrkzx5brnmqftyryqp4pq", "Jay Shree Ram", true);
*/
