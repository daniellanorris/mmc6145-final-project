import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import { useEventContext } from "../context";
import db from "../db";

export const getServerSideProps = withIronSessionSsr(


  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const events = await db.event.getAll(user.id);
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
        favoriteEvents: events.map(event => ({
          ...event, // Event Id from fetched event
          id: event.id, // favoriteEvent id
        })),
      },
    };
  },
  sessionOptions
);
// _id: ObjectId("64d6904317731858d8d4a8e5"),
// username: 'daniellanorris111',
// password: '$2b$10$FdmhaOtKf8SlH/dFW4UnAehIlmtzQemusT2Qvlc./VDpm14vpq/mO',
// favoriteEvents: [
//   { _id: ObjectId("64d6905017731858d8d4a8ea") },
//   { _id: ObjectId("64d6b58017731858d8d4a903") },
// { _id: ObjectId("64d6baae17731858d8d4a90b") } => eventId is G5vzZ9RKjAVjA
// ],

export default function Favorites(props) {
  const { favoriteEvents } = props;
  const { id, dates, start, name, info, pleaseNote, priceRanges, images, eventId } = useEventContext();
  console.log(props.eventSet)
  return (
    <main className="container">
      <div className="grid">
        {favoriteEvents.length > 0 ? (
          favoriteEvents.map((favoriteEvent) => (
            <div key={favoriteEvent.id}>
              <h1 style={{ color: 'white' }}>{favoriteEvent.name}</h1>
            <p> {id} </p>
            </div>
          ))
        ) : (
          <h1 style={{ color: 'white' }}> No Favorite Events!! </h1>
        )}
      </div>
    </main>
  );
}


