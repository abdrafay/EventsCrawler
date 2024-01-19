"use client";
import FavouriteCards from "@/components/Favourites/FavouriteCards";
import { useState } from "react";

const Page = () => {
  const [favteams, setFavteams] = useState([
    {
      name: "Syria",
      image: "image",
    },
    {
      name: "Iran",
      image: "image",
    },
    {
      name: "Australia",
      image: "image",
    },
    {
      name: "Japan",
      image: "image",
    },
    {
      name: "Argetina",
      image: "image",
    },
  ]);

  return (
    <div className="flex flex-wrap flex-row justify-center gap-4 ">
      {favteams.length === 0
        ? null
        : favteams.map((item) => (
            <FavouriteCards
              key={item.name}
              name={item.name}
              image={item.image}
            />
          ))}
    </div>
  );
};

export default Page;
