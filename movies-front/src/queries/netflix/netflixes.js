import gql from 'graphql-tag';

export const CREATE_NETFLIX = gql`
    mutation createNetflix(
        $name: String!
        $description: String
        $image: ID
        $categories: [ID]
        $casts: [ID]
        $price: Float
    ) {
        createNetflix (
            input: {data: {
                name: $name
                description: $description
                image: $image
                categories: $categories
                casts: $casts
                price: $price
            }}
        ) {
            netflix {
                id
                name
                description
                image {
                    id
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
                price
            }
        }
    }
`;

export const GET_NETFLIX = gql`
    query netflixes {
        netflixes {
            id
            name
            image {
                id
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
            price
        }
    }
`;

export const GET_NETFLIX_MOVIE = gql`
    query netflix($id: ID!) {
        netflix(id: $id) {
            id
            name
            image {
                id
                url
            }
            imageMini {
                id
                url
            }
            description
            categories {
                id
                name
            }
            casts {
                id
                name
            }
            price
            release
            time
            budget
            average
        }
    }
`;

export const UPDATE_NETFLIX = {
  update(cache, { data: { createNetflix } }) {
    const { netflixes } = cache.readQuery({ query: GET_NETFLIX });
    cache.writeQuery({
      query: GET_NETFLIX,
      data: { categories: netflixes.concat([createNetflix]) },
    });
  },
  refetchQueries: [{ query: GET_NETFLIX }]
};