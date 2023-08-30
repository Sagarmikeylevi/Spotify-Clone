import { useDataLayerValue } from "../DataLayer";

const Playlist = ({ playlist }) => {
  const [{}, dispatch] = useDataLayerValue();
  const showPlaylistHandler = () => {
    dispatch({
      type: "OPEN_SHOWLIST",
      heading: {
        title: playlist.title,
        imgURL: playlist.imgURL,
        owner: playlist.owner,
        ownerIMG: playlist.ownerIMG,
        type: playlist.type,
        other: playlist.other,
      },
      items: playlist.items,
    });
  };

  return (
    <div
      className="flex flex-row p-2 rounded-md hover:bg-[rgba(217,217,217,0.1)] cursor-pointer transition-all duration-200"
      onClick={showPlaylistHandler}
    >
      <img
        className="h-16 w-16 rounded-md shadow-2xl mr-4"
        src={playlist.imgURL}
        alt="play_list"
      />

      <div className="flex flex-col justify-center">
        <p className="tracking-wide font-semibold text-[#d9d9d9]">
          {playlist.title.length > 20
            ? playlist.title.slice(0, 20) + "..."
            : playlist.title}
        </p>
        <p className="text-sm text-[#bfbfbf]">
          Playlist <span className="ml-1 text-xl font-bold">.</span>{" "}
          <span className="ml-1">{playlist.owner}</span>
        </p>
      </div>
    </div>
  );
};

export default Playlist;
