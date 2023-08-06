import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import React from 'react';
import List from '../components/list';
import Dropdown from '../components/dropdown'
import fetchData from '../components/list'
import Button from '../components/button'
import { ListProvider } from "../context/ListContext";


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
  return (
    <>
          <ListProvider>
      <Button onClick={fetchData}>
        Filter
      </Button>
        <Dropdown />
        <List />
      </ListProvider>

    </>
  );
}