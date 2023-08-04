import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import React from 'react';
import List from '../components/list';
import Dropdown from '../components/dropdown'

import Button from '../components/button'


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


export default function Home() {

  function searchEvents(e) {
    const clicked = e.addEventListener
    if (clicked ) {

    }

    
  }

  return (
    <>
      <Button onClick={searchEvents}>
        Filter
      </Button>
      <Dropdown/>
      <List />

    </>
  );
}