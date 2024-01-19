import express, { Request, Response } from "express";
import Parser from "./parsing";
import { Event, League } from "./interfaces";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

// app.get('/api/getData', async (req: Request, res: Response) => {
//     // Handle the POST request here
//     const data: {
//         url: string;
//     } = req.body;
//     // const parser = new Parser('https://www.espn.in/football/schedule/_/league/afc.asian.cup');
//     const parser = new Parser(data.url);
//     try {
//         const events: Event[] = await parser.getEvents();
//         res.send({
//             events,
//         });

//     }
//     catch (error) {
//         res.send({
//             links: [],
//         });
//     }
// });

app.get("/api/get-leagues", async (req: Request, res: Response) => {
  const data: {
    url: string;
    topic: string;
  } = req.body;
  console.log(req.body, "req.body");

  console.log(data, "data");
  const parser = new Parser(data.url, data.topic);
  try {
    const leagues = await parser.getLeagues();
    res.send({
      leagues,
    });
  } catch (error) {
    res.send({
      leagues: [],
    });
  }
});

app.get("/api/get-teams", async (req: Request, res: Response) => {
  const data: {
    league: League;
    url: string;
    topic: string;
  } = req.body;
  const parser = new Parser(data.url, data.topic);
  try {
    const teams = await parser.getTeams(data.league);
    res.send({
      teams,
    });
  } catch (error) {
    res.send({
      teams: [],
    });
  }
});

app.get('/api/get-team-events', async (req: Request, res: Response) => {
    const data: {
        url: string;
        topic: string;
        teamUrl: string;
    } = req.body;
    const parser = new Parser(data.url, data.topic);
    try {
        const events = await parser.getEventsBasedOnTeam(data.teamUrl);
        res.send({
            events,
        });
    } catch (error) {
        res.send({
            events: [],
        });
    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
