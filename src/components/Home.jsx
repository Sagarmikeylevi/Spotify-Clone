import Sponsor from "./Sponsor";
import CardSectionOne from "./CardSectionOne";

const Home = () => {
  return (
    <div className="mt-8 max-h-[80%] w-[99%] rounded-md px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300 ">
      <Sponsor />
      <CardSectionOne />
    </div>
  );
};

export default Home;
