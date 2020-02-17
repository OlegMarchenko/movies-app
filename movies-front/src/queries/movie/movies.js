import gql from 'graphql-tag'

export const CREATE_MOVIE = gql`
    mutation createMovie(
        $name: String!
        $description: String
    ) {
        createMovie (
            input: {data: {
                name: $name 
                description: $description}}
        ) {
            movie {
                name
                description
            }
        }
    }
`;

export const GET_MOVIES = gql`
    query movies {
        movies {
            id
            image {
                url
            }
            name
            categories {
                name
            }
            casts {
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

