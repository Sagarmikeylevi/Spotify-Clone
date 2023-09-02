import SpotifyWebApi from "spotify-web-api-js";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import AddIcon from "@mui/icons-material/Add";
import SidebarOption from "./SidebarOption";
import Playlist from "./Playlist";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDataLayerValue } from "../DataLayer";
import { useState } from "react";
import Message from "./UI/Message";

// Initialize the Spotify Web API instance
const spotify = new SpotifyWebApi();

// Define the Sidebar component
const Sidebar = () => {
  // State variables for managing playlist creation form
  const [addPlaylist, setAddPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  // Destructuring values from the data layer context
  const [{ playlists, user, showSidebar, showMessage }, dispatch] =
    useDataLayerValue();

  // Function to toggle the sidebar visibility
  const showSidebarHandler = () => {
    dispatch({
      type: "SHOW_SIDEBAR",
    });
  };

  // Function to create a new playlist
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

  // Function to handle the addition of a new playlist
  const addPlaylistHandler = () => {
    if (newPlaylistName.trim().length === 0) {
      return;
    }

    // Show a message indicating that the playlist is being created
    dispatch({
      type: "SHOW_MESSAGE",
      showMessage: {
        isShow: true,
        message: "Playlist Created",
      },
    });

    // Delayed execution to simulate playlist creation
    setTimeout(() => {
      createPlaylist(user.id, newPlaylistName, true);

      // Hide the message after creation
      dispatch({
        type: "SHOW_MESSAGE",
        showMessage: {
          isShow: false,
          message: null,
        },
      });

      // Add the new playlist to the data layer
      dispatch({
        type: "ADD_PLAYLIST",
        playlist: {
          id: 2,
          title: newPlaylistName,
          imgURL:
            "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=1.0",
          other: user.display_name,
        },
      });
    }, 1000);

    // Reset the input field and toggle the playlist creation form
    setNewPlaylistName("");
    setAddPlaylist((prevState) => !prevState);
  };

  // Return JSX for the Sidebar component
  return (
    <>
      {!showSidebar && (
        <div
          className="h-full min-w-[50px] bg-[#1a1919] mr-[10px] text-gray-500 relative"
          onClick={showSidebarHandler}
        >
          <ChevronRightIcon
            fontSize="large"
            className="absolute top-[40%] left-[20%]  translate-y-[-40%] hover:text-green-700 cursor-pointer"
          />
        </div>
      )}

      {showSidebar && (
        <>
          {showMessage.isShow && <Message message={showMessage.message} />}
          <div className="h-full min-w-[384px] p-[10px]">
            {/* Sidebar header */}
            <div className="group bg-[#262626] rounded-md shadow-md mb-2 p-[10px] relative">
              <img
                className="w-[100px]"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                alt="spotify-logo"
              />
              <div className="hidden group-hover:inline-block absolute top-[50%] left-[95%] translate-x-[-95%] translate-y-[-50%]">
                <ChevronLeftIcon
                  fontSize="large"
                  className="text-white hover:text-green-600 cursor-pointer"
                  onClick={showSidebarHandler}
                />
              </div>
            </div>

            {/* Sidebar navigation options */}
            <div
              className={`flex flex-col justify-around h-[22%] rounded-md shadow-md mb-2 p-[10px] ${
                addPlaylist ? "bg-[rgba(64,62,62,0.15)]" : "bg-[#1a1919]"
              }`}
            >
              <SidebarOption title={"Home"} Icon={HomeIcon} />
              <SidebarOption title={"Search"} Icon={SearchOutlinedIcon} />
            </div>

            {/* Playlist section */}
            <div
              className={`text-white h-[65%] rounded-md shadow-md p-[10px] relative ${
                addPlaylist ? "bg-[rgba(64,62,62,0.15)]" : "bg-[#1a1919]"
              }`}
            >
              {addPlaylist && (
                <div
                  className="w-[90%] h-32 absolute 
        bg-[#262626] rounded-md top-12 z-[9999] transition-all duration-200 ease-in shadow-2xl"
                >
                  {/* Playlist creation form */}
                  <div className="w-[95%] flex flex-row justify-between items-center">
                    <div className="text-white text-lg p-4 flex flex-row items-center space-x-2 tracking-wide">
                      <QueueMusicIcon fontSize="large" />
                      <p>Create New Playlist</p>
                    </div>
                  </div>

                  <div className="flex flex-row ml-[5%] w-[90%] justify-center items-center">
                    <input
                      type="text"
                      placeholder="Enter playlist name"
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      className="w-[80%] border-none outline-none rounded-md p-2 bg-[#404040]"
                    />

                    <AddBoxIcon
                      fontSize="large"
                      className="ml-2 cursor-pointer"
                      onClick={addPlaylistHandler}
                    />
                  </div>
                </div>
              )}

              {/* Your Library and Add Playlist button */}
              <div className="flex flex-row justify-between mb-4">
                <SidebarOption title={"Your Library"} Icon={WebStoriesIcon} />
                <AddIcon
                  onClick={() => setAddPlaylist((prevState) => !prevState)}
                  className="mr-2 cursor-pointer"
                />
              </div>

              {/* List of playlists */}
              <div className="max-h-52 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300">
                {playlists.length === 0 && (
                  <div className="h-[20%] bg-[rgba(187,186,186,0.2)] rounded-md py-4 px-6">
                    <p className="text-white font-bold tracking-wider">
                      Create your first playlist
                    </p>
                    <p className="mt-2 text-gray-200 text-sm tracking-wider">
                      It's easy we'll help you
                    </p>

                    <button
                      onClick={() => setAddPlaylist((prevState) => !prevState)}
                      className="mt-4 bg-white text-black rounded-full py-2 text-sm font-bold px-4"
                    >
                      Create playlist
                    </button>
                  </div>
                )}
                {playlists.length > 0 &&
                  playlists.map((playlist) => (
                    <Playlist key={playlist.id} playlist={playlist} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
