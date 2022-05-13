import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client'
import config from '../config.json'

function BackendProvider(props) {
    const { children } = props

    // const httpLink = createHttpLink({
    //     uri: config.gql.localhost,
    // })

    const httpLink = createHttpLink({
        uri: config.gql.production,
    })

    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default BackendProvider
