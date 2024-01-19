import express, { Request, Response } from 'express';
import Parser from './parsing';
import { Event } from './interfaces';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/getData', async (req: Request, res: Response) => {
    // Handle the POST request here
    const data: {
        url: string;
    } = req.body;
    // const parser = new Parser('https://www.espn.in/football/schedule/_/league/afc.asian.cup');
    const parser = new Parser(data.url);
    try {
        const events: Event[] = await parser.getEvents();
        res.send({
            events,
        });

    }
    catch (error) {
        res.send({
            links: [],
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
