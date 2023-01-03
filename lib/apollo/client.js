import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const defaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
};

/**
 * Instantiate required constructor fields
 */
const cache = new InMemoryCache({
    resultCaching: false,
});
const link = createHttpLink({
    uri: "https://api.holivoo.com/graphql",
});

const client = new ApolloClient({
    cache,
    link,
    defaultOptions: defaultOptions,
});

export default client;