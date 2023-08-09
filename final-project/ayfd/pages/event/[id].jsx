import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'

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

export default function EventPage(props) {
  const router = useRouter();
  const eventId = router.query.eventId;
  const { isLoggedIn } = props

  const [event, setEvent] = useState({});

  const ID_URL = `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp&locale=*`;

  const fetchDataId = async () => {
    try {
      const response = await fetch(ID_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      console.log('success')

      const { dates, start, name, info, pleaseNote, priceRanges, images} = data;

      // Set the event state
      setEvent({ dates, start, name, info, pleaseNote, priceRanges, images});

    } catch (error) {

    }
  };

  useEffect(() => {
    fetchDataId();
  }, [ID_URL]);

  return (
    <>
    {
    isLoggedIn ? 
    <main role="main">
      <div class="jumbotron"> 
      <div class="container">
        <div class="display">
        {event.images && event.images.length > 0 ? (
                 //using the first imageurl from the images array
                  <img src={event.images[0].url} alt={event.name + ' image'} width="305" height="auto"/>
                ) : (
                  <div style={{ width: 305, height: 225, background: 'grey' }} />
                )}
        <div class="display-3" style={{color: "white"}}>  {event.name} </div>
        </div>
      </div>
      <div class="container">
      <h2>Price</h2>
      <ul className = "card">
        {event.priceRanges && event.priceRanges.map((price, index) => (
          <div >
          <li key={index} style={{listStyleType : "none", color: "green"}}>
            ${price.min} - ${price.max}
          </li>
          </div>
        ))}
      </ul>
      
      {event.dates && event.dates.start && (
        <>
          <p> Date: {event.dates.start.localDate} </p>
          <p> Time: {event.dates.start.localTime} </p>
        </>
      )}
      <p>
        {event.info ? event.info : event.pleaseNote}
      </p>
      <p> {event.ticket ? event.ticket : 'Not a ticketed event'}</p>
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