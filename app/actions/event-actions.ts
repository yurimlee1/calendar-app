'use server'

import { db } from "@/db/drizzle"
import { eventsTable } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createEvent(formData: FormData) : Promise<{ error: string } | { success: boolean }> {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string

  if (!title || !description || !date || !time) {
    return { error: 'Missing title or date'}
  }

  const dateTime = new Date(`${date}T${time}:00`)

  try {
    await db.insert(eventsTable).values({
      title,
      description,
      date: dateTime,
    })

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('ERROR while creating event: ', error)
    return { error: 'Failed to create event' }
  }
}