import '../styles/globals.css'
import 'antd/dist/antd.css'
import { RecoilRoot } from 'recoil'
import { createClient, Provider } from 'urql'

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: () => {
    const token = process.env.NEXT_PUBLIC_FAUNADB_SECRET
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Provider>
  )
}

export default MyApp
