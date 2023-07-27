
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import MapComponent from '../components/map'

import * as styles from 'styles/page.module.css'

// main home page, where users can toggle between map view and list view. 
export default function List() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.maincontent}>
          <ul>
            <li>
              list
            </li>
          </ul>
        </main>
        <Footer />
      </div>
    </>
  )
}

export function Map() {
  return (
      <>
          <div className={styles.container}>
              <Header />
              <main className={styles.maincontent}>
                hi
                <div>
                  <MapComponent />
                </div>
              </main>
              <Footer />
          </div >
      </>
  )
}
