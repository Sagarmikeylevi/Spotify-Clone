import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Card = ({ imgURL, title, description, isArtist }) => {
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
          {title.length > 15 ? title.slice(0, 15) + "..." : title}
        </h4>
        <p className="text-sm text-gray-400 font-thin tracking-wide">
          {description.length > 30
            ? description.slice(0, 30) + "..."
            : description}
        </p>
      </div>

      <div className="hidden absolute top-[45%] left-[65%] h-12 w-12 rounded-full text-black z-[999] bg-green-400 group-hover:flex justify-center items-center shadow-lg transition-all duration-200">
        <PlayArrowIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Card;
