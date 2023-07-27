import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import List from './maporlist.jsx';
import Map from './maporlist.jsx';

import 'styles/page.module.css'

export default function Home() {
  const [toggleVar, setToggle] = useState(0);

  const handleButtonClick = () => {
    setToggle((prevToggle) => (prevToggle === 0 ? 1 : 0));
  };

  return (
    <>
      <Header />
      <button onClick={handleButtonClick} key={toggleVar}>
        Click me
      </button>
      {toggleVar === 0 ? <List /> : <Map />}
      <Footer />
    </>
  );
}