import { gql } from "@apollo/client";
import { HeaderFooter } from "./posts/get-menus";
import { PostContentFragment } from "../fragments/post-fragment";
import MenuFragment from "../fragments/menus";
export const GET_BALI_HOMEPAGE_DATA_QUERY = gql`
query GET_BALI_HOMEPAGE_DATA {
  posts: posts(where: { categoryName: "BALI" }, first: 7) {
    nodes {
      ...PostContentFragment
    }
  }
  attractions: posts(where: { categoryName: "ATTRACTIONS-BALI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  eat: posts(where: { categoryName: "EAT-BALI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  drink: posts(where: { categoryName: "DRINK-BALI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  tips: posts(where: { categoryName: "TIPS-BALI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  accomodations: posts(where: { categoryName: "ACCOMMODATIONS-BALI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  toursAndEvents: posts(where: { categoryName: "TOURS-EVENTS-BALI" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  ${HeaderFooter}
}
  ${PostContentFragment}
  ${MenuFragment}
`;
