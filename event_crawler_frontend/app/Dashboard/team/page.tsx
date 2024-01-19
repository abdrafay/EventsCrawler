'use client'
import React, { use, useEffect, useState } from 'react'
import { useSearchParams  } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// type TeamProps = {
//     query: string
// }

type Event = {
    date: string;
    time: string;
    location: string;
    stadium: string;
    countries: string[];
}

const TeamData = ({params}:any) => {
    const searchParams = useSearchParams()
    const [loadingState, setLoadingState] = useState(true)
    const [events, setEvents] = useState<Event[]>([])
    console.log(searchParams.toString(), 'team')
    useEffect( ()=> {
        const newParams = searchParams.toString().replaceAll('%2F', '/')

        const mainUrl = "https://www.espn.in"
        const topic = 'football'
        const fetchData = async () => {

        try {
            const res = await axios.post(`http://localhost:5000/api/get-team-events`,  {
                url: "https://www.espn.in",
                topic: 'football',
                teamUrl: `${mainUrl}/${topic}/${newParams}`
            })
            setLoadingState(false)
            setEvents(res.data.events)
        }
        catch(err) {
            console.log(err)
        }
        }
        fetchData()
    },[])
    return (
    <div>
        {loadingState ? <h1>Loading...</h1> : 
        <div className='py-10'>
            <h1 className='text-4xl text-center font-bold'>Team Events</h1>
            <div className="flex flex-wrap flex-row justify-center gap-4 py-5">

                {events.map((event, index) => (
                    <Card className='w-[250px]'>
                        <CardHeader>
                            <CardTitle>{event.countries[0]} vs {event.countries[1]}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-md'>
                                {event.time}
                            </p>
                            <p className='text-md'>
                                {event.location}
                            </p>
                            <p className='text-md'>
                                {event.stadium}
                            </p>
                            <p className='text-md'>
                                {event.countries}
                            </p>

                        </CardContent>
                    </Card>
                    
                        // <h1></h1>
                        // <h1>{event.time}</h1>
                        // <h1>{event.location}</h1>
                        // <h1>{event.stadium}</h1>
                        // <h1>{event.countries}</h1>
                ))}
            </div>
        </div>}
    </div>
  )
}

export default TeamData