import gql from 'graphql-tag';

export const CREATE_MOVIE = gql`
    mutation createMovie(
        $name: String!
        $description: String
        $image: ID
        $categories: [ID]
        $casts:[ID]
    ) {
        createMovie (
            input: {data: {
                name: $name
                description: $description
                image: $image
                categories: $categories
                casts: $casts
            }}
        ) {
            movie {
                name
                description
                image {
                    name
                    url
                }
                categories {
                    name
                }
                casts {
                    name
                }
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


export const GET_MOVIE = gql`
    query movie($id: ID!) {
        movie(id: $id) {
            id
            name
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
            movie_hours {
                id
                time_interval
                start_free_hours
                end_free_hours
            }
        }
    }
`;

export const UPDATE_MOVIES = {
  update(cache, { data: { createMovie } }) {
    const { movies } = cache.readQuery({ query: GET_MOVIES });
    cache.writeQuery({
      query: GET_MOVIES,
      data: { categories: movies.concat([createMovie]) },
    });
  },
  refetchQueries: [{ query: GET_MOVIES }]
};

export const DELETE_MOVIE = gql`
    mutation deleteMovie(
        $id: ID!
    ) {
        deleteMovie (
            input: {where: {id: $id}}
        ) {
            movie {
                id
            }
        }
    }
`;