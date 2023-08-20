import { useDataLayerValue } from "../DataLayer";
import Card from "./Card";

const CardSectionOne = () => {
  const [{ playlistCards }] = useDataLayerValue();

  return (
    <div className="mt-8 h-[24rem] text-white py-2 px-4 mb-4">
      <div className="flex flex-row items-center space-x-1">
        <h3 className="text-xl font-bold tracking-wide">
          {playlistCards.length > 0 ? playlistCards[0].heading : ""}
        </h3>
        <img
          className="h-6 w-6"
          src="https://cdn-icons-png.flaticon.com/128/891/891010.png"
          alt="heading_icons"
        />
      </div>

      <div
        className={
          "mt-2 h-[85%] grid grid-flow-col place-items-center gap-10 overflow-x-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full cursor-pointer transition-all duration-300"
        }
      >
        {/* {playlistCards.length == 0 && "Sadi gang kadi fly"} */}
        {playlistCards.length > 0 &&
          playlistCards[0].items.map((playlist) => (
            <Card
              key={playlist.id} // Add a unique key for each Card component
              imgURL={playlist.images[0].url}
              title={playlist.name}
              description={playlist.description}
            />
          ))}
      </div>
    </div>
  );
};

export default CardSectionOne;
