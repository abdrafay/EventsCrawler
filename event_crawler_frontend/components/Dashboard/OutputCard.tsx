import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

type OutputCardProps = {
  name: string;
  image: string;
};

const OutputCard = ({ name, image }: OutputCardProps) => {
  const AddtoFavourites = () => {
    console.log("AddtoFavourites");
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
        <Button variant="outline" className="w-full" onClick={AddtoFavourites}>
          <Heart className="mr-2 h-4 w-4" /> Add to Favourite
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OutputCard;
