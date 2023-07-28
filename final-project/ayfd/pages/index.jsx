import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import List from './maporlist.jsx';
import Map from './maporlist.jsx';

import '../public/styles/home.module.css'
import Button from '../components/button'

export default function Home() {
  const [toggleVar, setToggle] = useState(0);

  const handleButtonClick = () => {
    setToggle((number) =>  number === 0 ? 1 : 0);
  };

  return (
    <>
    <div className="myRoot">
      <div className="bg"> 
      <Header />
      <Button onClick={handleButtonClick} key={toggleVar} >
        'Click me'
        </Button>
      {toggleVar === 0 ? <List /> : <Map />}
      <Footer />
      </div>
    </div>
    </>
  );
}