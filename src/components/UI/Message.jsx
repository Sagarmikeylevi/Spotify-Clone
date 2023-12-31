const Message = ({ message }) => {
  return (
    <div className="absolute top-[75%] left-[50%] translate-x-[-50%] text-white bg-green-700 rounded-md px-4 py-2 z-[1000]">
      <p>{message}</p>
    </div>
  );
};

export default Message;
