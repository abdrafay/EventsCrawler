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

type Team = {
  leagueName: string;
  name: string;
  url: string;
  image: string;
};

type League = {
  name: string;
  url: string;
};

const Page = () => {
  // const [url, setUrl] = useState("");
  // const [data, setData] = useState([]);
  const [sports, setSports] = useState(""); // Football
  const [leaguesData, setLeaguesData] = useState<League[]>([]); // [Laliga, Premier League]
  const [leagues, setLeagues] = useState(""); // Laliga
  const [teams, setTeams] = useState<Team[]>([]); // [Real Madrid, Barcelona]

  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [teamSearchQuery, setTeamSearchQuery] = useState(""); 

  // const crawlUrl = () => {
  //   console.log("crawlUrl");
  // };

  useEffect(() => {
    
    const fetchData = async () => {
      setLoadingLeagues(true);
      try {
        const res = await axios.post("http://localhost:5000/api/get-leagues",  {
          url: "https://www.espn.in",
        topic: sports,
        });
        console.log(res.data, 'res.data')
        setLeaguesData(res.data.leagues);
        setLoadingLeagues(false);
      } catch (err) {
        console.log(err);
      }
    };
    if(sports) fetchData();
  }, [sports]);

  useEffect(() => {
    // find url of league from leaguesData
    
    const fetchData = async () => {
      const url = leaguesData.find((item) => item.name === leagues)?.url;
      setLoadingLeagues(true);
      try {
        const res = await axios.post("http://localhost:5000/api/get-teams",  {
          league: {
            name: leagues,
            url: url,
          },
          url: "https://www.espn.in",
          topic: sports,
        });
        setTeams(res.data.teams);
        setLoadingLeagues(false);
      } catch (err) {
        console.log(err);
      }
    };
    if(leagues) fetchData();
  },[leagues])

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full space-y-4 p-5">
      {/* <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Enter url" className="w-full" />
        <Search size={22} />
      </div> */}
      {/* Output */}
      <div className="flex flex-col space-y-2">
        <Select value={sports} onValueChange={setSports}>
            <SelectTrigger className="w-[180px] ml-auto">
              <SelectValue placeholder="Select a Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sports</SelectLabel>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem disabled value="cricket">Cricket</SelectItem>
                <SelectItem disabled value="nba">NBA</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        
          {loadingLeagues && <div>Loading...</div>}
          {/* {leagues.length === 0 ? null : ( */}
            <Select value={leagues} onValueChange={setLeagues}>
              <SelectTrigger className="w-[230px] ml-auto">
                <SelectValue placeholder="Select a league" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a league</SelectLabel>
                  {leaguesData.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          {/* )} */}
        
      </div>
      <div className="flex w-full max-w-sm items-center justify-start space-x-2 ml-auto">
        <Input type="search" placeholder="Search Team" className="w-full"  value={teamSearchQuery}
          onChange={(e) => setTeamSearchQuery(e.target.value)} />
        <Search size={18} />
      </div>
      {loadingTeams && <div>Loading...</div>}
      <div className="flex flex-wrap flex-row justify-center gap-4 ">
      {filteredTeams.length === 0 ? (
          <div>No teams found</div>
        ) : (
          filteredTeams.map((item) => {
            const firstLetters =
              item.name.split(/\s+/).length > 1
                ? item.name
                    .split(/\s+/)
                    .map((word) => word[0])
                    .join("")
                : item.name.slice(0, 2).toUpperCase();
            return (
              <OutputCard
                url={item.url}
                key={item.name}
                name={item.name}
                image={firstLetters}
                topic={sports}
                mainUrl="https://www.espn.in"
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Page;
