import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

const Player = () => {
  return (
    <div className="h-[98%] w-[98%] flex flex-row bg-[#0d0d0d] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-md">
      <Sidebar />
      <Body />
      <Footer />
    </div>
  );
};

export default Player;
