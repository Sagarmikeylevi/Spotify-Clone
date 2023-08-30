import { useDataLayerValue } from "../DataLayer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

const SongList = ({ heading, items, isArtist }) => {
  const [textLimit, setTextLimit] = useState(10);
  const [{ showSidebar }] = useDataLayerValue();
  const [likedTracks, setLikedTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.track.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const updateTextLimit = () => {
      if (window.innerWidth < 600) {
        setTextLimit(15); // Small screen
      } else if (window.innerWidth < 1024) {
        showSidebar ? setTextLimit(15) : setTextLimit(25); // Medium screen
      } else {
        showSidebar ? setTextLimit(25) : setTextLimit(30); // Large screen
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
        setLikedTracks(likedTrackIds);
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
          {isArtist ? (
            <img
              src={heading.imgURL}
              alt="play_song"
              className={`h-[10rem] rounded-full shadow-2xl ${
                showSidebar ? "lg:h-[14rem]" : "md:h-[12rem] lg:h-[14rem]"
              } `}
            />
          ) : (
            <img
              src={heading.imgURL}
              alt="play_song"
              className={`h-[10rem] rounded-md shadow-2xl ${
                showSidebar ? "lg:h-[12rem]" : "md:h-[12rem] lg:h-[14rem]"
              } `}
            />
          )}

          <div className="flex flex-col space-y-4">
            {isArtist ? (
              <div className="text-base font-bold text-white flex flex-row space-x-1 items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/7641/7641727.png"
                  alt="verified_artist"
                  className="h-8 w-8"
                />
                <p>Verified Artist</p>
              </div>
            ) : (
              <p className="text-sm font-bold text-white">{heading.type}</p>
            )}

            <h2
              className={`text-[2rem] font-extrabold tracking-wide ${
                showSidebar
                  ? "md:text-[3rem] lg:text-[4rem]"
                  : "sm:text-[3rem] md:text-[4rem] lg:text-[5rem]"
              }`}
            >
              {heading.title.length > 15
                ? heading.title.slice(0, 15) + "..."
                : heading.title}
            </h2>

            {isArtist ? (
              <p className="text-lg text-white font-bold">
                <span className="mr-1">12,765,850</span> monthly listeners
              </p>
            ) : (
              <div className="flex flex-row space-x-4 items-center">
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={heading.ownerIMG}
                    alt=""
                    className="h-6 w-6 rounded-full"
                  />
                  <p className="text-sm font-bold md:text-base">
                    {heading.owner}
                  </p>
                </div>
                <span className="text-sm font-bold md:text-base">{`${
                  heading.other + " Songs"
                }`}</span>
              </div>
            )}
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
            value={searchQuery}
            onChange={searchHandler}
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
        {filteredItems.map((item, index) => {
          // Mapping over each item
          const artist = item.track.artists
            .map((artist) => artist.name)
            .join(", ");

          const formattedDuration = convertMsToMmSs(item.track.duration_ms);

          const isLiked = likedTracks.includes(item.track.id);

          return (
            <div
              key={index} // Make sure to provide a unique key for each rendered element
              className="group h-[4rem] w-full flex flex-row space-x-8 px-2 relative hover:bg-[rgba(166,166,166,0.38)]"
            >
              <div className="flex flex-row items-center space-x-4">
                <span className="group-hover:block hidden">
                  <PlayArrowIcon className="text-white" />
                </span>
                <span className="text-base text-[#cccccc] group-hover:hidden transition-all duration-200">
                  {index + 1}
                </span>

                <img
                  src={
                    !item.track.album.images[0]
                      ? "https://wallpapercave.com/wp/P3EtD4C.jpg"
                      : item.track.album.images[0].url
                  }
                  alt=""
                  className="h-[80%]"
                />
                <div className="flex flex-col justify-center space-y-1">
                  <p className="text-sm text-white font-bold">
                    {item.track.name.length > textLimit
                      ? item.track.name.slice(0, textLimit) + "..."
                      : item.track.name}
                  </p>
                  <p className="text-xs text-[#cccccc] font-bold">
                    {artist.length > textLimit
                      ? artist.slice(0, textLimit) + "..."
                      : artist}
                  </p>
                </div>

                <span className="hidden sm:inline-block text-sm text-[#cccccc] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  99,297,375
                </span>

                <span className="text-sm text-[#cccccc] absolute top-[50%] left-[80%] translate-x-[-80%] translate-y-[-50%]">
                  {formattedDuration}
                </span>

                <div
                  className={` ${
                    isLiked ? "inline-block" : "hidden group-hover:inline-block"
                  } transition-all duration-200`}
                >
                  {isLiked ? (
                    <FavoriteIcon className="text-green-500 absolute top-[50%] left-[95%] translate-x-[-95%] translate-y-[-50%] opacity-80 hover:opacity-100" />
                  ) : (
                    <FavoriteBorderIcon className="text-white absolute top-[50%] left-[95%] translate-x-[-95%] translate-y-[-50%] opacity-80 hover:opacity-100" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongList;
