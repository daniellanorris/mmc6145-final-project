import '../public/styles/global.css'
import Header from '../components/header'
import Footer from '../components/footer'
import 'bootstrap/dist/css/bootstrap.css'
import { EventProvider } from '../context/EventContext';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <div class="bg-dark" >
        <Header />
        <EventProvider>
          <Component {...pageProps} />
        </EventProvider>
        <Footer />

      </div>
    </>
  )
}

export default MyApp
