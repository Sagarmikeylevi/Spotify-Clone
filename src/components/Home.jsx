import React from "react";
import Sponsor from "./Sponsor";
import CardSectionOne from "./CardSectionOne";
import { useDataLayerValue } from "../DataLayer";

const Home = () => {
  const [{ playlistCards }] = useDataLayerValue();

  return (
    <div className="mt-8 max-h-[80%] w-[98%] rounded-md px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300">
      <Sponsor />

      {playlistCards.length > 1 && (
        <>
          <CardSectionOne
            isArtist={false}
            HeadingIcon="https://cdn-icons-png.flaticon.com/128/891/891010.png"
            index="0"
          />
          <CardSectionOne
            isArtist={true}
            HeadingIcon="https://cdn-icons-png.flaticon.com/128/9960/9960557.png"
            index="-1"
          />
          <CardSectionOne
            isArtist={false}
            HeadingIcon="https://cdn-icons-png.flaticon.com/128/3529/3529417.png"
            index="1"
          />
        </>
      )}
    </div>
  );
};

export default Home;
