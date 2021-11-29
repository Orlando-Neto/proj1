import '../styles/globals.css'
import { AppProvider } from '../data/context/AppContext'
import { AuthProvider } from '../data/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
    </AppProvider>
  )
}

export default MyApp