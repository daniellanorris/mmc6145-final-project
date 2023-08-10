export function normalizeId({id, ...otherProperties}) {
  id.toString()
  return { ...otherProperties, id }
}

export { dbConnect } from './connection'