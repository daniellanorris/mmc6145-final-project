
import React from 'react'
import {MapComponent} from '../components/map'

import styles from '../public/styles/headerfooter.module.css'


// main home page, where users can toggle between map view and list view. 
export default function List({children}) {


  //GET https://api.predicthq.com/v1/events/
  return (
    <>
      <div className={styles.container}>
        <main className={styles.maincontent}>
          <div className="card">
            <img/> 
            <h1> {}</h1>
            <p>  {}  </p>
          </div>
        </main>
      </div>
    </>
  )
}

export function MapFunction({children}) {
  return (
      <>
           <div className={styles.container}>
              <main className={styles.maincontent}> 
                <div>
                 {children}
                </div>
                <MapComponent/>
              </main>
          </div >
      </>
  )
}
