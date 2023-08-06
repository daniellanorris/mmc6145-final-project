import React, { useEffect, useState } from 'react';
import styles from '../public/styles/headerfooter.module.css';
import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from "../config/session";
import Link from 'next/link'
import { useListContext } from '../context/ListContext';
import Button from './button'
import Image from 'next/image'


export const useURLQuery = (callback) => {
  useEffect(() => {
    const handlePopstate = (event) => {
      const params = new URLSearchParams(window.location.search);
      callback(params);
      console.log(params)
    };
  })}
    
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
      const [events, setEvents] = useState([]);
      const { list } = useListContext();
    
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
      console.log(newListParams)
    
      // Join the newListParams with '&' to form a valid query string
      const newListQueryString = newListParams.join(',');
      console.log(newListQueryString)
    
      const GENRE_URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=100&city=denver&classificationId=${newListQueryString}&apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp`;
      console.log(list.length)
      const genrefetchUrl = list.length > 0 ? GENRE_URL : API_URL;
      console.log(genrefetchUrl)
      // Append the newListQueryString to the API_URL
    
      const fetchData = async () => {
        try {
          const response = await fetch(genrefetchUrl);
          console.log(genrefetchUrl)
          if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
          }
          const data = await response.json();
          console.log(data)
    
          // Parse the data and do other things.
          setEvents(data._embedded.events);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [genrefetchUrl]);
    
      return (
        <>
                <Button onClick={fetchData}> Filter</Button>
      <div className={styles.container}>
        <main className={styles.maincontent}>
          {events.map((event) => (
            <Link key={event.id} href={`/event/id=${event.id}`} style={{ textDecoration: 'none' }}>
              <div key={event.id} className="card bg-secondary" style={{ height: "10px!important" }}>
                {/* Check if the images array is available */}
                {event.images && event.images.length > 0 ? (
                  // Use the first image URL from the images array
                  <img src={event.images[0].url} alt={event.name + ' image'} width="305" height="auto"/>
                ) : (
                  // If images array is not available, you can display a placeholder image or any other fallback content
                  <div style={{ width: 305, height: 225, background: 'grey' }} />
                )}
                <h1>{event.name}</h1>
                <p>{event.id}</p>
                <p>{event.info ? event.info : event.pleaseNote}</p>
                <p>{/* Put any other information you want to display here */}</p>
              </div>
            </Link>
          ))}
        </main>
      </div>
        </>
      );
    } 