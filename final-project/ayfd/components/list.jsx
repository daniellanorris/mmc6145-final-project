import React, { useEffect, useState } from 'react';
import styles from '../public/styles/headerfooter.module.css';
import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from "../config/session";
import Link from 'next/link';
import { useListContext } from '../context/ListContext';
import Button from './button';
import { useRouter } from 'next/router';
import { useEventContext } from '../context';
import * as actions from '../context/actions'

export const useURLQuery = (callback) => {
  useEffect(() => {
    const handlePopstate = (event) => {
      const params = new URLSearchParams(window.location.search);
      callback(params);
      console.log(params);
    };
  }, []);
};

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

export default function List() {
  const [{ eventData }, dispatch] = useEventContext();
  const [events, setEvents] = useState([]);
  const { list } = useListContext();
  const [clicky, setClicked] = useState(false);
  const router = useRouter();

  const handleURLQuery = (params) => {
    const newList = [];
    for (const value of params.values()) {
      // Parse the query parameter values back to objects and add them to the newList
      newList.push(JSON.parse(value));
    }
    setList(newList);
  };

  // Use the custom hook to handle URL changes
  useURLQuery(handleURLQuery);

  const newListParams = list.map(item => `${encodeURIComponent(item.id)}`);
  const newListQueryString = newListParams.join(',');
  const GENRE_URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=100&city=denver&classificationId=${newListQueryString}&apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp`;
  const genrefetchUrl = list.length > 0 ? GENRE_URL : API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(genrefetchUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      dispatch({
        action: actions.GET_EVENTS, 
        payload: data._embedded.events
      });
      setEvents(data._embedded.events);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [genrefetchUrl]);

  const handleNavigateToEventDetail = (event) => {
    router.push({
      pathname: `/event/${event.id}`,
      query: {
        eventId: event.id,
      },
    });
  };

  async function addToFavs(e, eventId) {
    e.preventDefault();
    const res = await fetch("/api/event", {
      method: 'POST',
      body: JSON.stringify({ eventId })
    });

    if (res.status === 200) {
      dispatch({
        action: actions.ADD_TO_FAVORITES, 
        payload: eventId
      });
      handleToggleClicked();
      router.replace(router.asPath);
    }
  }

  async function deleteFromFavs(e, eventId) {
    e.preventDefault();
    const res = await fetch("/api/event", {
      method: 'POST',
      body: JSON.stringify({ eventId })
    });

    if (res.status === 200) {
      dispatch({
        action: actions.REMOVE_FROM_FAVORITES, 
        payload: eventId
      });
      handleToggleClicked();
      router.replace(router.asPath);
    }
  }


  function handleToggleClicked() {
    setClicked(clicked => !clicked);
  }

  return (
    <>
      <Button onClick={fetchData}> Filter</Button>
      <div className={styles.container}>
        <main className={styles.maincontent}>
          {events.map((event) => (
            <Link key={event.id} onClick={() => handleNavigateToEventDetail(event)} href={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
              <div key={event.id} className="card bg-secondary" style={{ height: "10px!important" }}>
                {event.images && event.images.length > 0 ? (
                  <img src={event.images[0].url} alt={event.name + ' image'} width="305" height="auto"/>
                ) : (
                  <div style={{ width: 305, height: 225, background: 'grey' }} />
                )}
                <h1>{event.name}</h1>
                <p>{event.id}</p>
                <p>{event.info ? event.info : event.pleaseNote}</p>
                {clicky === false ? (
                  <Link href='/favorites'> 
                    <Button onClick={addToFavs}> Save Event </Button>
                  </Link>
                ) : (
                  <Button onClick={deleteFromFavs}> Remove Event </Button>
                )}
              </div>
            </Link>
          ))}
        </main>
      </div>
    </>
  );
}