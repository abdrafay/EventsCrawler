import axios from 'axios';
import cheerio from 'cheerio';
import { URL } from 'url';
import fs from 'fs';

class Crawler {

    private visited: Set<string>;

    constructor(private url: string) {
        this.url = url;
        this.visited = new Set();
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
        if (!link.includes('http://') && !link.includes('https://')) {
            const baseUrl = new URL(this.url);
            return new URL(link, baseUrl).href;
        }
        return link;
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

    public async getLinks() {
        const queue: string[] = [this.url];

        while (queue.length > 0) {
            const currentUrl = queue.shift() as string;

            if (!this.visited.has(currentUrl)) {
                this.visited.add(currentUrl);
                const html = await this.getHtml(currentUrl);

                if (html.length > 0) {
                    const $ = cheerio.load(html);
                    const links = $('a');

                    links.each((i, link) => {
                        const href = $(link).attr('href');
                        if (href) {
                            const normalizedLink = this.normalizeUrl(href);
                            if (normalizedLink.length !== 0 && this.isSameDomain(normalizedLink) && !normalizedLink.includes('/api/')) {
                                queue.push(normalizedLink);
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
        // save these all links in a file
        fs.writeFile('links.txt', Array.from(AllLinks.getVisitedLinks()).join('\n'), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });

    } catch (err) {
        console.log(err);
    }
}

getData();
