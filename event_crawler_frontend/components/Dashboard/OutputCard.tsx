/* eslint-disable @next/next/no-img-element */
'use client'

import { useContext } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { DispatchContext, StateContext } from "@/app/Context";

type OutputCardProps = {
  name: string;
  image: string;
  url: string;
  topic: string;
  mainUrl: string;
};

const OutputCard = ({ name, image, url, topic, mainUrl }: OutputCardProps) => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const AddtoFavourites = () => {
    console.log("AddtoFavourites");

    // Extracting the part of the URL after `${mainUrl}/${topic}/`
    const favoriteUrl = url.replace(`${mainUrl}/${topic}/`, "");

    if(appDispatch) {
      appDispatch({
        type: "ADD_TO_FAVORITES",
        payload: {
          name,
          image,
          favoriteUrl,
        },
      });
    }
    // Dispatching an action to add the favorite to the state
    
  };

  console.log(appState, 'appState');
  
  return (
    <Card className="w-[250px]">
      <Link href={`/Dashboard/team/?${url.replace(`${mainUrl}/${topic}/`, "")}`}>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <img src={image ? `https://flagsapi.com/${image.toUpperCase()}/flat/64.png` : ''} alt={name} className="w-20 h-20" />
            <h3 className="text-lg font-bold">{name}</h3>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={AddtoFavourites}>
            <Heart className="mr-2 h-4 w-4" /> Add to Favourite
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default OutputCard;
