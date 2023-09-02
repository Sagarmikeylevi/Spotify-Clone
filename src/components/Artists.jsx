import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Define the Artists component
const Artists = () => {
  return (
    <div className="mt-8 h-[22rem] text-white py-2 px-4 mb-4 border-2">
      <div className="flex flex-row items-center space-x-1">
        {/* Title for suggested artists */}
        <h3 className="text-xl font-bold tracking-wide">Suggested artists</h3>
        {/* Icon for the title */}
        <img
          className="h-6 w-6 mt-2"
          src="https://cdn-icons-png.flaticon.com/128/9960/9960557.png"
          alt="heading_icons"
        />
      </div>
      <div
        className={
          // Styling for the container of artist cards
          "mt-2 h-[85%] grid grid-flow-col place-items-center gap-10 overflow-x-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full cursor-pointer transition-all duration-300"
        }
      >
        <div className="group h-[16rem] w-[12rem] rounded-md bg-[rgba(41,40,40,0.42)] px-[1rem] py-[1rem] shadow-lg hover:bg-[rgba(75,73,73,0.42)] cursor-pointer transition-all duration-200 relative">
          {/* Artist image */}
          <img
            className="h-[10rem] w-[10rem] rounded-full "
            src="https://i.scdn.co/image/ab6761610000e5eb3eac18e003a215ce96654ce1"
            alt="card_img"
          />

          <div className="mt-2 px-2 flex flex-col gap-1">
            {/* Artist name */}
            <h4 className="text-lg font-bold ">Shubh</h4>
            {/* Artist description */}
            <p className="text-sm text-gray-400 font-thin tracking-wide">
              Artist
            </p>
          </div>

          {/* Play button that appears on hover */}
          <div className="hidden absolute top-[45%] left-[65%] h-12 w-12 rounded-full text-black z-[999] bg-green-400 group-hover:flex justify-center items-center shadow-lg transition-all duration-200">
            <PlayArrowIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Artists component for use in other parts of your application
export default Artists;
