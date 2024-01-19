import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default page;
