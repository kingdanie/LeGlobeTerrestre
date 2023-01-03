import React, { useEffect, useState } from "react";
import client from "../../../lib/apollo/client";
import {
  GET_ALL_MALAYSIA_CATEGORY_PAGE,
  MALAYSIA_CATEGORY_SLUGS,
} from "../../../lib/apollo/queries/posts/get-posts";
import { isEmpty } from "lodash";
import { GET_CATEGORY_PAGE } from "../../../lib/apollo/queries/posts/get-posts";
import DCategoryListLayout from "../../../components/layouts/dcategory-layout";
import DCategoryList from "../../../components/blog/DCategoryList";

export default function MalaysiaCategoryPage({ data = {}, footerMenus, categoryName }) {
  return (
    <DCategoryListLayout footerMenus={footerMenus}>
      <DCategoryList
      name={footerMenus.name}
        categoryName={categoryName}
        data={data}
        isAll={categoryName == "all"}
      />
    </DCategoryListLayout>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  console.log(`this is the slug`, slug)
  const { data, error } = await  client.query({
    query: slug == "all" ? GET_ALL_MALAYSIA_CATEGORY_PAGE : GET_CATEGORY_PAGE,
    variables: {
      initialCount: 10,
      categorySlug: slug,
    },
  });

  const {posts, header, headerMenus, footerMenus, footer, subDomains} = data

  console.log(`caregorydata -->`, data);
  const defaultProps = {
    props: {
      data: posts || {},
      footerMenus:{
        header: header || null,
        headerMenus: headerMenus || null,
        footerMenus: footerMenus || null,
        footer: footer || null,
        subDomains: subDomains?.nodes,
        name: "malaysia"
      },
      categoryName: slug || null,
    },
    revalidate: 5,
  };

  return defaultProps;
}

export async function getStaticPaths() {
  const { data, error } = await client.query({
    query: MALAYSIA_CATEGORY_SLUGS,
  });

  // console.log(`=====data====`, data.categories?.nodes[0]?.children?.nodes)

  const pathsData = [];

  data?.categories?.nodes[0]?.children?.nodes &&
    data?.categories?.nodes[0]?.children?.nodes.map((category) => {
      if (!isEmpty(category?.slug)) {
        pathsData.push({ params: { slug: category?.slug } });
      }
    });

  // add all  category
  pathsData.push({ params: { slug: "all" } });
    // console.log(`=====paths===`, pathsData)
  return {
    paths: pathsData,
    fallback: true,
  };
}
