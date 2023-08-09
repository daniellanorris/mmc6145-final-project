import React from 'react'
import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from '../config/session';


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
      let events
      if (user)
        events = await db.events.getAll(user.id)
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

export default function Favorites() {
    return (
    <>
    <main class="container"> 
        <div class="grid">
          {favoriteEvents ? (
            <h1 class="col-4">
                {favoriteEvents.name}
            </h1>
          ) : (
            <h1> No Favorite Events!! </h1>
          )
          }

        </div>

    </main>
    
    </>
    )
}