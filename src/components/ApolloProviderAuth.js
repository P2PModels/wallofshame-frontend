import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import useAuth from '../providers/Auth/use'
import config from '../config.json'

function ApolloProviderAuth(props) {
    const { children } = props
    const { token } = useAuth()

    const httpLink = createHttpLink({
        uri: config.gql.localhost,
    })

    const authLink = setContext((_, { headers }) => {
        // Add authorization headers with client token
        return {
            headers: {
                ...headers,
                Authorization: token ? token : '',
            },
        }
    })

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloProviderAuth
