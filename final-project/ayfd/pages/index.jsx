import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";

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

import React from 'react';
import List from '../components/list';

import Button from '../components/button'

export default function Home() {

  return (
    <>
      <Button >
        Filter
      </Button>
      <List />

    </>
  );
}