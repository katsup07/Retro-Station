import Layout from '../components/layout/Layout';
import { Provider } from 'react-redux';
import store from '../store/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
	);
}

export default MyApp;
