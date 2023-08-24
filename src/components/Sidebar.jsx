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
import { useDataLayerValue } from "../DataLayer";
import { useState } from "react";
import Message from "./UI/Message";

const spotify = new SpotifyWebApi();

const Sidebar = () => {
  const [addPlaylist, setAddPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [{ playlists, user, showSidebar, showMessage }, dispatch] =
    useDataLayerValue();

  const showSidebarHandler = () => {
    dispatch({
      type: "SHOW_SIDEBAR",
    });
  };

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

  const addPlaylistHandler = () => {
    // console.log(user.display_name);
    if (newPlaylistName.trim().length === 0) {
      return;
    }

    dispatch({
      type: "SHOW_MESSAGE",
      showMessage: {
        isShow: true,
        message: "Playlist Created",
      },
    });
    setTimeout(() => {
      createPlaylist(user.id, newPlaylistName, true);
      dispatch({
        type: "SHOW_MESSAGE",
        showMessage: {
          isShow: false,
          message: null,
        },
      });
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

    setNewPlaylistName("");
    setAddPlaylist((prevState) => !prevState);
  };

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
            <div className="bg-[#262626] rounded-md shadow-md mb-2 p-[10px]">
              <img
                className="w-[100px]"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                alt="spotify-logo"
              />
            </div>

            <div
              className={`flex flex-col justify-around h-[22%] rounded-md shadow-md mb-2 p-[10px] ${
                addPlaylist ? "bg-[rgba(64,62,62,0.15)]" : "bg-[#1a1919]"
              }`}
              onClick={showSidebarHandler}
            >
              <SidebarOption title={"Home"} Icon={HomeIcon} />
              <SidebarOption title={"Search"} Icon={SearchOutlinedIcon} />
            </div>

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

              <div className="flex flex-row justify-between mb-4">
                <SidebarOption title={"Your Library"} Icon={WebStoriesIcon} />
                <AddIcon
                  onClick={() => setAddPlaylist((prevState) => !prevState)}
                  className="mr-2 cursor-pointer"
                />
              </div>

              <div
                className="max-h-52 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300"
                onClick={showSidebarHandler}
              >
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
                    <Playlist
                      key={playlist.id}
                      imgURL={playlist.imgURL}
                      title={playlist.title}
                      other={playlist.other}
                    />
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

//
