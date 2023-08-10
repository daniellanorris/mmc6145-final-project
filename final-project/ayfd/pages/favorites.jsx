import React from 'react'
import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from '../config/session';
import db from "../db";


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
      let events
      if (user)
        events = await db.event.getAll(user.id)
      if (!events) {
        req.session.destroy()
        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        }
      }
      return {
        props: {
          user: req.session.user,
          isLoggedIn: true,
          favoriteEvents: events,
        }
      };
    },
    sessionOptions
  );

export default function Favorites({favoriteEvents}) {
    return (
    <>
    <main class="container"> 
    <div className="grid">
          {favoriteEvents ? (
            favoriteEvents.map(event => (
              <h1 key={event.id} className="col-4">
                {event.name}
              </h1>
            ))
          ) : (
            <h1> No Favorite Events!! </h1>
          )}
        </div>
    </main>
    
    </>
    )
}