import Layout from '../components/layout/Layout';
import { Provider } from 'react-redux';
import store from '../store/storeIndex';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
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
