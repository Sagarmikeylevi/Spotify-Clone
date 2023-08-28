import { useDataLayerValue } from "../DataLayer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SongList = () => {
  const [{ showSidebar }] = useDataLayerValue();
  return (
    <div className="max-h-[80%] w-[98%] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300">
      <div
        className="h-[20rem] w-full rounded-t-lg relative"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(245,247,250,0.83) 10%, rgba(195,207,226,0.64) 100%)",
        }}
      >
        <div className="absolute w-full bottom-0 flex flex-row p-4 space-x-6 text-white items-center lg:p-8">
          <img
            src="https://i.scdn.co/image/ab67616d0000b2731a8c4618eda885a406958dd0"
            alt="play_song"
            className={`h-[10rem] rounded-md shadow-2xl ${
              showSidebar ? "lg:h-[12rem]" : "md:h-[12rem] lg:h-[14rem]"
            } `}
          />
          <div className="flex flex-col space-y-4">
            <p className="text-sm font-bold text-white">Album</p>
            <h2
              className={`text-[2rem] font-extrabold tracking-wide ${
                showSidebar
                  ? "md:text-[3rem] lg:text-[4rem]"
                  : "sm:text-[3rem] md:text-[4rem] lg:text-[5rem]"
              }`}
            >
              Still Rollin
            </h2>
            <div className="flex flex-row space-x-4 items-center">
              <div className="flex flex-row items-center space-x-2">
                <img
                  src="https://i.scdn.co/image/ab67616d0000b2731a8c4618eda885a406958dd0"
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
                <p className="text-sm font-bold md:text-base">Shubh</p>
              </div>
              <span className="text-sm font-bold md:text-base">2023</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-[5rem] w-full opacity-80 flex flex-row items-center justify-between px-8"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(245,247,250,0.4) 10%, rgba(195,207,226,0.2) 100%)",
        }}
      >
        <div className="h-12 w-12 rounded-full text-black bg-green-400 flex justify-center items-center cursor-pointer">
          <PlayArrowIcon fontSize="large" />
        </div>

        <div className="w-[10rem] bg-transparent rounded-md px-3 text-sm py-2 flex flex-row items-center space-x-1 cursor-pointer hover:border-[1px] border-[1px] border-[rgba(255,255,255,0.71)]  transition-all duration-300">
          <SearchIcon className="text-white" />
          <input
            type="text"
            className="w-[90%] bg-transparent text-white outline-none font-bold placeholder:text-gray-400 placeholder:tracking-wide"
            placeholder="Search"
          />
        </div>
      </div>

      <div
        className="h-auto w-full py-8 px-2"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(245,247,250,0.2) 10%, rgba(195,207,226,0.1) 100%)",
        }}
      >
        <div className="group h-[4rem] w-full flex flex-row space-x-8 px-2 relative hover:bg-[rgba(166,166,166,0.38)]">
          <div className="flex flex-row items-center space-x-4">
            <span className="text-base text-[#cccccc]">1</span>
            <img
              src="https://i.scdn.co/image/ab67616d0000b2731a8c4618eda885a406958dd0"
              alt=""
              className="h-[80%]"
            />
            <div className="flex flex-col justify-center space-y-1">
              <p className="text-sm text-white font-bold">Cheques</p>
              <p className="text-xs text-[#cccccc] font-bold">Shub</p>
            </div>

            <span className="text-sm text-[#cccccc] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              99,297,375
            </span>

            <span className="text-sm text-[#cccccc] absolute top-[50%] left-[80%] translate-x-[-80%] translate-y-[-50%]">
              3:56
            </span>

            <div className="hidden group-hover:inline-block transition-all duration-200">
              <FavoriteBorderIcon className="text-white absolute top-[50%] left-[95%] translate-x-[-95%] translate-y-[-50%] opacity-80 hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongList;


