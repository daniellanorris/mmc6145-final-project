import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import db from "../db";


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    let events;
    if (user) {
      events = await db.event.getAll(user.id);
    }
    if (!events) {
      req.session.destroy();
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: {
        user: req.session.user,
        isLoggedIn: true,
        favoriteEvents: events,
      },
    };
  },
  sessionOptions
);

export default function Favorites(props) {
  console.log(props.favoriteEvents)
  return (
    <main className="container">
      <div className="grid">
        {props.favoriteEvents.length > 0 ? (
          props.favoriteEvents.map((event) => (
            <h1 key={event.eventId} className="col-4">
              {props.event.eventId}
            </h1>
          ))
        ) : (
          <h1 style={{color: "white"}}> No Favorite Events!! </h1>
        )}
      </div>
    </main>
  );
}