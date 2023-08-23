import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Search = () => {
  return (
    <div className="mt-4 px-4 max-h-[80%] w-[98%] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300">
      <div className="w-[20rem] bg-[rgba(86,86,86,0.36)] rounded-full px-3 text-sm py-3 flex flex-row items-center space-x-1 cursor-pointer">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          className="w-[16rem] bg-transparent text-white outline-none font-bold placeholder:text-gray-400 placeholder:tracking-wide"
          placeholder="What do you want to listen to?"
        />
      </div>

      <div className="mt-8 flex flex-row gap-10 mb-8">
        <div className="flex flex-col">
          <h2 className="text-white text-xl font-bold mb-4">Top Result</h2>
          <div className="group h-[18rem] w-[23rem] flex flex-col justify-evenly bg-[rgba(77,77,77,0.3)] rounded-md cursor-pointer hover:bg-[rgba(77,77,77,0.5)] transition-all duration-200 px-8 py-6 relative">
            <div className="hidden absolute top-[70%] left-[80%] h-14 w-14 rounded-full text-black z-[999] bg-green-400 group-hover:flex justify-center items-center shadow-lg transition-all duration-200">
              <PlayArrowIcon fontSize="large" />
            </div>
            <img
              src="https://i.scdn.co/image/ab67616d0000b2731d1cc2e40d533d7bcebf5dae"
              alt="song_img"
              className="h-[8rem] w-[8rem] rounded-md"
            />
            <p className="text-white text-2xl font-bold opacity-90 tracking-wide">
              295
            </p>
            <div className="flex flex-row items-center">
              <p className="text-[#a6a6a6] text-sm tracking-wide">
                Sidhu Moose Wala
              </p>
              <h4 className="text-white text-sm ml-8 font-bold px-4 py-2 rounded-full bg-[rgba(102,102,102,0.41)] tracking-wide">
                Song
              </h4>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-white text-xl font-bold mb-4">Songs</h2>
          <div className="h-[18rem] w-[25rem] flex flex-col justify-evenly ">
            {/* part-1 */}
            <div className="h-[5rem] w-[95%]  flex flex-row items-center px-4 cursor-pointer bg-[#212121]  hover:bg-[rgba(77,77,77,0.5)]">
              <img
                src="https://i.scdn.co/image/ab67616d0000b2731d1cc2e40d533d7bcebf5dae"
                alt="song_img"
                className="h-[4rem] w-[4rem] rounded-md"
              />
              <div className="ml-6 space-y-1">
                <h4 className="text-white text-lg font-bold opacity-90 tracking-wide">
                  295
                </h4>
                <p className="text-[#a6a6a6] text-sm tracking-wide">
                  Sidhu Moose Wala
                </p>
              </div>

              <FavoriteBorderIcon
                fontSize="medium"
                className="ml-20 text-white opacity-70"
              />
            </div>
            {/* part-1 */}
            {/* part-1 */}
            <div className="h-[5rem] w-[95%]  flex flex-row items-center px-4 cursor-pointer bg-[#212121] hover:bg-[rgba(77,77,77,0.5)]">
              <img
                src="https://i.scdn.co/image/ab67616d0000b2731d1cc2e40d533d7bcebf5dae"
                alt="song_img"
                className="h-[4rem] w-[4rem] rounded-md"
              />
              <div className="ml-6 space-y-1">
                <h4 className="text-white text-lg font-bold opacity-90 tracking-wide">
                  295
                </h4>
                <p className="text-[#a6a6a6] text-sm tracking-wide">
                  Sidhu Moose Wala
                </p>
              </div>

              <FavoriteBorderIcon
                fontSize="medium"
                className="ml-20 text-white opacity-70"
              />
            </div>
            {/* part-1 */}
            {/* part-1 */}
            <div className="h-[5rem] w-[95%]  flex flex-row items-center px-4 cursor-pointer bg-[#212121]  hover:bg-[rgba(77,77,77,0.5)]">
              <img
                src="https://i.scdn.co/image/ab67616d0000b2731d1cc2e40d533d7bcebf5dae"
                alt="song_img"
                className="h-[4rem] w-[4rem] rounded-md"
              />
              <div className="ml-6 space-y-1">
                <h4 className="text-white text-lg font-bold opacity-90 tracking-wide">
                  295
                </h4>
                <p className="text-[#a6a6a6] text-sm tracking-wide">
                  Sidhu Moose Wala
                </p>
              </div>

              <FavoriteBorderIcon
                fontSize="medium"
                className="ml-20 text-white opacity-70"
              />
            </div>
            {/* part-1 */}
            {/* part-1 */}
            <div className="h-[5rem] w-[95%] flex flex-row items-center px-4 cursor-pointer bg-[#212121] hover:bg-[rgba(77,77,77,0.5)]">
              <img
                src="https://i.scdn.co/image/ab67616d0000b2731d1cc2e40d533d7bcebf5dae"
                alt="song_img"
                className="h-[4rem] w-[4rem] rounded-md"
              />
              <div className="ml-6 space-y-1">
                <h4 className="text-white text-lg font-bold opacity-90 tracking-wide">
                  295
                </h4>
                <p className="text-[#a6a6a6] text-sm tracking-wide">
                  Sidhu Moose Wala
                </p>
              </div>

              <FavoriteBorderIcon
                fontSize="medium"
                className="ml-20 text-white opacity-70"
              />
            </div>
            {/* part-1 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
