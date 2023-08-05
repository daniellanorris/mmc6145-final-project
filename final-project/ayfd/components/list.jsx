import React, { useEffect, useState } from 'react';
import styles from '../public/styles/headerfooter.module.css';
import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from "../config/session";
import Link from 'next/link'
import { useListContext } from '../context/ListContext'; 

const API_KEY = process.env.TICKET_API;
const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=100&city=denver&apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp`;



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

const genres = [
  {electric: 'KnvZfZ7vAvF' },
]
export default function List() {
  const [events, setEvents] = useState([]);
  const {list} = useListContext();
  console.log(list)// Access the list from the Dropdown hook
  const newList = list.map(item => `${encodeURIComponent(item.value)}`);

  console.log(newList)
  const API_URL_START = `https://app.ticketmaster.com/discovery/v2/events.json?${newList.join('&')}&size=100&city=denver&apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp`;

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = list.length > 0 ? API_URL_START : API_URL;
      console.log(fetchUrl)
      console.log(list)
      console.log(list.length)
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
        const data = await response.json();
       
        // Parse the data and do other things.
        setEvents(data._embedded.events);

        const genres = events.map(event => {
          const classifications = event.classifications || [];
          const genreNames = classifications.map(classification => classification.genre && classification.genre.name);
          return genreNames.filter(Boolean); // Filter out any empty genre names
        });
        
        console.log(genres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [list]);

  return (
    <>
      <div className={styles.container}>
        <main className={styles.maincontent}>
        {events.map((event) => (
        <Link key={event.id} href={`/event/id=?${event.id}`} style={{textDecoration: 'none'}}>
          <div key={event.id} class="card bg-secondary" styles={{height: "10px!important"}} >
              <h1>{event.name}</h1>
              <p> {event.id} </p>
              <p> {event.info} </p>
              <p> {}</p>
          </div>
        </Link>
              ))}
        </main>
      </div>
    </>
  );
}