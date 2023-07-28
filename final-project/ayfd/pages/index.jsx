import React, { useState } from 'react';
import List from './maporlist.jsx';
import MapFunction from './maporlist.jsx'

import Button from '../components/button'

export default function Home() {
  const [toggleVar, setToggle] = useState(0);

  const changeView = () => {
    setToggle((prevToggle) => (prevToggle === 0 ? 1 : 0))
    console.log('clicked')
    console.log(toggleVar)
  }
  return (
    <>
    <div onClick={changeView} key={toggleVar} >
      <Button >
       toggle
        </Button>
      </div>
      {toggleVar === 0 ? 
      <List > list </List> : 
      <MapFunction> map </MapFunction>}
      
    </>
  );
}