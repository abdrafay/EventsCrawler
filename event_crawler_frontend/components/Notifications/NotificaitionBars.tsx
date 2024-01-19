const NotificationBars = () => {
  return (
    <div className="h-32 p-2 shadow-md bg-white">
      <div className="flex flex-col justify-center items-center h-[80%]">
        <p>location, Time</p>
        <div className="flex flex-row space-x-2 items-center">
          <h3 className="text-2xl font-medium">Team 1</h3>
          <span className="text-xl font-semibold">vs</span>
          <h3 className="text-2xl font-medium">Team 2</h3>
        </div>
      </div>
      <p className="text-xs text-right text-gray-400">3:00am</p>
    </div>
  );
};

export default NotificationBars;
