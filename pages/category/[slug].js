import React, { useEffect, useState } from "react";
import client from "../../lib/apollo/client";
import {
  GET_CATEGORY_PAGE_ALL,
  GET_CATEGORY_SLUGS,
  GET_POST_SLUGS,
} from "../../lib/apollo/queries/posts/get-posts";
import { GET_POST } from "../../lib/apollo/queries/posts/get-post";
import { isEmpty } from "lodash";
import { sanitize } from "../../lib/utils";
import PostLayout from "../../components/layouts/post-layout";
import { GET_MENUS } from "../../lib/apollo/queries/posts/get-menus";
import { GET_CATEGORY_PAGE } from "../../lib/apollo/queries/posts/get-posts";
import CategoryItem from "../../components/blog/CategoryItem";
import CategoryListLayout from "../../components/layouts/category-layout";
import LeftAccentedH2Text from "../../components/shared/LeftAccentedH2Text";
import { useLazyQuery } from "@apollo/client";
import CategoryList from "../../components/blog/CategoryList";

export default function CategoryPage({ data = {}, footerMenus, categoryName }) {
  return (
    <CategoryListLayout footerMenus={footerMenus}>
      <CategoryList
        categoryName={categoryName}
        data={data}
        isAll={categoryName == "all"}
      />
    </CategoryListLayout>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const categoryData = await  client.query({
    query: slug == "all" ? GET_CATEGORY_PAGE_ALL : GET_CATEGORY_PAGE,
    variables: {
      initialCount: 10,
      categorySlug: slug,
    },
  });

  const {posts, header, headerMenus, footerMenus, footer, subDomains} = categoryData?.data

  console.log(`caregorydata -->`, categoryData);
  const defaultProps = {
    props: {
      data: posts || {},
      footerMenus:{
        header: header || null,
        headerMenus: headerMenus || null,
        footerMenus: footerMenus || null,
        footer: footer || null,
        subDomains: subDomains?.nodes,
      },
      categoryName: slug || null,
    },
    revalidate: 5,
  };

  return defaultProps;
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_CATEGORY_SLUGS,
  });

  const pathsData = [];

  data?.categories?.nodes &&
    data?.categories?.nodes.map((category) => {
      if (!isEmpty(category?.slug)) {
        pathsData.push({ params: { slug: category?.slug } });
      }
    });

  // add all  category
  pathsData.push({ params: { slug: "all" } });

  return {
    paths: pathsData,
    fallback: true,
  };
}
