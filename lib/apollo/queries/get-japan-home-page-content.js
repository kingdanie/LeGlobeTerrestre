import { gql } from "@apollo/client";
import { HeaderFooter } from "./posts/get-menus";
import { PostContentFragment } from "../fragments/post-fragment";
import MenuFragment from "../fragments/menus";
export const GET_JAPAN_HOMEPAGE_DATA_QUERY = gql`
query GET_JAPAN_HOMEPAGE_DATA {
  posts: posts(where: { categoryName: "JAPAN" }, first: 7) {
    nodes {
      ...PostContentFragment
    }
  }
  attractions: posts(where: { categoryName: "ATTRACTIONS-JAPAN" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  eat: posts(where: { categoryName: "EAT-JAPAN" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  drink: posts(where: { categoryName: "DRINK-JAPAN" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  tips: posts(where: { categoryName: "TIPS-JAPAN" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  accomodations: posts(where: { categoryName: "ACCOMMODATIONS-JAPAN" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  toursAndEvents: posts(where: { categoryName: "TOURS-EVENTS-JAPAN" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  ${HeaderFooter}
}
  ${PostContentFragment}
  ${MenuFragment}
`;
