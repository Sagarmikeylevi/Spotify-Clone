import Sponsor from "./Sponsor";
import CardSectionOne from "./CardSectionOne";

const Home = () => {
  return (
    <div className="mt-8 max-h-[80%] w-[98%] rounded-md px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300">
      <Sponsor />
      <CardSectionOne
        isArtist={false}
        HeadingIcon="https://cdn-icons-png.flaticon.com/128/891/891010.png"
      />
      <CardSectionOne
        isArtist={true}
        HeadingIcon="https://cdn-icons-png.flaticon.com/128/9960/9960557.png"
      />
    </div>
  );
};

export default Home;
