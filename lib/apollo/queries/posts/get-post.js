import { gql } from "@apollo/client";
import MenuFragment from "../../fragments/menus";
import SeoFragment from "../../fragments/seo-fragment";
import { HeaderFooter } from "./get-menus";

export const GET_POST = gql`
  query GET_POST($uri: String) {
    post: postBy(uri: $uri) {
      id
      excerpt
      slug
      uri
      title
      content
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
      seo {
        ...SeoFragment
      }
    }
    ${HeaderFooter}
  }
  ${SeoFragment}
  ${MenuFragment}
`;



export const GET_COUNTRY_POST = gql`
  query GET_COUNTRY_POST($uri: String, $countryName: String) {
    post: postBy(uri: $uri) {
      id
      excerpt
      slug
      uri
      title
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories(where: {search:  $countryName}) {
        nodes {
          categoryId
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
      seo {
        ...SeoFragment
      }
    }
    ${HeaderFooter}
  }
  ${SeoFragment}
  ${MenuFragment}
`;

