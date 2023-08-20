
import Card from "./Card";

const CardSectionOne = () => {
  return (
    <div className="mt-8 h-[24rem] text-white py-2 px-4 relative mb-4 ">
      <div className="flex flex-row items-center space-x-1">
        <h3 className="text-xl font-thin tracking-wide">Punjabi Pop</h3>
        <img
          className="h-6 w-6"
          src="https://cdn-icons-png.flaticon.com/128/891/891010.png"
          alt="heading_icons"
        />
      </div>

      <Card
        imgURL={
          "https://i.scdn.co/image/ab67706f0000000321bc94b12d8a6f918667e641"
        }
        title={"Punjabi 101"}
        description={"Ultimate 101 Punjabi Hits with AP Dhillon"}
      />
    </div>
  );
};

export default CardSectionOne;
