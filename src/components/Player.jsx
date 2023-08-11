import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

const Player = () => {
  return (
    <div className="h-screen flex flex-row">
      <Sidebar />
      <Body />
      <Footer />
    </div>
  );
};

export default Player;
