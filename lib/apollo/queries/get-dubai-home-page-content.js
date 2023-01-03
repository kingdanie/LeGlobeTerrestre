import { gql } from "@apollo/client";
import { HeaderFooter } from "./posts/get-menus";
import { PostContentFragment } from "../fragments/post-fragment";
import MenuFragment from "../fragments/menus";
export const GET_DUBAI_HOMEPAGE_DATA_QUERY = gql`
query GET_DUBAI_HOMEPAGE_DATA {
  posts: posts(where: { categoryName: "DUBAI" }, first: 7) {
    nodes {
      ...PostContentFragment
    }
  }
  attractions: posts(where: { categoryName: "ATTRACTIONS-DUBAI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  eat: posts(where: { categoryName: "EAT-DUBAI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  drink: posts(where: { categoryName: "DRINK-DUBAI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  tips: posts(where: { categoryName: "TIPS-DUBAI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  accomodations: posts(where: { categoryName: "ACCOMMODATIONS-DUBAI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  toursAndEvents: posts(where: { categoryName: "TOURS-EVENTS-DUBAI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  ${HeaderFooter}
}
  ${PostContentFragment}
  ${MenuFragment}
`;
