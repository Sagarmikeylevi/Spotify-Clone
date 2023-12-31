import { useDataLayerValue } from "../DataLayer";
import Card from "./Card";

// CardSectionOne component takes props: isArtist, HeadingIcon, index
const CardSectionOne = ({ isArtist, HeadingIcon, index }) => {
  // Get the data from the DataLayer using useDataLayerValue hook
  const [{ playlistCards, suggestedArtist }] = useDataLayerValue();

  // Determine the section title and height based on the isArtist prop
  const sectionTitle = isArtist
    ? "Suggested artists"
    : playlistCards[index].heading;
  const sectionHeight = isArtist ? "h-[22rem]" : "h-[24rem]";

  // Function to render a list of cards based on the items and isArtist flag
  const renderCards = (items, isArtist) =>
    items.map((item) => (
      <Card
        key={item.id}
        itemId={item.id}
        imgURL={isArtist ? item.imgURL : item.images[0].url}
        title={item.name}
        description={isArtist ? "Artist" : item.description}
        isArtist={isArtist}
      />
    ));

  return (
    <div className={`mt-8 ${sectionHeight} text-white py-2 px-4 mb-4`}>
      <div className="flex flex-row items-center space-x-1">
        <h3 className="text-xl font-bold tracking-wide">{sectionTitle}</h3>
        <img
          className={`h-6 w-6 ${isArtist ? "mt-2" : "mt-1"}`}
          src={HeadingIcon}
          alt="heading_icons"
        />
      </div>

      <div
        className={
          // Styling for the card container with scrollbar
          "mt-2 h-[85%] grid grid-flow-col place-items-center gap-10 overflow-x-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full cursor-pointer transition-all duration-300"
        }
      >
        {!isArtist && renderCards(playlistCards[index].items, false)}
        {isArtist && renderCards(suggestedArtist, true)}
      </div>
    </div>
  );
};

export default CardSectionOne;
