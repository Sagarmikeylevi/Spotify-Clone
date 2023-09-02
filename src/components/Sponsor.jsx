// Importing the useDataLayerValue hook from the DataLayer module
import { useDataLayerValue } from "../DataLayer";

// Define the Sponsor component
const Sponsor = () => {
  // Destructure the state and dispatch function from the DataLayer context
  const [{ showSidebar, sponsoredPlaylist }, dispatch] = useDataLayerValue();

  // Handler for the "Play" button click
  const playHandler = () => {
    // Dispatch an action to open the showlist with playlist details
    dispatch({
      type: "OPEN_SHOWLIST",
      heading: {
        title: sponsoredPlaylist.title,
        imgURL: sponsoredPlaylist.imgURL,
        owner: sponsoredPlaylist.owner,
        ownerIMG: sponsoredPlaylist.ownerIMG,
        type: sponsoredPlaylist.type,
        other: sponsoredPlaylist.other,
      },
      items: sponsoredPlaylist.items,
      isArtist: false,
    });
  };

  // Render the Sponsor component
  return (
    <div
      className={`h-56 w-full rounded-md text-white relative shadow-lg  ${
        showSidebar ? "md:h-[17rem] lg:h-[15rem] xl:h-56" : "lg:h-60"
      }`}
      style={{
        // Set the background image using linear gradient
        backgroundImage:
          "linear-gradient(135deg, rgba(24,18,39,0.7) 10%, rgba(51,30,64,0.6) 100%)",
      }}
    >
      <p
        className={`absolute top-2 right-2 text-xs px-4 py-2 bg-black rounded-md font-bold shadow-lg ${
          showSidebar ? "hidden sm:flex" : "lg:text-base"
        } `}
      >
        Sponsored
      </p>
      <div className="flex flex-row h-[100%] items-center">
        <img
          src={sponsoredPlaylist.imgURL}
          alt="sponsored_img"
          className={`ml-4 h-[70%] w-40 rounded-sm ${
            showSidebar
              ? "hidden lg:flex lg:h-[80%] lg:w-52"
              : "md:h-[80%] md:w-52  lg:h-[90%] lg:w-60"
          } `}
        />

        <div className="h-[80%]">
          <p
            className={`ml-8 text-xs font-bold ${
              showSidebar ? "hidden sm:flex" : "lg:text-base"
            } `}
          >
            PLAYLIST
          </p>
          <h2
            className={`mt-8 ml-6 text-lg font-bold text-[#f2f2f2] leading-10 ${
              showSidebar
                ? "hidden sm:flex md:text-[2rem] lg:text-[2.5rem] md:mt-4 lg:mt-6"
                : "md:text-[2.5rem]  sm:text-[2rem]  lg:text-[3rem]"
            } `}
          >
            {sponsoredPlaylist.title}
          </h2>
          <p
            className={`mt-2 text-sm text-[#b3b3b3] ml-4 ${
              showSidebar
                ? "hidden sm:flex lg:text-lg lg:ml-6 md:text-base md:ml-[1.6rem]"
                : "md:text-lg md:ml-6 sm:text-base sm:ml-[1.6rem] lg:text-xl"
            }`}
          >
            Listen to the hottest anime songs
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-6 ${
          showSidebar
            ? "flex flex-col gap-2 left-0 sm:left-[20%] sm:flex-row sm:space-x-4 md:left-[45%] md:inline-block lg:bottom-4"
            : "left-[50%] space-x-8 sm:bottom-4 sm:left-[45%] lg:left-[40%]"
        } `}
      >
        <button
          className={`text-sm px-4 py-2 bg-green-500 rounded-full text-black font-bold hover:bg-white transition-all duration-200 ${
            showSidebar
              ? "lg:text-base lg:px-6"
              : "md:text-base md:px-6 lg:text-lg lg:px-8"
          } `}
          onClick={playHandler}
        >
          Play
        </button>
        <button
          className={`text-sm px-4 py-2 border-2 border-gray-400 rounded-full text-white font-bold hover:bg-white hover:text-black hover:border-none transition-all duration-200 ${
            showSidebar
              ? "lg:text-base lg:px-6"
              : "md:text-base md:px-6 lg:text-lg lg:px-8"
          } `}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

// Export the Sponsor component
export default Sponsor;
