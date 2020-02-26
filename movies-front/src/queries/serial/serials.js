import gql from 'graphql-tag';


export const GET_SERIALS = gql`
    query serials {
        serials {
            id
            image {
                url
            }
            name
            categories {
                id
                name
            }
            casts {
                id
                name
            }
            movie_hours {
                time_interval
                start_free_hours
                end_free_hours
            }
        }
    }
`;


export const GET_SERIAL = gql`
    query serial($id: ID!) {
        serial(id: $id) {
            id
            name
            seasons
            image {
                url
            }
            categories {
                id
                name
            }
            casts {
                id
                name
            }
            tagline
            movie_hours {
                id
                time_interval
                start_free_hours
                end_free_hours
            }
        }
    }
`;