import { useDataLayerValue } from "../DataLayer";

const SidebarOption = ({ title, Icon }) => {
  const [{}, dispatch] = useDataLayerValue();
  const pageHandler = () => {
    if (title === "Home") {
      dispatch({
        type: "OPEN_HOME",
      });
    } else {
      dispatch({
        type: "OPEN_SEARCH",
      });
    }
  };
  return (
    <div
      className="flex flex-row items-center text-[#bfbfbf] text-base font-semibold tracking-wide cursor-pointer hover:text-white transition-all duration-200"
      onClick={pageHandler}
    >
      <Icon style={{ fontSize: 32 }} className="mr-4" />
      <p>{title}</p>
    </div>
  );
};

export default SidebarOption;
