import ToasterContainer from '../components/ToastContainer';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }) {
  return <>
    <ToasterContainer />
    <Component {...pageProps} />
  </>
}

export default MyApp
