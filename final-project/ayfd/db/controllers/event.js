import User from '../models/user'
import { normalizeId, dbConnect } from './util'

export async function getAll(userId) {
  await dbConnect()
  const user = await User.findById(userId).lean()
  if (!user) return null
  return user.favoriteEvents.map(event=> normalizeId(event))
}

export async function getId(userId, eventId) {
  await dbConnect()
  const user = await User.findById(userId).lean()
  if (!user) return null
  const event = user.favoriteEvents.find(event => event.eventId === eventId)
  if (event) return normalizeId(event)
  return null
}

export async function add(userId, event) {
  await dbConnect()
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoriteEvents: event } },
    { new: true }
  )
  if (!user) return null
  const addedEvent = user.favoriteEvents.find(ev => ev.eventId === event.eventId)
  return normalizeId(addedEvent)
}

export async function remove(userId, eventId) {
  await dbConnect()
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { favoriteEvents: {_id: eventId } } },
    { new: true }
  )
  if (!user) return null
  return true
}