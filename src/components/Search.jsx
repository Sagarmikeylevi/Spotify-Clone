import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDataLayerValue } from "../DataLayer";
import { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

const Search = () => {
  const [{ showSidebar }] = useDataLayerValue();
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [allResults, setAllResults] = useState(null);

  const searchItems = async (name) => {
    // Use the .search() method to search for tracks
    const searchResults = await spotify.search(name, ["track"], {
      limit: 4,
    });

    // Extract the list of track results
    const tracks = searchResults.tracks.items;

    setAllResults(tracks);

    const trackItem = {
      title: tracks[0].name,
      imgURL: tracks[0].album.images[0].url,
      artist: tracks[0].artists[0].name,
    };

    setResult(trackItem);
    console.log("TRACKS ---> ", tracks);
  };

  const searchHandler = (event) => {
    if (event.target.value.trim().length === 0) {
      setShowResult(false);
    } else {
      searchItems(event.target.value.trim());
      setShowResult(true);
    }
  };

  // if (allResults) {
  //   allResults.map((track) => console.log(track));
  // }

  return (
    <div className="mt-4 px-4 max-h-[80%] w-[98%] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300">
      <div className="w-[20rem] bg-[rgba(86,86,86,0.36)] rounded-full px-3 text-sm py-3 flex flex-row items-center space-x-1 cursor-pointer hover:border-[1px] hover:border-[rgba(255,255,255,0.71)]  transition-all duration-300">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          className="w-[16rem] bg-transparent text-white outline-none font-bold placeholder:text-gray-400 placeholder:tracking-wide"
          placeholder="What do you want to listen to?"
          onChange={searchHandler}
        />
      </div>

      {showResult && (
        <div
          className={`mt-8 flex flex-row gap-10 mb-8 ${
            showSidebar ? "" : "lg:justify-center"
          }`}
        >
          <div className="flex flex-col">
            <h2 className="text-white text-xl font-bold mb-4">Top Result</h2>
            <div className="group h-[18rem] w-[23rem] flex flex-col justify-evenly bg-[rgba(77,77,77,0.3)] rounded-md cursor-pointer hover:bg-[rgba(77,77,77,0.5)] transition-all duration-200 px-8 py-6 relative">
              <div className="hidden absolute top-[70%] left-[80%] h-14 w-14 rounded-full text-black z-[999] bg-green-400 group-hover:flex justify-center items-center shadow-lg transition-all duration-200">
                <PlayArrowIcon fontSize="large" />
              </div>
              <img
                src={result ? result.imgURL : ""}
                alt="song_img"
                className="h-[8rem] w-[8rem] rounded-md"
              />
              <p className="text-white text-2xl font-bold opacity-90 tracking-wide">
                {result ? result.title : ""}
              </p>
              <div className="flex flex-row items-center">
                <p className="text-[#a6a6a6] text-sm tracking-wide">
                  {result ? result.artist : ""}
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
              {allResults &&
                allResults.map((track) => (
                  <div
                    className="group h-[5rem] w-[95%]  flex flex-row items-center px-4 cursor-pointer bg-[#212121]  hover:bg-[rgba(77,77,77,0.5)] relative"
                    key={track.id}
                  >
                    <img
                      src={track.album.images[0].url}
                      alt="song_img"
                      className="h-[4rem] w-[4rem] rounded-md group-hover:opacity-60"
                    />
                    <div className="ml-6 space-y-1">
                      <h4 className="text-white text-lg font-bold opacity-90 tracking-wide">
                        {track.name.length > 15
                          ? track.name.slice(0, 15) + "..."
                          : track.name}
                      </h4>
                      <p className="text-[#a6a6a6] text-sm tracking-wide">
                        {track.artists[0].name}
                      </p>
                    </div>

                    <div className="hidden group-hover:inline-block absolute top-[50%] translate-y-[-50%] left-[8%]">
                      <PlayArrowIcon fontSize="large" className="text-white" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
