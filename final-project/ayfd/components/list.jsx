
import React from 'react'
import styles from '../public/styles/headerfooter.module.css'
import Button from './button'


// main home page, where users can toggle between map view and list view. 

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

export default function List(props) {
  //need to send a GET to predict hq....filter this data based on search params from user input
  //for each list item, click leads to indiv event with more info. going to try to incorporate map

    const [{filteredResults}, dispatch] = useBookContext()
    const [fetching, setFetching] = useState(false)
    const [previousQuery, setPreviousQuery] = useState()
    const inputRef = useRef()
    const inputDivRef = useRef()
  
    async function filterSearch(e) {
      e.preventDefault()
      if (fetching || !query.trim() || query === previousQuery) return
      setPreviousQuery(query)
      setFetching(true)
      const res = await fetch(
        `https://api.predicthq.com/v1/events/${query}`
      )

        console.log(res)
      if (res.status !== 200) return
      const data = await res.json()
      dispatch({
        action: actions.SEARCH_EVENTS,
        payload: data
      })
      setFetching(false)
    }
  return (
    <>
      <div className={styles.container}>
        <main className={styles.maincontent}>
          <Button onClick={filterSearch}> </Button>
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
