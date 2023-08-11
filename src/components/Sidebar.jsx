import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import AddIcon from "@mui/icons-material/Add";
import SidebarOption from "./SidebarOption";
import Playlist from "./Playlist";
import { useDataLayerValue } from "../DataLayer";

const Sidebar = () => {
  const [{ playlists }, dispatch] = useDataLayerValue();
  return (
    <div className="h-full min-w-[384px] p-[10px]">
      <div className="bg-[#262626] rounded-md shadow-md mb-2 p-[10px]">
        <img
          className="w-[100px]"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="spotify-logo"
        />
      </div>

      <div className="flex flex-col justify-around h-[22%] bg-[#1a1919] rounded-md shadow-md mb-2 p-[10px]">
        <SidebarOption title={"Home"} Icon={HomeIcon} />
        <SidebarOption title={"Search"} Icon={SearchOutlinedIcon} />
      </div>

      <div className="text-white h-[65%] bg-[#1a1919] rounded-md shadow-md p-[10px]">
        <div className="flex flex-row justify-between mb-4">
          <SidebarOption title={"Your Library"} Icon={WebStoriesIcon} />
          <AddIcon className="mr-2 cursor-pointer" />
        </div>

        <div className="max-h-52 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(217,217,217,0.6)] scrollbar-track-transparent ">
          {playlists.map((playlist) => (
            <Playlist
              key={100}
              imgURL={playlist.imgURL}
              title={playlist.title}
              other={playlist.other}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

//
