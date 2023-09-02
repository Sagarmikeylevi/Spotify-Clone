// Import necessary modules and components
import SpotifyWebApi from "spotify-web-api-js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDataLayerValue } from "../DataLayer";

// Initialize the Spotify Web API instance
const spotify = new SpotifyWebApi();

// Define a functional component called "Card" that takes props
const Card = ({ itemId, imgURL, title, description, isArtist }) => {
  // Destructure the DataLayer value and dispatch function
  const [{}, dispatch] = useDataLayerValue();

  // Function to fetch playlist details by playlist ID
  const getPlaylistById = async (itemId) => {
    try {
      // Fetch playlist details
      const itemDetails = await spotify.getPlaylist(itemId);
      console.log("Item Details:", itemDetails);

      // Fetch owner details
      const owner = await spotify.getUser(itemDetails.owner.id);

      // Dispatch an action to update the DataLayer state
      dispatch({
        type: "OPEN_SHOWLIST",
        heading: {
          title: title,
          imgURL: imgURL,
          owner: owner.display_name,
          ownerIMG: owner.images[0].url,
          type: "Playlist",
          other: itemDetails.tracks.total,
        },
        items: itemDetails.tracks.items,
        isArtist: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to fetch artist details by artist ID
  const getArtistById = async (artistId) => {
    try {
      // Fetch artist details
      const artistDetails = await spotify.getArtist(artistId);

      // Fetch artist's albums
      const artistAlbums = await spotify.getArtistAlbums(artistId);

      // Dispatch an action to update the DataLayer state for artist view
      dispatch({
        type: "OPEN_SHOWLIST",
        heading: {
          title: artistDetails.name,
          imgURL: artistDetails.images[0].url,
        },
        items: artistAlbums.items,
        isArtist: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle click event for showing playlist or artist details
  const showPlaylistHandler = () => {
    if (isArtist) {
      // If it's an artist, fetch artist details
      getArtistById(itemId);
    } else {
      // Otherwise, fetch playlist details
      getPlaylistById(itemId);
    }
  };

  // Render the card component
  return (
    <div
      className={`group ${
        isArtist
          ? " h-[16rem] w-[12rem] px-[1rem] py-[1rem]"
          : "h-[18rem] w-[14rem]"
      }  rounded-md bg-[rgba(41,40,40,0.42)] shadow-lg hover:bg-[rgba(75,73,73,0.42)] cursor-pointer transition-all duration-200 p-4 relative`}
    >
      <img
        className={`${
          isArtist
            ? "h-[10rem] w-[10rem] rounded-full"
            : "h-[11rem] w-[11rem] ml-[0.5rem] rounded-md"
        }`}
        src={imgURL}
        alt="card_img"
      />

      <div
        className={`mt-2 px-2 flex flex-col ${isArtist ? "gap-1" : "gap-2"}`}
      >
        <h4 className="text-lg font-bold ">
          {/* Truncate long titles */}
          {title.length > 15 ? title.slice(0, 15) + "..." : title}
        </h4>
        <p className="text-sm text-gray-400 font-thin tracking-wide">
          {/* Truncate long descriptions */}
          {description.length > 30
            ? description.slice(0, 30) + "..."
            : description}
        </p>
      </div>

      {/* Play button icon for showing playlist or artist details */}
      <div
        className="hidden absolute top-[45%] left-[65%] h-12 w-12 rounded-full text-black z-[999] bg-green-400 group-hover:flex justify-center items-center shadow-lg transition-all duration-200"
        onClick={showPlaylistHandler}
      >
        <PlayArrowIcon fontSize="large" />
      </div>
    </div>
  );
};

// Export the Card component as the default export
export default Card;
