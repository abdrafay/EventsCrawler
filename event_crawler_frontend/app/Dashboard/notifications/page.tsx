import NotificationBars from "@/components/Notifications/NotificaitionBars";

const page = () => {
  return (
    <div className="px-5 w-full h-full space-y-2">
      <h3 className="text-2xl font-medium">Notifications</h3>
      <div className="flex flex-col space-y-2 w-full h-full mr-5">
        <NotificationBars />
        <NotificationBars />
        <NotificationBars />
        <NotificationBars />
      </div>
    </div>
  );
};

export default page;
