/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type OutputCardProps = {
  name: string;
  image: string;
};

const FavouriteCards = ({ name, image }: OutputCardProps) => {
  const Remove = () => {
    console.log("Remove from Favourites");
  };
  return (
    <Card className="w-[250px]">
      {/* <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader> */}
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <img src="/next.svg" alt={name} className="w-20 h-20" />
          <h3 className="text-lg font-bold">{name}</h3>
          {/* <p className="text-sm text-muted-foreground">{url}</p> */}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={Remove}>
          <Trash2 className="mr-2 h-4 w-4" /> Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FavouriteCards;
