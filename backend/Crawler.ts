import axios from 'axios';
import cheerio from 'cheerio';
import { URL } from 'url';
import fs from 'fs';

class Crawler {
    private visited: Set<string>;
    private queue: string[];

    constructor(private url: string) {
        this.url = url;
        this.visited = new Set();
        this.queue = [this.url];
    }

    private isSameDomain(link: string): boolean {
        try {
            const currentDomain = new URL(this.url).hostname;
            const linkDomain = new URL(link, this.url).hostname;
            return currentDomain === linkDomain;
        } catch (error) {
            console.error(`Error parsing URL ${link}: ${error}`);
            return false;
        }
    }

    private normalizeUrl(link: string): string {
        try {
            const baseUrl = new URL(this.url);
            const resolvedUrl = new URL(link, baseUrl).href;

            // Remove trailing slash if it exists
            return resolvedUrl.endsWith('/') ? resolvedUrl.slice(0, -1) : resolvedUrl;
        } catch (error) {
            console.error(`Error parsing URL ${link}: ${error}`);
            return '';
        }
    }

    private async getHtml(newUrl: string = this.url): Promise<string> {
        try {
            const { data } = await axios.get(newUrl);
            return data;
        } catch (error) {
            console.error(`Error fetching ${newUrl}: ${error}`);
            return '';
        }
    }

    private addToQueue(link: string): void {
        if (!this.visited.has(link) && !this.queue.includes(link)) {
            this.queue.push(link);
        }
    }

    public async getLinks() {
        while (this.queue.length > 0) {
            const currentUrl = this.queue.shift() as string;

            if (!this.visited.has(currentUrl)) {
                this.visited.add(currentUrl);
                // save this link in a file in a new line
                fs.appendFile('links.txt', currentUrl + '\n', (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });

                const html = await this.getHtml(currentUrl);

                if (html.length > 0) {
                    const $ = cheerio.load(html);
                    const links = $('a');

                    links.each((i, link) => {
                        const href = $(link).attr('href');
                        if (href) {
                            const normalizedLink = this.normalizeUrl(href);
                            if (normalizedLink.length !== 0 && this.isSameDomain(normalizedLink) && !normalizedLink.includes('/api/')) {
                                this.addToQueue(normalizedLink);
                            }
                        }
                    });
                }
            }
        }
    }

    public getVisitedLinks() {
        return this.visited;
    }
}

const AllLinks = new Crawler('https://www.espn.in');

const getData = async () => {
    try {
        await AllLinks.getLinks();
        console.log(AllLinks.getVisitedLinks());
    } catch (err) {
        console.log(err);
    }
}

getData();
