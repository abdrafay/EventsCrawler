import axios from 'axios';
import cheerio from 'cheerio';
import { Event } from './interfaces';

class Parser {
    // get url in constructor
    constructor(private url: string) {
        this.url = url;
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

    public async getEvents(): Promise<Event[]> {
        const html = await this.getHtml(this.url);
        const $ = cheerio.load(html);
        let res = {
            EventName: '',
            events: []
        }

        const events: Event[] = [];
        // get element containing these classes
        //  Wrapper Card__Content overflow-visible
        const el = $('.page-container');
        // use el.find to get the elements inside
        res.EventName = el.find('.headline__h1.dib').text();
        el.find('.ResponsiveTable').each((i, table) => {
            let date = $(table).find('.Table__Title').text();
            let header = $(table).find('thead th')
            // loop through header to check if time is available or result
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
            events.push({
                date,
                time,
                location,
                countries: [matchTeams1.text(), matchTeams2.text()]
            })
        })
        return events;
    }

}
export default Parser;

