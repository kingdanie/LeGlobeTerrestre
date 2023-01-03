import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import client from "../../lib/apollo/client";
import {
  GET_COUNTRY_POST_SLUGS,
  GET_COUNTRY_RELATED_AND_LATEST,
} from "../../lib/apollo/queries/posts/get-posts";
import { GET_POST, GET_COUNTRY_POST } from "../../lib/apollo/queries/posts/get-post";
import { isEmpty } from "lodash";
import { handlePlaceholderImageIfNeeded, sanitize } from "../../lib/utils";
import DPostLayout from "../../components/layouts/dpost-layout";
import { GET_MENUS } from "../../lib/apollo/queries/posts/get-menus";
import { useLazyQuery } from "@apollo/client";

import AccentHorizontalBar from "../../components/shared/AccentHorizontalBar";
import BlogSmallItem from "../../components/blog/BlogSmallItem";
import { useRouter } from "next/router";
import PageSpinner from "../../components/shared/PageSpinner";
import Seo from "../../components/shared/SEO";
import Head from "next/head";
import VisibilitySensor from "react-visibility-sensor";
import SocialShareIcons from "../../components/shared/SocialShareIcons";

const HorizontalAdSpot = dynamic(
  () => import("../../components/shared/ads/HorizontalAdSpot"),
  {
    ssr: false,
  }
);

const InArticleAdSpot = dynamic(
  () => import("../../components/shared/ads/InArticleAds"),
  {
    ssr: false,
  }
);

export default function DubaiPost({ data, country, categoryId, footerMenus }) {
  const [category, setCategory] = useState(null);
  const [isTitleVisble, setTitleVisibilityStatus] = useState(true);

  // const [data, setPostItem] = useState(null);

  const router = useRouter();

  // useEffect(() => {
  //   if (Object.keys(data || {}).length > 0) {
  //     setPostItem(data);
  //   }
  // }, [data]);

  const [relatedPost, setRelatedPost] = useState([]);

  const [latestPost, setLatestPost] = useState([]);

  const getCategory = (categories) => {
    let categoryItems = categories?.nodes?.map((x) => ({
      name: x?.name,
      slug: x?.slug,
    }));
    const categoryItem = categoryItems[0];
    fetchPosts({
      variables: {
        categoryId: categoryId,
        countryName: country,
        categorySlug: categoryItem.slug,
        latestCount: 10,
      },
    });
    setCategory(categoryItem);
  };

  useEffect(() => {
    if (data && data["categories"]) {
      getCategory(data["categories"]);
    }
  }, [data]);

  const setPosts = (posts) => {
    if (!posts || !posts?.latestPosts || !posts?.relatedPosts) {
      return;
    }

    const relatedPostItems = posts.relatedPosts?.nodes
      .filter((x) => x.id != data.id)
      .sort(() => Math.random() - 0.5)
      .filter((x, i) => i < 4);

    const latestPostItems = posts.latestPosts?.nodes
      .filter((x) => x.id != data.id)
      .sort(() => Math.random() - 0.5)
      .filter((x, i) => i < 4);

    setRelatedPost(relatedPostItems || []);
    setLatestPost(latestPostItems || []);
  };

  const [fetchPosts, { loading }] = useLazyQuery(GET_COUNTRY_RELATED_AND_LATEST, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setPosts(data);
    },
    onError: (error) => {
      // setError(error?.graphQLErrors ?? "");
      // console.log(`grapgr qierl erro ==>`, error?.graphQLErrors);
    },
  });

  if (data == null) {
    return null;
  }

  return (
    <>
      {data && (
        <Seo
          seo={data?.seo || {}}
          uri={data.slug || {}}
          postImage={handlePlaceholderImageIfNeeded(
            data?.featuredImage?.node.mediaItemUrl
          )}
        />
      )}
      <Head>
        {data?.seo?.schemaDetails ? (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            key="yoastSchema"
            dangerouslySetInnerHTML={{
              __html: sanitize(data?.seo.schemaDetails),
            }}
          />
        ) : null}
      </Head>
      <DPostLayout
        title={sanitize(data?.title) || ""}
        featuredImage={data?.featuredImage?.node.mediaItemUrl}
        footerMenus={footerMenus}
        isScrollSidebar={isTitleVisble}
      >
        <div className="mb-4 bg-white">
          <VisibilitySensor
            partialVisibility={true}
            onChange={(vis) => setTitleVisibilityStatus(vis)}
          >
            <>
              <h1
                id="post-title"
                className="font-extrabold text-3xl md:text-6xl sm:mb-12 "
                dangerouslySetInnerHTML={{ __html: sanitize(data?.title) }}
              ></h1>
              <div className="my-3 block sm:hidden">
                <SocialShareIcons />
              </div>
            </>
          </VisibilitySensor>

          <div className="my-4">
            {category && (
              <span className=" h-full flex items-center font-bold text-black uppercase  pl-3 border-l-2 border-accent-color">
                {category?.name}
              </span>
            )}
          </div>
          <InArticleAdSpot />
          <article
            id="post-content"
            className="py-2 max-w-full prose md:prose-lg"
            dangerouslySetInnerHTML={{
              __html: sanitize(data?.content || ""),
            }}
          ></article>
        </div>

        <div className="w-full my-6">
          <AccentHorizontalBar w={"w-24"} />
          <h3 className="uppercase font-bold text-xl my-6">Related Post</h3>
          <div className="flex flex-wrap -mx-6 overflow-hidden -my-6">
            {relatedPost.map((post, index) => (
              <div
                key={index}
                className="my-6 px-6 w-full overflow-hidden xl:w-1/2"
              >
                <BlogSmallItem hideAuthor post={post} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <HorizontalAdSpot />{" "}
        </div>
        <div className="w-full my-6">
          <AccentHorizontalBar w={"w-24"} />
          <h3 className="uppercase font-bold text-xl my-6">Latest Post</h3>
          <div className="flex flex-wrap -mx-6 overflow-hidden -my-6">
            {latestPost.map((post, index) => (
              <div
                key={index}
                className="my-6 px-6 w-full overflow-hidden xl:w-1/2"
              >
                <BlogSmallItem hideAuthor post={post} />
              </div>
            ))}
          </div>
        </div>
      </DPostLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { data, error} = await client.query({
    query: GET_COUNTRY_POST,
    variables: {
      uri: params?.slug ?? "/",
      countryName: "dubai"
    },
  });

  // console.log(`postData ==>0`, data.post.categories);

  const { header, headerMenus, footerMenus, footer, subDomains, post } = data;

  const defaultProps = {
    props: {
      data: post || {},
      country: "dubai",
      categoryId: data?.post?.categories?.nodes[0]?.categoryId || null,
      footerMenus: {
        header: header || null,
        headerMenus: headerMenus || null,
        footerMenus: footerMenus || null,
        footer: footer || null,
        subDomains: subDomains?.nodes || null,
        name: 'dubai',
      },
    },
    revalidate: 5,
  };

  // console.log(`props ==>`, defaultProps);

  return defaultProps;
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_COUNTRY_POST_SLUGS,
    variables: {
      countryName: "dubai",
    },
  });
 //console.log(`=====all country posts`, data?.posts?.nodes)
  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((post) => {
      if (!isEmpty(post?.slug)) {
        pathsData.push({ params: { slug: post?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
