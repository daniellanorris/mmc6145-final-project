import React, { useEffect, useState } from 'react';
import styles from '../public/styles/headerfooter.module.css';
import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from "../config/session";

const API_KEY = process.env.TICKET_API;
const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=2&apikey=${API_KEY}`;


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session;
    const props = {};
    if (user) {
      props.user = req.session.user;
    }
    props.isLoggedIn = !!user;
    return { props };
  },
  sessionOptions
);

export default function List () {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }

        const data = await response.json();
        console.log(data);
        // Parse the data and do other things.
        setEvents(data._embedded.events)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function filterSearch() {
    




  };

  return (
    <>
      <div className={styles.container}>
        <main className={styles.maincontent}>
        {events.map((event) => (
          <div>
              <p key={event.id}>{event.name}</p>
              <p> {event.id} </p>
              <p> {event.info} </p>
              <p> {}</p>
          </div>
              ))}
        </main>
      </div>
    </>
  );
}