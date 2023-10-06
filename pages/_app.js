import '../styles/global.css'
import '../styles/calendar.css'
import 'react-quill/dist/quill.snow.css'
import { Provider } from 'react-redux'
import { store } from '../app/store/store'
import { wagmiClient } from '../app/config/provider'
import {WagmiConfig } from "wagmi";

function MyApp({ Component, pageProps }) {

  return (
    <>    
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    <WagmiConfig client={wagmiClient}>
    </WagmiConfig>
    </>
  )

}

export default MyApp
