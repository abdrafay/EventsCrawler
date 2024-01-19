import { Button } from "@/components/ui/button";
import { UserButton, auth, currentUser } from "@clerk/nextjs";
import { ArrowRight, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  const { userId } = auth();
  console.log(userId);
  return (
    <div className="flex items-center ml-auto">
      {!user ? (
        <div className="flex gap-x-2 items-center mr-4">
          <Link href="/Sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/Dashboard">
            <Button>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-x-2 items-center mr-4">
          <Link href="/Dashboard">
            <Button>
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
}
