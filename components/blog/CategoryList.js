import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  GET_CATEGORY_PAGE,
  GET_CATEGORY_PAGE_ALL,
} from "../../lib/apollo/queries/posts/get-posts";
import LeftAccentedH2Text from "../shared/LeftAccentedH2Text";
import CategoryItem from "./CategoryItem";

const CategoryHorizontalAdSpot = dynamic(
  () => import("../shared/ads/CategoryHorizontalAdSpot"),
  {
    ssr: true,
  }
);

export default function CategoryList({ categoryName, data, isAll }) {
  const [postsData, setPostsData] = useState(data?.nodes || []);
  const [pageInfo, setPageInfo] = useState(data?.pageInfo || {});

  const { endCursor, hasNextPage } = pageInfo || {};

  useEffect(() => {}, [endCursor]);

  useEffect(() => {
    if (data) {
      setPostsData(data?.nodes);
      setPageInfo(data?.pageInfo);
    }
  }, [data]);

  const setPosts = (posts) => {
    if (!posts || !posts?.nodes || !posts?.pageInfo) {
      return;
    }

    const newPosts = postsData.concat(posts?.nodes);
    setPostsData(newPosts);
    setPageInfo({ ...posts?.pageInfo });
  };

  const [fetchPosts, { loading }] = useLazyQuery(
    isAll ? GET_CATEGORY_PAGE_ALL : GET_CATEGORY_PAGE,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setPosts(data?.posts ?? []);
      },
      onError: (error) => {
        // setError(error?.graphQLErrors ?? "");
        // console.log(`grapgr qierl erro ==>`, error?.graphQLErrors);
      },
    }
  );

  const loadMoreItems = (endCursor = null) => {
    fetchPosts({
      variables: {
        categorySlug: categoryName,
        initialCount: 10,
        endCursor: endCursor,
      },
    });
  };

  return (
    <>
      <div className="my-8">
        <LeftAccentedH2Text text={categoryName || ""} isCapitalize />
      </div>

      <div className="flex flex-col">
        {postsData ? (
          <>
            {postsData.map((post, i) => {
              return (
                <>
                  <CategoryItem key={i} post={post} />
                  {(i + 1) % 5 == 0 && <CategoryHorizontalAdSpot key={i+20} />}{" "}
                </>
              );
            })}

            {hasNextPage ? (
              <div className="w-full flex justify-center lg:my-10">
                {loading ? (
                  <div className="flex justify-center w-full border border-white px-3 py-2 my-8">
                    Loading...
                  </div>
                ) : (
                  <button
                    className="flex items-center bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors duration-500 border border-gray-500 px-4 py-3"
                    onClick={() => loadMoreItems(endCursor)}
                  >
                    Load more
                  </button>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
