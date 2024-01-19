"use client";
import OutputCard from "@/components/Dashboard/OutputCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { request } from "http";

type teams = {
  name: string;
  image: string;
};

type leagues = {
  name: string;
};

const Page = () => {
  // const [url, setUrl] = useState("");
  // const [data, setData] = useState([]);
  const [sports, setSports] = useState(""); // Football
  const [leaguesData, setLeaguesData] = useState<leagues[]>([]); // [Laliga, Premier League]
  const [leagues, setLeagues] = useState(""); // Laliga
  const [teams, setTeams] = useState<teams[]>([]); // [Real Madrid, Barcelona]

  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);

  // const crawlUrl = () => {
  //   console.log("crawlUrl");
  // };

  useEffect(() => {
    setLoadingLeagues(true);
    let data = {
      url: "https://www.espn.in",
      topic: "football",
    };
    const res = axios
      .get("http://localhost:5000/api/get-leagues", data)
      .then((res) => {
        setLeaguesData(res.data);
        setLoadingLeagues(false);
      });
  }, [sports]);

  return (
    <div className="flex flex-col w-full space-y-4 p-5">
      {/* <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Enter url" className="w-full" />
        <Search size={22} />
      </div> */}
      {/* Output */}
      <div className="flex flex-col space-y-2">
        <div>
          <Select value={sports} onValueChange={setSports}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sports</SelectLabel>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="cricket">Cricket</SelectItem>
                <SelectItem value="nba">NBA</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          {loadingLeagues && <div>Loading...</div>}
          {leagues.length === 0 ? null : (
            <Select value={leagues} onValueChange={setLeagues}>
              <SelectTrigger className="w-[230px]">
                <SelectValue placeholder="Select a league" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a league</SelectLabel>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="nba">NBA</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="flex w-full max-w-sm items-center justify-start space-x-2">
        <Input type="search" placeholder="Search Team" className="w-full" />
        <Search size={18} />
      </div>
      {loadingTeams && <div>Loading...</div>}
      <div className="flex flex-wrap flex-row justify-center gap-4 ">
        {teams.length === 0
          ? null
          : teams.map((item) => (
              <OutputCard key={item.name} name={item.name} image={item.image} />
            ))}
      </div>
    </div>
  );
};

export default Page;
