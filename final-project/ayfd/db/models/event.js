import { Schema} from 'mongoose'

const eventSchema = new Schema({
    id: String,
    name: String,
    dates: [Number],
    category: String,
    genre: [String],
    thumbnail: String,
    info: String,
    img:
    {
        data: Buffer,
        contentType: String
    }

  })

export default eventSchema


