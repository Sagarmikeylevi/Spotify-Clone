import { useDataLayerValue } from "../DataLayer";
import Card from "./Card";

const CardSectionOne = ({ isArtist, HeadingIcon, index }) => {
  const [{ playlistCards, suggestedArtist }] = useDataLayerValue();
  return (
    <div
      className={`mt-8 ${
        isArtist ? "h-[22rem] " : "h-[24rem]"
      } text-white py-2 px-4 mb-4`}
    >
      <div className="flex flex-row items-center space-x-1">
        <h3 className="text-xl font-bold tracking-wide">
          {isArtist
            ? "Suggested artists"
            : playlistCards.length > 0
            ? playlistCards[index].heading
            : ""}
        </h3>
        <img
          className={`h-6 w-6 ${isArtist ? "mt-2" : "mt-1"}`}
          src={HeadingIcon}
          alt="heading_icons"
        />
      </div>

      <div
        className={
          "mt-2 h-[85%] grid grid-flow-col place-items-center gap-10 overflow-x-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full cursor-pointer transition-all duration-300"
        }
      >
        {!isArtist &&
          playlistCards.length > 0 &&
          playlistCards[index].items.map((playlist) => (
            <Card
              key={playlist.id}
              imgURL={playlist.images[0].url}
              title={playlist.name}
              description={playlist.description}
              isArtist={false}
            />
          ))}
        {isArtist &&
          suggestedArtist.length > 0 &&
          suggestedArtist.map((artist) => (
            <Card
              key={artist.id}
              imgURL={artist.imgURL}
              title={artist.name}
              description="Artist"
              isArtist={true}
            />
          ))}
      </div>
    </div>
  );
};

export default CardSectionOne;
