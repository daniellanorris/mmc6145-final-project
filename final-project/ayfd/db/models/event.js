import { Schema} from 'mongoose'

const eventSchema = new Schema({
    id: String,
    name: String,
    category: String,
    thumbnail: String,
    info: String,

  })

export default eventSchema


