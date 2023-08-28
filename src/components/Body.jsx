import { useState } from "react";
import Home from "./Home";
import { useDataLayerValue } from "../DataLayer";
import Message from "./UI/Message";
import Search from "./Search";
import SongList from "./SongList";

const Body = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [
    { showMessage, user, showSidebar, homePage, SearchPage, showListPage },
    dispatch,
  ] = useDataLayerValue();

  const logOutHandler = () => {
    dispatch({
      type: "SHOW_MESSAGE",
      showMessage: {
        isShow: true,
        message: "Logging Out",
      },
    });
    setTimeout(() => {
      dispatch({
        type: "SHOW_MESSAGE",
        showMessage: {
          isShow: false,
          message: null,
        },
      });
      dispatch({
        type: "LOGOUT",
      });
    }, 1000);
  };

  return (
    <>
      {showMessage.isShow && <Message message={showMessage.message} />}
      <div
        className={`h-[98%] ${
          showSidebar
            ? "hidden md:inline-block md:w-[50%] lg:w-[70%]"
            : "w-[96%]"
        }  rounded-md mt-3 relative`}
        style={{
          backgroundImage: "linear-gradient(180deg, #2c2a2a 10%, #000000 100%)",
        }}
      >
        <div
          className={`absolute top-2 right-4  mb-2 flex flex-row space-x-4 items-center z-[1000] ${
            showSidebar ? "hidden sm:flex" : ""
          } `}
        >
          <p className="hidden sm:flex text-xs text-black bg-white px-4 py-2 shadow-lg rounded-full cursor-pointer font-bold">
            Explore Premium
          </p>
          <div
            className="h-10 w-10 bg-black rounded-full flex justify-center items-center shadow-lg"
            onClick={() => setShowLogout((prevState) => !prevState)}
          >
            <img
              className="h-8 w-8 rounded-full cursor-pointer"
              src={`${!user ? "" : user.images[0].url}`}
              alt="Profile_pic"
            />
          </div>
          <div
            className={`absolute top-11 right-[-0.6rem] px-4 py-2 text-white bg-green-600 rounded-md text-sm z-[1000] shadow-lg font-bold cursor-pointer ${
              showLogout ? "inline-block" : "hidden"
            }`}
          >
            <p onClick={logOutHandler}>Log Out</p>
          </div>
        </div>
        {homePage && <Home />}
        {SearchPage && <Search />}
        {showListPage.isOpen && <SongList />}
      </div>
    </>
  );
};

export default Body;
