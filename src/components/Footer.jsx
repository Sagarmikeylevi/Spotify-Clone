import React, { useEffect, useState } from "react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useDataLayerValue } from "../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

const Footer = () => {
  const [{ currentPlayingSongs }] = useDataLayerValue();
  const [textLimit, setTextLimit] = useState(10);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const updateTextLimit = () => {
      if (window.innerWidth < 600) {
        setTextLimit(15); // Small screen
      } else if (window.innerWidth < 1024) {
        setTextLimit(20); // Medium screen
      } else {
        setTextLimit(30); // Large screen
      }
    };

    const fetchLikedTracks = async () => {
      try {
        const savedTracksResponse = await spotify.getMySavedTracks({
          limit: 50,
        });
        const savedTracks = savedTracksResponse.items;
        const likedTrackIds = savedTracks.map(
          (savedTrack) => savedTrack.track.id
        );
        setIsLiked(likedTrackIds);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    updateTextLimit(); // Call on initial render
    fetchLikedTracks();

    // Update on window resize
    window.addEventListener("resize", updateTextLimit);
    return () => {
      window.removeEventListener("resize", updateTextLimit);
    };
  }, []);

  const convertMsToMmSs = (durationMs) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const duration = convertMsToMmSs(
    currentPlayingSongs.durationMs ? currentPlayingSongs.durationMs : "000"
  );
  const progress = convertMsToMmSs(
    currentPlayingSongs.processMs ? currentPlayingSongs.processMs : "000"
  );

  const progressBarWidth = `${
    (currentPlayingSongs.processMs / currentPlayingSongs.durationMs) * 100
  }%`;

  const volume = currentPlayingSongs.volume
    ? currentPlayingSongs.volume + "%"
    : 50 + "%";

  // if (currentPlayingSongs.name) {
  //   console.log(currentPlayingSongs.name.length);
  // } else {
  //   console.log("currentPlayingSongs is undefined or null");
  // }

  return (
    <div className="fixed h-20 w-[100%] flex flex-row bg-black bottom-0 rounded-md px-4">
      <div className="flex flex-row items-center space-x-2 mr-2 sm:space-x-4">
        <img
          src={
            currentPlayingSongs.image
              ? currentPlayingSongs.image
              : "https://s1.mzstatic.com/us/r1000/092/Purple/v4/d4/01/51/d4015162-3d37-04f3-3493-8bcb908e9315/mzl.wrmgngoh.png"
          }
          alt="play_song"
          className="h-[60%] rounded-md sm:h-[80%]"
        />
        <div className="flex flex-col text-white ">
          <p className="text-white text-sm tracking-wide font-bold">
            {currentPlayingSongs.name &&
            currentPlayingSongs.name.length > textLimit
              ? currentPlayingSongs.name.slice(0, textLimit) + "..."
              : currentPlayingSongs.name}
          </p>

          <p className="text-gray-300 text-xs">
            {currentPlayingSongs.artist &&
            currentPlayingSongs.artist.length > textLimit
              ? currentPlayingSongs.artist.slice(0, textLimit) + "..."
              : currentPlayingSongs.artist}
          </p>
        </div>
      </div>

      <div className="w-[50%] h-[80%] flex flex-col absolute top-[50%] left-[50%] translate-x-[-35%] sm:translate-x-[-50%] translate-y-[-50%] space-y-8 justify-center items-center">
        <div className="text-white flex flex-row items-center absolute top-0 left-[50%] translate-x-[-50%] space-x-3">
          <ShuffleIcon fontSize="small" className="text-gray-400" />
          <SkipPreviousIcon />
          <div className="h-8 w-8 rounded-full bg-white grid place-content-center cursor-pointer">
            {currentPlayingSongs.isPlaying ? (
              <PauseIcon className="text-black" />
            ) : (
              <PlayArrowIcon className="text-black" />
            )}
          </div>
          <SkipNextIcon />
          <RepeatIcon fontSize="small" className="text-gray-400" />
        </div>

        <div className="w-full flex flex-row items-center justify-center">
          <span className="text-gray-300 text-xs mt-[8px] mr-1 opacity-60">
            {progress}
          </span>
          <div className="w-[70%] h-1 bg-gray-600 mt-2 rounded-full">
            <div
              className={`h-full bg-white rounded-full after:h-2 after:w-2 after:bg-white after:rounded-full`}
              style={{ width: progressBarWidth }}
            ></div>
          </div>
          <span className="text-gray-300 text-xs mt-[8px] ml-1 opacity-60">
            {duration}
          </span>
        </div>
      </div>

      <div className="absolute top-[50%] left-[90%] translate-y-[-50%] text-white space-y-2 flex flex-col justify-evenly items-center md:flex-row md:space-x-8 md:left-[80%] md:top-[60%] md:translate-y-[-60%] md:space-y-0 lg:left-[85%]">
        <div className="hidden md:flex">
          {isLiked ? (
            <FavoriteIcon
              className="cursor-pointer text-green-400"
              onClick={() => setIsLiked(false)}
            />
          ) : (
            <FavoriteBorderIcon
              className="hidden cursor-pointer md:block"
              onClick={() => setIsLiked(true)}
            />
          )}
        </div>

        {textLimit < 16 && (
          <div className="group flex flex-col items-center justify-end space-x-1 h-[5rem] pb-2">
            <div className="hidden h-[100%] w-1 bg-transparent rounded-full group-hover:block relative">
              <div
                className="w-1 bg-white rounded-full absolute bottom-0"
                style={{ height: volume }}
              ></div>
            </div>
            <VolumeDownIcon className="cursor-pointer" />
          </div>
        )}

        {textLimit > 15 && (
          <div className="flex items-center space-x-1 w-[7rem]">
            <VolumeDownIcon className="cursor-pointer" />

            <div className="w-[100%] h-1 bg-gray-400 rounded-full">
              <div
                className="h-1 bg-white rounded-full"
                style={{ width: volume }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
