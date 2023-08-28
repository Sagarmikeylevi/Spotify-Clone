import { useDataLayerValue } from "../DataLayer";

const Playlist = ({ imgURL, title, items, other }) => {
  const [{}, dispatch] = useDataLayerValue();
  const showPlaylistHandler = () => {
    dispatch({
      type: "OPEN_SHOWLIST",
      heading: {
        title,
        imgURL,
      },
      items: items,
    });
  };

  return (
    <div
      className="flex flex-row p-2 rounded-md hover:bg-[rgba(217,217,217,0.1)] cursor-pointer transition-all duration-200"
      onClick={showPlaylistHandler}
    >
      <img
        className="h-16 w-16 rounded-md shadow-2xl mr-4"
        src={imgURL}
        alt="play_list"
      />

      <div className="flex flex-col justify-center">
        <p className="tracking-wide font-semibold text-[#d9d9d9]">
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </p>
        <p className="text-sm text-[#bfbfbf]">
          Playlist <span className="ml-1 text-xl font-bold">.</span>{" "}
          <span className="ml-1">{other}</span>
        </p>
      </div>
    </div>
  );
};

export default Playlist;
