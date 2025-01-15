import React from 'react'
import Header from "@/components/header/Header";
import MainView from '@/components/MainView';
import { db } from '@/db/drizzle';
import dayjs from 'dayjs';
import { CalendarEventType } from '@/lib/store';

const getEventData = async () => {
  try {
    const data = await db.query.eventsTable.findMany()
    return data.map((event) => ({
      ...event,
      date: dayjs(event.date).toISOString(),
    }));
  } catch (error) {
    console.log('ERROR while fetching data from the database ', error)
  }
}

export default async function Page() {
  const dbEvents = await getEventData()

  return (
      <div className=''>
        <Header />
        <MainView eventData={dbEvents as unknown as CalendarEventType[]} />
      </div>

  )
}
