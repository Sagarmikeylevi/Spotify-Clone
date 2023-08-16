import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
import "./custom-scrollbar.css";

const Player = () => {
  return (
    <div className="h-screen flex flex-row bg-[#0d0d0d] relative">
      <Sidebar />
      <Body />
      <Footer />
    </div>
  );
};

export default Player;
