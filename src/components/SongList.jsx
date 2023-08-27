import { useDataLayerValue } from "../DataLayer";

const SongList = () => {
  const [{ showSidebar }] = useDataLayerValue();
  return (
    <div className="max-h-[80%] w-[98%] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent transition-all duration-300">
      <div
        className="h-[20rem] w-full rounded-t-lg relative"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(245,247,250,0.83) 10%, rgba(195,207,226,0.64) 100%)",
        }}
      >
        <div className="absolute w-full bottom-0 flex flex-row p-4 space-x-6 text-white items-center lg:p-8">
          <img
            src="https://i.scdn.co/image/ab67616d0000b2731a8c4618eda885a406958dd0"
            alt="play_song"
            className={`h-[10rem] rounded-md shadow-2xl ${
              showSidebar ? "lg:h-[12rem]" : "md:h-[12rem] lg:h-[14rem]"
            } `}
          />
          <div className="flex flex-col space-y-4">
            <p className="text-sm font-bold text-white">Album</p>
            <h2
              className={`text-[2rem] font-extrabold tracking-wide ${
                showSidebar
                  ? "md:text-[3rem] lg:text-[4rem]"
                  : "sm:text-[3rem] md:text-[4rem] lg:text-[5rem]"
              }`}
            >
              Still Rollin
            </h2>
            <div className="flex flex-row space-x-4 items-center">
              <div className="flex flex-row items-center space-x-2">
                <img
                  src="https://i.scdn.co/image/ab67616d0000b2731a8c4618eda885a406958dd0"
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
                <p className="text-sm font-bold md:text-base">Shubh</p>
              </div>
              <span className="text-sm font-bold md:text-base">2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongList;
