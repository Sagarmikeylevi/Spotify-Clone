import React, { useState } from "react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);


  return (
    <div className="fixed h-20 w-[100%] flex flex-row bg-black bottom-0 rounded-md px-4">
      <div className="flex flex-row items-center space-x-2 mr-2 sm:space-x-4">
        <img
          src="https://i.scdn.co/image/ab67616d0000b2731a8c4618eda885a406958dd0"
          alt="play_song"
          className="h-[60%] rounded-md sm:h-[80%]"
        />
        <div className="flex flex-col text-white ">
          <p className="text-white text-sm tracking-wide font-bold">
            Still Rolling
          </p>
          <p className="text-gray-300 text-xs">Shubh</p>
        </div>
      </div>

      <div className="w-[50%] h-[80%] flex flex-col absolute top-[50%] left-[50%] translate-x-[-35%] sm:translate-x-[-50%] translate-y-[-50%] space-y-8 justify-center items-center">
        <div className="text-white flex flex-row items-center absolute top-0 left-[50%] translate-x-[-50%] space-x-2">
          <SkipPreviousIcon />
          <div
            className="h-8 w-8 rounded-full bg-white grid place-content-center cursor-pointer"
            onClick={() => setIsPlaying((prevState) => !prevState)}
          >
            {isPlaying ? (
              <PauseIcon className="text-black" />
            ) : (
              <PlayArrowIcon className="text-black" />
            )}
          </div>
          <SkipNextIcon />
        </div>

        <div className="w-full flex flex-row items-center justify-center">
          <span className="text-gray-300 text-xs mt-[8px] mr-1 opacity-60">
            0.03
          </span>
          <div className="w-[70%] h-1 bg-gray-600 mt-2 rounded-full">
            <div className="h-full bg-white rounded-full w-[30%] after:h-2 after:w-2 after:bg-white after:rounded-full"></div>
          </div>
          <span className="text-gray-300 text-xs mt-[8px] ml-1 opacity-60">
            4.48
          </span>
        </div>
      </div>

      <div className="absolute top-[50%] left-[90%] translate-y-[-50%] text-white space-y-2 flex flex-col justify-evenly items-center md:flex-row md:space-x-8 md:left-[80%] md:top-[60%] md:translate-y-[-60%] md:space-y-0 lg:left-[85%]">
        {isLiked ? (
          <FavoriteIcon
            className="cursor-pointer text-green-400"
            onClick={() => setIsLiked(false)}
          />
        ) : (
          <FavoriteBorderIcon
            className="cursor-pointer"
            onClick={() => setIsLiked(true)}
          />
        )}

        <VolumeDownIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
