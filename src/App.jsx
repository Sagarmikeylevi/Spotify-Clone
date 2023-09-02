import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromUrl } from "./Spotify";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  // fetching current playing song
  const currentPlayingSongs = async () => {
    try {
      const currentTrack = await spotify.getMyCurrentPlayingTrack();

      const currentPlaybackState = await spotify.getMyCurrentPlaybackState();

      dispatch({
        type: "ADD_CURRENTSONG",

        currentSong: {
          name: currentTrack.item.name,
          image: currentTrack.item.album.images[0].url,
          artist: currentTrack.item.artists[0].name,
          isPlaying: currentTrack.is_playing,
          durationMs: currentTrack.item.duration_ms,
          processMs: currentTrack.progress_ms,
          volume: currentPlaybackState.device.volume_percent,
        },
      });
    } catch (error) {
      console.log("Error fetching current playing song: ", error);
    }
  };

  // fetching artist
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

  // fetching  playlist to it in home page
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

  // fetching sponsored playlist
  const fetchSponsoredPlaylist = async () => {
    try {
      const sponsoredPlaylist = await spotify.getPlaylist(
        "7BpibltBeSLWXvFOxRQCHZ"
      );

      const owner = await spotify.getUser(sponsoredPlaylist.owner.id);

      dispatch({
        type: "ADD_SPONSOREDPLAYLIST",
        sponsoredPlaylist: {
          title: sponsoredPlaylist.name,
          imgURL: sponsoredPlaylist.images[0].url,
          type: sponsoredPlaylist.type,
          owner: owner.display_name,
          ownerIMG: owner.images[0].url,
          other: sponsoredPlaylist.tracks.total,
          items: sponsoredPlaylist.tracks.items,
        },
      });
    } catch (error) {
      console.log("Error fetching sponsored playlist: ", error);
    }
  };

  // fetching liked songs of user 
  const fetchLikedSongs = async () => {
    try {
      const likedSongs = await spotify.getMySavedTracks();
      const user = await spotify.getMe();

      dispatch({
        type: "ADD_PLAYLIST",
        playlist: {
          id: 1,
          title: "Liked Songs",
          imgURL:
            "https://spotify-static-clone.netlify.app/images/likedsongs.jpg",
          items: likedSongs.items,
          type: "Playlist",
          owner: user.display_name,
          ownerIMG: user.images[0].url,
          other: likedSongs.total,
        },
      });
    } catch (error) {
      console.log("Error feting liked songs ", error);
    }
  };

  // fetching user liked playlist or create playlist
  const fetchPlaylists = async () => {
    try {
      const playlists = await spotify.getUserPlaylists();

      const getTracks = async (playlistID) => {
        return await spotify.getPlaylistTracks(playlistID);
      };

      const getOwner = async (ownerID) => {
        return await spotify.getUser(ownerID);
      };

      for (const item of playlists.items) {
        const playlistTracks = await getTracks(item.id);
        const owner = await getOwner(item.owner.id);

        dispatch({
          type: "ADD_PLAYLIST",
          playlist: {
            id: item.id,
            title: item.name,
            imgURL:
              item.images.length === 0
                ? "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=1.0"
                : item.images[0].url,
            items: playlistTracks.items,
            type: "Playlist",
            owner: owner.display_name,
            ownerIMG: owner.images[0].url,
            other: item.tracks.total,
          },
        });
      }
    } catch (error) {
      console.log("Error fetching playlists ", error);
    }
  };

  // setting access token and fetching user details 
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

  // handling all functions 
  const handleTokenAndUser = async () => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      setAccessTokenAndFetchUser(_token);
      currentPlayingSongs();
      fetchLikedSongs();
      fetchPlaylists();
      fetchSponsoredPlaylist();
      fetchPlaylistCards("Punjabi Trending");
      fetchPlaylistCards("Bollywood Butter");
      fetchArtist("Shubh");
      fetchArtist("Talha Anjum");
      fetchArtist("Kaifi Khalil");
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
