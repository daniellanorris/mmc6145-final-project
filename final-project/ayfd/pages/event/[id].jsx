import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import { useRouter } from 'next/router';
import React, { useState, useEffect} from 'react';
import Link from 'next/link'
import Button from '../../components/button'
import { useEventContext, GET_EVENTS } from '../../context'; 
import db from '../../db'




export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
    const { user } = req.session;
    const eventId = params.id; 
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
        favoriteEvents: events.map(event => ({
          ...event, // Event Id from fetched event
          id: event.id, // favoriteEvent id
        })),

      },
     
    };
    
  },
  sessionOptions

);

export default function EventPage(props) {
  const [clicky, setClicked] = useState(false);
  const router = useRouter();
  const eventId = router.query.id;
  
  const { isLoggedIn } = props
  const [{ eventSearchResults }, dispatch] = useEventContext(); 

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
      router.push('/');
  }, [props.event, eventSearchResults, router, eventSet]);

  const ID_URL = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp&locale=*`;

  const fetchDataId = async () => {
    try {
      const response = await fetch(ID_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      console.log('success');
      console.log(data)

      const {dates, start, name, info, pleaseNote, priceRanges, images, eventId } = data;

      // Set the event state
      setEvent({dates, start, name, info, pleaseNote, priceRanges, images, eventId });
      console.log(data)
      console.log(eventSet.start)
     
      // Dispatch event data and eventId to context
      // dispatch({
      //   type: GET_EVENTS,
      //   payload: {
      //     event: data,
      //     eventId: eventId,
      //   },
      // });
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchDataId();
  }, [ID_URL]);

console.log(eventId)
  async function addToFavs(eventId) {
    const res = await fetch("/api/event", {
      method: 'POST',
      body: JSON.stringify({ eventId })
    });
    console.log('clicked')

    if (res.status === 200) {
      console.log('success')
      handleToggleClicked();
      router.push('/favorites')
    }
  }

  async function deleteFromFavs(eventId) {
    const res = await fetch("/api/event", {
      method: 'DELETE',
      body: JSON.stringify({ eventId})
    });

    if (res.status === 200) {
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
          
         <Link href={{ pathname: '/favorites' }}>
  <Button onClick={() => addToFavs({eventId, eventSet})} > Save Event </Button>
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