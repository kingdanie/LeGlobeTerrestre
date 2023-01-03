import { gql } from "@apollo/client";
import { HeaderFooter } from "./posts/get-menus";
import { PostContentFragment } from "../fragments/post-fragment";
import MenuFragment from "../fragments/menus";
export const GET_HOMEPAGE_DATA_QUERY = gql`
query GET_HOMEPAGE_DATA {
  posts: posts(first: 7) {
    nodes {
      ...PostContentFragment
    }
  }
  attractions: posts(where: { categoryName: "ATTRACTIONS" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  eat: posts(where: { categoryName: "EAT" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  drink: posts(where: { categoryName: "DRINK" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  tips: posts(where: { categoryName: "TIPS" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  accomodations: posts(where: { categoryName: "ACCOMMODATIONS" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  toursAndEvents: posts(where: { categoryName: "TOURS & EVENTS" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  japan: posts(where: { categoryName: "japan" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  bali: posts(where: { categoryName: "bali" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  dubai: posts(where: { categoryName: "dubai" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  qatar: posts(where: { categoryName: "qatar" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  malaysia: posts(where: { categoryName: "malaysia" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  seychelles: posts(where: { categoryName: "seychelles" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  singapore: posts(where: { categoryName: "singapore" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  saudiArabia: posts(where: { categoryName: "saudi-arabia" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  uk: posts(where: { categoryName: "uk" }, first: 5) {
    nodes {
      ...PostContentFragment
    }
  }
  ${HeaderFooter}
}
  ${PostContentFragment}
  ${MenuFragment}
`;
