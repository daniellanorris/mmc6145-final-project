import '../public/styles/global.css'
import Header from '../components/header'
import Footer from '../components/footer'
import 'bootstrap/dist/css/bootstrap.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <div class="bg-dark" >
        <Header />
          <Component {...pageProps} />
        <Footer />

      </div>
    </>
  )
}

export default MyApp
