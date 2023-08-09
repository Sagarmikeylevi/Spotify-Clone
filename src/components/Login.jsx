import { accessUrl } from "../Spotify";

const Login = () => {
  return (
    <div className="flex flex-col h-screen justify-evenly items-center bg-[#3fca70]">
      <img
        className="w-[80%] md:w-[75%] lg:w-[60%]"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify-logo"
      />

      <a
        href={accessUrl}
        className="uppercase bg-black text-white text-sm py-4 px-8 lg:text-base lg:py-5 lg:px-10 rounded-full font-medium tracking-wider transition-all duration-200 hover:translate-y-[-3px] hover:shadow-2xl  active:translate-y-[-1px] active:shadow-xl"
      >
        Connect to spotify
      </a>
    </div>
  );
};

export default Login;
