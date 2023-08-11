const SidebarOption = ({ title, Icon }) => {
  return (
    <div className="flex flex-row items-center text-[#bfbfbf] text-base font-semibold tracking-wide cursor-pointer hover:text-white transition-all duration-200">
      <Icon style={{ fontSize: 32 }} className="mr-4" />
      <p>{title}</p>
    </div>
  );
};

export default SidebarOption;
