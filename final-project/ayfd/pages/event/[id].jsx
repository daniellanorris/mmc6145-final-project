import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Button from '../../components/button'
import { useEventContext } from '../../context';
import * as actions from '../../context/actions'
import db from '../../db'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
    const { user } = req.session;
    const props = {};
    if (user) {
      props.user = req.session.user;
      const event = await db.event.getId(user.id, params.id); 
    
    if (event) 
      props.event = event;
    }
    props.isLoggedIn = !!user;

    return { props };
  },
  sessionOptions
);

export default function EventPage(props) {
  const [{ eventData }, dispatch] = useEventContext();
  const [clicky, setClicked] = useState(false);
  const router = useRouter();
  const eventId = router.query.id;
  const { isLoggedIn } = props
  const [{eventSearchResults}] = useEventContext()

  const [eventSet, setEvent] = useState({});

  let isFavoriteEvent = false;
  if (props.event) {
    isFavoriteEvent = true;
  } else {
    const event = eventSearchResults.find(event => event.eventId === eventId);
    if (event) {
      isFavoriteEvent = true;
      setEvent(event);
    }
  }

  useEffect(() => {
    if (!props.event && !event)
      router.push('/')
  }, [props.event, eventSearchResults, router, eventSet])

  const ID_URL = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp&locale=*`;

  const fetchDataId = async () => {
    try {
      const response = await fetch(ID_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      console.log('success')

      const { id, dates, start, name, info, pleaseNote, priceRanges, images} = data;

      // Set the event state
      setEvent({ id, dates, start, name, info, pleaseNote, priceRanges, images});

    } catch (error) {

    }
  };

  useEffect(() => {
    fetchDataId();
  }, [ID_URL]);



  async function addToFavs({eventSet}) {
    e.preventDefault();
    const res = await fetch("/api/event", {
      method: 'POST',
      body: JSON.stringify({ id })
    });

    if (res.status === 200) {
      dispatch({
        action: actions.ADD_TO_FAVORITES, 
        payload: eventSet
      });
      
      handleToggleClicked();
      router.replace(router.asPath);
    }
  }

  async function deleteFromFavs(e, id) {
    e.preventDefault();
    const res = await fetch("/api/event", {
      method: 'DELETE',
      body: JSON.stringify({ id })
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
    {
    isLoggedIn ? 
    <main role="main">
      <div class="jumbotron"> 
      <div class="container">
        <div class="display">
        {eventSet.images && eventSet.images.length > 0 ? (
                 //using the first imageurl from the images array
                  <img src={eventSet.images[0].url} alt={eventSet.name + ' image'} width="305" height="auto"/>
                ) : (
                  <div style={{ width: 305, height: 225, background: 'grey' }} />
                )}
        <div class="display-3" style={{color: "white"}}>  {eventSet.name} </div>
        </div>
      </div>
      <div class="container">
      {clicky === false ? (
                  <Link href='/favorites'> 
                    <Button onClick={addToFavs}> Save Event </Button>
                  </Link>
                ) : (
                  <Button onClick={deleteFromFavs}> Remove Event </Button>
                )}
      <h2>Price</h2>
      <ul className = "card">
      {eventSet.priceRanges && (
    <div>
      {eventSet.priceRanges.map((price, index) => (
        <div key={index}>
          <h2 style={{ color: "green" }}>
            ${price.min} - ${price.max}
          </h2>
        </div>
      ))}
    </div>
  )}
      </ul>
      
      {eventSet.dates && eventSet.dates.start && (
        <>
          <p> Date: {eventSet.dates.start.localDate} </p>
          <p> Time: {eventSet.dates.start.localTime} </p>
        </>
      )}
      <p>
        {eventSet.info ? eventSet.info : eventSet.pleaseNote}
      </p>
      <p> {eventSet.ticket ? eventSet.ticket : 'Not a ticketed event'}</p>
      </div>
      </div>
     </main> :
     <div>
     <p> please log in to view your favorites </p> 
     <Link href="/login"> Go to login</Link>
     </div>
     }
    </>
  );
}