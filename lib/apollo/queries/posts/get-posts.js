import { gql } from "@apollo/client";
import MenuFragment from "../../fragments/menus";
import { HeaderFooter } from "./get-menus";

export const GET_RELATED_AND_LATEST = gql`
  query GET_RELATED_AND_LATEST($categorySlug: String, $latestCount: Int) {
    latestPosts: posts(first: $latestCount) {
      nodes {
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
    }
    relatedPosts: posts(
      where: { categoryName: $categorySlug }
      first: $latestCount
    ) {
      nodes {
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
            categoryId
            slug
            name
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
    }
  }
`;

export const GET_POST_BY_CATEGORY = gql`
  query GET_POSTS_BY_CATEGORY($categorySlug: String, $latestCount: Int) {
    posts: posts(where: { categoryName: $categorySlug }, first: $latestCount) {
      nodes {
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
            categoryId
            slug
            name
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
    }
  }
`;

export const GET_CATEGORY_PAGE = gql`
  query GET_CATEGORY_PAGE(
    $categorySlug: String
    $initialCount: Int
    $endCursor: String
  ) {
    posts: posts(
      where: { categoryName: $categorySlug }
      first: $initialCount
      after: $endCursor
    ) {
      nodes {
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
            categoryId
            slug
            name
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

      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;
export const GET_CATEGORY_PAGE_ALL = gql`
  query GET_CATEGORY_PAGE_ALL(
    $initialCount: Int
    $endCursor: String
  ) {
    posts: posts(
      first: $initialCount
      after: $endCursor
    ) {
      nodes {
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
            categoryId
            slug
            name
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

      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;

export const GET_LATEST_POST = gql`
  query GET_LATEST_POST($latestCount: Int) {
    posts: posts(first: $latestCount) {
      nodes {
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
    }
  }
`;

export const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
    posts: posts(first: 20) {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GET_ALL_POSTS {
    posts(where: { orderby: { field: DATE, order: DESC } }, first: 20) {
      edges {
        node {
          id
          date
          title
          slug
          content
          excerpt
        }
      }
    }
  }
`;

export const GET_CATEGORY_SLUGS = gql`
  query GET_CATEGORY_SLUGS {
    categories: categories {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_COUNTRY_DATA = gql`
  query GET_COUNTRY_DATA( $countryName: String ) {
    categories: categories(
      where: {nameLike: $countryName}
      first: 10
      ) {
      edges {
        node {
          id
          name
          slug
          children {
            edges {
              node {
                id
                name
                slug
                posts {
                  nodes {
                    title
                    slug
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
                }
              }
            }
          }
        }
      }
    }
    posts: posts(
      where: {categoryName: $countryName}
      first: 5
    ) {
      nodes {
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
    }
    countryMenu: categories(where: {search: $countryName}, first: 2000) {
      nodes {
        id
        name
        slug
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;

export const GET_COUNTRY_POST_SLUGS = gql`
  query GET_POST_SLUGS($countryName: String) {
    posts: posts(
      where: {categoryName: $countryName}
      first: 20
      ) {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_COUNTRY_RELATED_AND_LATEST = gql`
  query GET_RELATED_AND_LATEST($categoryId: Int, $countryName: String, $categorySlug: String, $latestCount: Int) {
    latestPosts: posts(
      where: { categoryName: $countryName }
      first: $latestCount
      ) {
      nodes {
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
    }
    relatedPosts: posts(
      where: { categoryId: $categoryId, categoryName: $categorySlug }
      first: $latestCount
    ) {
      nodes {
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
            categoryId
            slug
            name
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
    }
  }
`;

//JAPAN

export const GET_JAPAN = gql`
  query GET_JAPAN {
    categories(
      where: {name: "japan"}
      first: 10
      ) {
      edges {
        node {
          id
          name
          slug
          children {
            edges {
              node {
                id
                name
                slug
                posts {
                  nodes {
                    title
                    slug
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
                }
              }
            }
          }
        }
      }
    }
    posts: posts(
      where: {categoryName: "japan"}
      first: 5
    ) {
      nodes {
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
    }
    japanmenu: categories(where: {nameLike: "japan"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;
export const JAPAN_CATEGORY_SLUGS = gql`
query JAPAN_CATEGORY_SLUGS {
  categories(where: {nameLike: "japan"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
}`;
  export const GET_ALL_JAPAN_CATEGORY_PAGE = gql`
    query GET_ALL_JAPAN_CATEGORY_PAGE(
      $initialCount: Int
      $endCursor: String
    ) {
      posts: posts(
        where: {categoryName: "japan"}
        first: $initialCount
        after: $endCursor
      ) {
        nodes {
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
              categoryId
              slug
              name
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
  
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
      japanmenu: categories(where: {nameLike: "japan"}) {
        nodes {
          id
          name
          slug
          children {
            nodes {
              name
              slug
            }
          }
        }
      }
      ${HeaderFooter}
    }
    ${MenuFragment}
  `;

  // singapore
export const GET_SINGAPORE = gql`
query GET_SINGAPORE {
  categories(
    where: {name: "singapore"}
    first: 10
    ) {
    edges {
      node {
        id
        name
        slug
        children {
          edges {
            node {
              id
              name
              slug
              posts {
                nodes {
                  title
                  slug
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
              }
            }
          }
        }
      }
    }
  }
  posts: posts(
    where: {categoryName: "singapore"}
    first: 5
  ) {
    nodes {
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
  }
  singaporemenu: categories(where: {nameLike: "singapore"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
  ${HeaderFooter}
}
${MenuFragment}
`;
export const SINGAPORE_CATEGORY_SLUGS = gql`
query SINGAPORE_CATEGORY_SLUGS {
categories(where: {nameLike: "singapore"}) {
  nodes {
    id
    name
    slug
    children {
      nodes {
        name
        slug
      }
    }
  }
}
}`;
export const GET_ALL_SINGAPORE_CATEGORY_PAGE = gql`
  query GET_ALL_SINGAPORE_CATEGORY_PAGE(
    $initialCount: Int
    $endCursor: String
  ) {
    posts: posts(
      where: {categoryName: "singapore"}
      first: $initialCount
      after: $endCursor
    ) {
      nodes {
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
            categoryId
            slug
            name
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

      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
    singaporemenu: categories(where: {nameLike: "singapore"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;


// DUBAI
export const GET_DUBAI = gql`
  query GET_DUBAI {
    categories(
      where: {name: "dubai"}
      first: 10
      ) {
      edges {
        node {
          id
          name
          slug
          children {
            edges {
              node {
                id
                name
                slug
                posts {
                  nodes {
                    title
                    slug
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
                }
              }
            }
          }
        }
      }
    }
    posts: posts(
      where: {categoryName: "dubai"}
      first: 5
    ) {
      nodes {
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
    }
    dubaimenu: categories(where: {nameLike: "dubai"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;
export const DUBAI_CATEGORY_SLUGS = gql`
query DUBAI_CATEGORY_SLUGS {
  categories(where: {nameLike: "dubai"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
}`;
  export const GET_ALL_DUBAI_CATEGORY_PAGE = gql`
    query GET_ALL_DUBAI_CATEGORY_PAGE(
      $initialCount: Int
      $endCursor: String
    ) {
      posts: posts(
        where: {categoryName: "dubai"}
        first: $initialCount
        after: $endCursor
      ) {
        nodes {
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
              categoryId
              slug
              name
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
  
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
      dubaimenu: categories(where: {nameLike: "dubai"}) {
        nodes {
          id
          name
          slug
          children {
            nodes {
              name
              slug
            }
          }
        }
      }
      ${HeaderFooter}
    }
    ${MenuFragment}
  `;


  // QATAR
export const GET_QATAR = gql`
query GET_QATAR {
  categories(
    where: {name: "qatar"}
    first: 10
    ) {
    edges {
      node {
        id
        name
        slug
        children {
          edges {
            node {
              id
              name
              slug
              posts {
                nodes {
                  title
                  slug
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
              }
            }
          }
        }
      }
    }
  }
  posts: posts(
    where: {categoryName: "qatar"}
    first: 5
  ) {
    nodes {
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
  }
  qatarmenu: categories(where: {nameLike: "qatar"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
  ${HeaderFooter}
}
${MenuFragment}
`;
export const QATAR_CATEGORY_SLUGS = gql`
query QATAR_CATEGORY_SLUGS {
categories(where: {nameLike: "qatar"}) {
  nodes {
    id
    name
    slug
    children {
      nodes {
        name
        slug
      }
    }
  }
}
}`;
export const GET_ALL_QATAR_CATEGORY_PAGE = gql`
  query GET_ALL_QATAR_CATEGORY_PAGE(
    $initialCount: Int
    $endCursor: String
  ) {
    posts: posts(
      where: {categoryName: "qatar"}
      first: $initialCount
      after: $endCursor
    ) {
      nodes {
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
            categoryId
            slug
            name
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

      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
    qatarmenu: categories(where: {nameLike: "qatar"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;

  // BALI
  export const GET_BALI = gql`
  query GET_BALI {
    categories(
      where: {name: "bali"}
      first: 10
      ) {
      edges {
        node {
          id
          name
          slug
          children {
            edges {
              node {
                id
                name
                slug
                posts {
                  nodes {
                    title
                    slug
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
                }
              }
            }
          }
        }
      }
    }
    posts: posts(
      where: {categoryName: "bali"}
      first: 5
    ) {
      nodes {
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
    }
    balimenu: categories(where: {nameLike: "bali"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
  `;
  export const BALI_CATEGORY_SLUGS = gql`
  query BALI_CATEGORY_SLUGS {
  categories(where: {nameLike: "bali"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
  }`;
  export const GET_ALL_BALI_CATEGORY_PAGE = gql`
    query GET_ALL_BALI_CATEGORY_PAGE(
      $initialCount: Int
      $endCursor: String
    ) {
      posts: posts(
        where: {categoryName: "bali"}
        first: $initialCount
        after: $endCursor
      ) {
        nodes {
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
              categoryId
              slug
              name
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
  
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
      balimenu: categories(where: {nameLike: "bali"}) {
        nodes {
          id
          name
          slug
          children {
            nodes {
              name
              slug
            }
          }
        }
      }
      ${HeaderFooter}
    }
    ${MenuFragment}
  `;


    // MALAYSIA
    export const GET_MALAYSIA = gql`
    query GET_MALAYSIA {
      categories(
        where: {name: "malaysia"}
        first: 10
        ) {
        edges {
          node {
            id
            name
            slug
            children {
              edges {
                node {
                  id
                  name
                  slug
                  posts {
                    nodes {
                      title
                      slug
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
                  }
                }
              }
            }
          }
        }
      }
      posts: posts(
        where: {categoryName: "malaysia"}
        first: 5
      ) {
        nodes {
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
      }
      malaysiamenu: categories(where: {nameLike: "malaysia"}) {
        nodes {
          id
          name
          slug
          children {
            nodes {
              name
              slug
            }
          }
        }
      }
      ${HeaderFooter}
    }
    ${MenuFragment}
    `;
    export const MALAYSIA_CATEGORY_SLUGS = gql`
    query MALAYSIA_CATEGORY_SLUGS {
    categories(where: {nameLike: "malaysia"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    }`;
    export const GET_ALL_MALAYSIA_CATEGORY_PAGE = gql`
      query GET_ALL_MALAYSIA_CATEGORY_PAGE(
        $initialCount: Int
        $endCursor: String
      ) {
        posts: posts(
          where: {categoryName: "malaysia"}
          first: $initialCount
          after: $endCursor
        ) {
          nodes {
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
                categoryId
                slug
                name
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
    
          pageInfo {
            endCursor
            hasNextPage
            startCursor
          }
        }
        malaysiamenu: categories(where: {nameLike: "malaysia"}) {
          nodes {
            id
            name
            slug
            children {
              nodes {
                name
                slug
              }
            }
          }
        }
        ${HeaderFooter}
      }
      ${MenuFragment}
    `;

  // SAUDIARABIA
  export const GET_SAUDIARABIA = gql`
  query GET_SAUDIARABIA {
    categories(
      where: {name: "saudi-arabia"}
      first: 10
      ) {
      edges {
        node {
          id
          name
          slug
          children {
            edges {
              node {
                id
                name
                slug
                posts {
                  nodes {
                    title
                    slug
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
                }
              }
            }
          }
        }
      }
    }
    posts: posts(
      where: {categoryName: "saudi-arabia"}
      first: 5
    ) {
      nodes {
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
    }
    saudiarabiamenu: categories(where: {nameLike: "saudi-arabia"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
  `;
  export const SAUDIARABIA_CATEGORY_SLUGS = gql`
  query SAUDIARABIA_CATEGORY_SLUGS {
  categories(where: {nameLike: "saudi-arabia"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
  }`;
  export const GET_ALL_SAUDIARABIA_CATEGORY_PAGE = gql`
    query GET_ALL_SAUDIARABIA_CATEGORY_PAGE(
      $initialCount: Int
      $endCursor: String
    ) {
      posts: posts(
        where: {categoryName: "saudi-arabia"}
        first: $initialCount
        after: $endCursor
      ) {
        nodes {
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
              categoryId
              slug
              name
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
  
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
      saudiarabiamenu: categories(where: {nameLike: "saudi-arabia"}) {
        nodes {
          id
          name
          slug
          children {
            nodes {
              name
              slug
            }
          }
        }
      }
      ${HeaderFooter}
    }
    ${MenuFragment}
  `;


// SEYCHELLES
export const GET_SEYCHELLES = gql`
query GET_SEYCHELLES {
  categories(
    where: {name: "seychelles"}
    first: 10
    ) {
    edges {
      node {
        id
        name
        slug
        children {
          edges {
            node {
              id
              name
              slug
              posts {
                nodes {
                  title
                  slug
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
              }
            }
          }
        }
      }
    }
  }
  posts: posts(
    where: {categoryName: "seychelles"}
    first: 5
  ) {
    nodes {
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
  }
  seychellesmenu: categories(where: {nameLike: "seychelles"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
  ${HeaderFooter}
}
${MenuFragment}
`;
export const SEYCHELLES_CATEGORY_SLUGS = gql`
query SEYCHELLES_CATEGORY_SLUGS {
categories(where: {nameLike: "seychelles"}) {
  nodes {
    id
    name
    slug
    children {
      nodes {
        name
        slug
      }
    }
  }
}
}`;
export const GET_ALL_SEYCHELLES_CATEGORY_PAGE = gql`
  query GET_ALL_SEYCHELLES_CATEGORY_PAGE(
    $initialCount: Int
    $endCursor: String
  ) {
    posts: posts(
      where: {categoryName: "seychelles"}
      first: $initialCount
      after: $endCursor
    ) {
      nodes {
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
            categoryId
            slug
            name
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

      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
    seychellesmenu: categories(where: {nameLike: "seychelles"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;

// UK
export const GET_UK = gql`
query GET_UK {
  categories(
    where: {name: "uk"}
    first: 10
    ) {
    edges {
      node {
        id
        name
        slug
        children {
          edges {
            node {
              id
              name
              slug
              posts {
                nodes {
                  title
                  slug
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
              }
            }
          }
        }
      }
    }
  }
  posts: posts(
    where: {categoryName: "uk"}
    first: 5
  ) {
    nodes {
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
  }
  ukmenu: categories(where: {nameLike: "uk"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
  ${HeaderFooter}
}
${MenuFragment}
`;
export const UK_CATEGORY_SLUGS = gql`
query UK_CATEGORY_SLUGS {
categories(where: {nameLike: "uk"}) {
  nodes {
    id
    name
    slug
    children {
      nodes {
        name
        slug
      }
    }
  }
}
}`;
export const GET_ALL_UK_CATEGORY_PAGE = gql`
  query GET_ALL_UK_CATEGORY_PAGE(
    $initialCount: Int
    $endCursor: String
  ) {
    posts: posts(
      where: {categoryName: "uk"}
      first: $initialCount
      after: $endCursor
    ) {
      nodes {
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
            categoryId
            slug
            name
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

      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
    ukmenu: categories(where: {nameLike: "uk"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;


// SAUDI ARABIA
export const GET_SAUDI_ARABIA = gql`
query GET_UK {
  categories(
    where: {name: "SAUDI ARABIA"}
    first: 10
    ) {
    edges {
      node {
        id
        name
        slug
        children {
          edges {
            node {
              id
              name
              slug
              posts {
                nodes {
                  title
                  slug
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
              }
            }
          }
        }
      }
    }
  }
  posts: posts(
    where: {categoryName: "SAUDI ARABIA"}
    first: 5
  ) {
    nodes {
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
  }
  saudimenu: categories(where: {nameLike: "SAUDI"}) {
    nodes {
      id
      name
      slug
      children {
        nodes {
          name
          slug
        }
      }
    }
  }
  ${HeaderFooter}
}
${MenuFragment}
`;
export const SAUDI_ARABIA_CATEGORY_SLUGS = gql`
query UK_CATEGORY_SLUGS {
categories(where: {nameLike: "SAUDI"}) {
  nodes {
    id
    name
    slug
    children {
      nodes {
        name
        slug
      }
    }
  }
}
}`;
export const GET_ALL_SAUDI_ARABIA_CATEGORY_PAGE = gql`
  query GET_ALL_UK_CATEGORY_PAGE(
    $initialCount: Int
    $endCursor: String
  ) {
    posts: posts(
      where: {categoryName: "SAUDI ARABIA"}
      first: $initialCount
      after: $endCursor
    ) {
      nodes {
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
            categoryId
            slug
            name
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

      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
    saudimenu: categories(where: {nameLike: "SAUDI"}) {
      nodes {
        id
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
    ${HeaderFooter}
  }
  ${MenuFragment}
`;

