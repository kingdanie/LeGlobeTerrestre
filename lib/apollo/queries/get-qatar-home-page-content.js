import { gql } from "@apollo/client";
import { HeaderFooter } from "./posts/get-menus";
import { PostContentFragment } from "../fragments/post-fragment";
import MenuFragment from "../fragments/menus";
export const GET_QATAR_HOMEPAGE_DATA_QUERY = gql`
query GET_QATAR_HOMEPAGE_DATA {
  posts: posts(where: { categoryName: "QATAR" }, first: 7) {
    nodes {
      ...PostContentFragment
    }
  }
  attractions: posts(where: { categoryName: "ATTRACTIONS-QATAR" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  eat: posts(where: { categoryName: "EAT-QATAR" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  drink: posts(where: { categoryName: "DRINK-QATAR" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  tips: posts(where: { categoryName: "TIPS-QATAR" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  accomodations: posts(where: { categoryName: "ACCOMMODATIONS-QATAR" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  toursAndEvents: posts(where: { categoryName: "TOURS-EVENTS-QATAR" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  ${HeaderFooter}
}
  ${PostContentFragment}
  ${MenuFragment}
`;
