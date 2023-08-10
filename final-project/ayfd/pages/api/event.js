import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

export default withIronSessionApiRoute(
  async function handler(req, res) {
      if (!req.session.user) {
        return res.status(401).json({ error: "User Not Found" })
      }

      switch(req.method) {
        case 'POST' :
          try  {
          const event = JSON.parse(req.body) 
          const eventAdd = await db.event.add(req.session.user.id, event);
          if(eventAdd === null) {
            req.session.destroy()
            return res.status(401).json({error: "User not found"})
          }
          return res.status(200).json(eventAdd)
          }
           catch (error) {
            return res.status(400).json({error: error.message})
          }


          case 'DELETE':
            try {
              const bodyParsed = await JSON.parse(req.body) 
              const eventDelete = await db.event.remove(req.session.user.id, bodyParsed.id);
              if (eventDelete === null) {
                req.session.destroy()
                return res.status(401).json({error: "User Not Found"})
              } 
              return res.status(200).json(bodyParsed);
            
            } catch (error) {
              return res.status(400).json({ error: error.message });
            }

            default: 
            return res.status(404).end()
        
      }
  },
  sessionOptions
)