import App from 'next/app'
import '../public/styles/global.css'
 
export default function MyApp({ Component, pageProps}) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
 
MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx}
}