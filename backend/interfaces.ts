export interface Event {
    date: string;
    time: string;
    location: string;
    countries: string[];
}

export interface Team {
    leagueName: string;
    name: string;
    url: string;
    image: string;
}

export interface League {
    name: string;
    url: string;
}