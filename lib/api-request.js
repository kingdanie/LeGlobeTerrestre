import client from "./apollo/client";
import { GET_MENUS } from "./apollo/queries/posts/get-menus";
import {
  GET_LATEST_POST,
  GET_POST_BY_CATEGORY,
} from "./apollo/queries/posts/get-posts";

export async function getHomePageData() {
  try {
    const [
      latestPost,
      socialList,
      entertainmentList,
      businessList,
      healthList,
      sportsList,
      lifestyleList,
      politicsList,
      headerFooter,
    ] = await Promise.all([
      client.query({
        query: GET_LATEST_POST,
        variables: {
          latestCount: 7,
        },
      }),
      client.query({
        query: GET_POST_BY_CATEGORY,
        variables: {
          latestCount: 4,
          categorySlug: "social",
        },
      }),
      client.query({
        query: GET_POST_BY_CATEGORY,
        variables: {
          latestCount: 4,
          categorySlug: "entertainment",
        },
      }),
      client.query({
        query: GET_POST_BY_CATEGORY,
        variables: {
          latestCount: 4,
          categorySlug: "business",
        },
      }),
      client.query({
        query: GET_POST_BY_CATEGORY,
        variables: {
          latestCount: 4,
          categorySlug: "health",
        },
      }),
      client.query({
        query: GET_POST_BY_CATEGORY,
        variables: {
          latestCount: 4,
          categorySlug: "sports",
        },
      }),
      client.query({
        query: GET_POST_BY_CATEGORY,
        variables: {
          latestCount: 4,
          categorySlug: "lifestyle",
        },
      }),
      client.query({
        query: GET_POST_BY_CATEGORY,
        variables: {
          latestCount: 4,
          categorySlug: "politics",
        },
      }),
      client.query({
        query: GET_MENUS,
      }),
    ]);

    const homePageData = {
      latestPost: latestPost?.data || null,
      categoryList: {
        social: socialList?.data || null,
        entertainment: entertainmentList?.data || null,
        business: businessList?.data || null,
        health: healthList?.data || null,
        sports: sportsList?.data || null,
        lifestyle: lifestyleList?.data || null,
        politics: politicsList?.data || null,
      },
      menus: headerFooter?.data || null,
    };

    return homePageData;
  } catch (error) {

    return null;
  }
}
