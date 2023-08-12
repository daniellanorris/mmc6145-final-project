import '../public/styles/global.css'
import Header from '../components/header'
import Footer from '../components/footer'
import 'bootstrap/dist/css/bootstrap.css'
import { EventProvider } from '../context'



function MyApp({ Component, pageProps }) {
  return (
    <>

    <EventProvider>
      <div class="bg-dark" >
        <Header />
          <Component {...pageProps} />
        <Footer />
      </div>
      </EventProvider>

    </>
  )
}

export default MyApp
