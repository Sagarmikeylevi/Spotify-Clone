import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromUrl } from "./Spotify";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  const fetchArtist = async (name) => {
    const artist = await spotify.search(name, ["artist"], {
      limit: 1,
    });

    dispatch({
      type: "ADD_ARTIST",
      artistDetails: {
        id: artist.artists.items[0].id,
        name,
        imgURL: artist.artists.items[0].images[0].url,
      },
    });
  };

  const fetchPlaylistCards = async (title) => {
    try {
      const playlistCards = await spotify.search(title, ["playlist"], {
        limit: 3,
      });

      dispatch({
        type: "ADD_PLAYLIST_CARD",
        playlistCards: {
          heading: title ? title : "",
          items: playlistCards.playlists.items,
        },
      });
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
    } catch (error) {
      console.log("Error fetching sponsored playlist: ", error);
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const likedSongs = await spotify.getMySavedTracks();
      console.log("Liked Songs --->", likedSongs.items);

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
      fetchPlaylistCards("Desi Hip-Hop");
      fetchArtist("Shubh");
      fetchArtist("Talha Anjum");
      fetchArtist("Kaifi Khalil");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleTokenAndUser();
    }, 1000);
  }, []);

  return (
    <>
      {!token && <Login />}
      {token && <Player />}
    </>
  );
}

export default App;
