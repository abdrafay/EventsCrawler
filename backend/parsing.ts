import axios from 'axios';
import cheerio from 'cheerio';
import { Event, League, Team } from './interfaces';

class Parser {
    // get url in constructor
    constructor(private sourceURL: string, private topic: string) {
        this.sourceURL = sourceURL;
        this.topic = topic;
    }
    private async getHtml(url: string): Promise<string> {
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            console.error(`Error fetching ${url}: ${error}`);
            return '';
        }
    }

    public async getLeagues(): Promise<League[]> {
        try {
            const html = await this.getHtml(`${this.sourceURL}/${this.topic}/teams`);
            const $ = cheerio.load(html);
            const leagues: League[] = [];
            const el = $('.dropdown__select');
            el.find('option').each((i, option) => {
                let name = $(option).text();
                let url = $(option).attr('data-url');
                if (url) {
                    url = `${this.sourceURL}${url}`;
                }
                leagues.push({
                    name,
                    url: url ? url : '',
                });
            });
            return leagues;
        } catch (error) {
            console.error(`Error in getLeagues: ${error}`);
            throw error; // Re-throw the error to indicate failure
        }
    }

    public async getTeams(league: League): Promise<Team[]> {
        // get the leagues
        try {
            // const leagues = await this.getLeagues();
            const teams: Team[] = [];
            const html = await this.getHtml(league.url);
            const $ = cheerio.load(html);
            const el = $('.ContentList__Item');
            el.each((i, item) => {
                let name = $(item).find('h2').text();
                let url = $(item).find('a').eq(0).attr('href');
                let image = $(item).find('a').eq(0).find('img.Image.Logo.Logo__lg').attr('src')
                console.log(image, 'image')
                if (url) {
                    url = `${this.sourceURL}${url}`;
                }

                teams.push({
                    leagueName: league.name,
                    name,
                    url: url ? url : '',
                    image: image ? image : '',
                });
            });
            return teams;
        } catch (error) {
            console.error(`Error in getTeams: ${error}`);
            throw error; // Re-throw the error to indicate failure
        }
    }

    public async getEventsBasedOnTeam(url: string): Promise<Event[]> {
        const html = await this.getHtml(url);
        const $ = cheerio.load(html);
        let events: Event[] = [];

        for (const item of $('.Schedule').find('.Schedule__Game')) {
            let link = $(item).attr('href');
            let team = {
                team1: $(item).find('.Schedule__Competitor').find('.truncate').eq(0).text(),
                team2: $(item).find('.Schedule__Competitor').find('.truncate').eq(1).text()
            };
            let date = $(item).find('.Schedule__Meta').eq(0).find('.Schedule__Meta__Time').eq(0).text();
            let time = $(item).find('.Schedule__Meta').eq(0).find('.Schedule__Meta__Time').eq(1).text();
            let location = '';
            let stadium = '';
            if (link) {
                const res = await this.getHtml(link);
                let $1 = cheerio.load(res);
                stadium = $1('.GameInfo').find('.GameInfo__Location__Name--noImg').text();
                location = $1('.GameInfo').find('.Location__Text').text();
                events.push({
                    date,
                    time,
                    location: location ? location : '',
                    stadium: stadium ? stadium : '',
                    countries: [team.team1, team.team2],
                });
            }
        }
    
        return events;
    }

    public async getEvents(): Promise<Event[]> {
        const html = await this.getHtml(this.sourceURL);
        const $ = cheerio.load(html);
        let res = {
            EventName: '',
            events: []
        }

        const events: Event[] = [];
        const el = $('.page-container');
        res.EventName = el.find('.headline__h1.dib').text();
        el.find('.ResponsiveTable').each((i, table) => {
            let date = $(table).find('.Table__Title').text();
            let header = $(table).find('thead th')
            let column = ''
            header.each((i, th) => {
                let text = $(th).find('div').text()
                if (text.toLowerCase().includes('time')) {
                    column = 'TIME'
                } else if (text.toLowerCase().includes('result')) {
                    column = 'RESULT'
                }
            })

            let rows = $(table).find('.Table__TBODY td')
            let matchTeams1 = rows.eq(0).find('.matchTeams')
            let matchTeams2 = rows.eq(1).find('.Table__Team').find('a').eq(1)
            let time = ''
            if(column === 'TIME') {
                time = $(rows).eq(2).find('a').text()
            }
            let location = rows.eq(4).find('div').text()
            let stadium = ''
            events.push({
                date,
                time,
                location,
                stadium,
                countries: [matchTeams1.text(), matchTeams2.text()]
            })
        })
        return events;
    }

}
export default Parser;


const parser = new Parser('https://www.espn.in', 'football');
parser.getEventsBasedOnTeam('https://www.espn.in/football/team/_/id/382/Manchester-City/').then((res) => {
    console.log(res);
})
// // parser.getTeams().then((res) => {
// //     console.log(res);
// // })
// let leagues: League[] = []
// parser.getLeagues().then((res) => {
//     leagues = res;
//     // console.log(leagues);
//     parser.getTeams(leagues[0]).then((res) => {
//         console.log(res);
//     })
// })



