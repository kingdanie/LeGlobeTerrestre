export const PostContentFragment = `
    fragment PostContentFragment on Post{
        id
        excerpt
        slug
        uri
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            uri
            name
            id
            slug
          }
        }
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
    }
`;
