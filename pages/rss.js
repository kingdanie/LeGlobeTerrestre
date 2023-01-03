import React from "react";
import client from "../lib/apollo/client";
import { GET_ALL_POSTS } from "../lib/apollo/queries/posts/get-posts";
import { generateRSSFeed } from "../lib/utils";

export default function RSS() {
  return <div></div>;
}

export async function getServerSideProps(context) {
  const { res } = context;
  let rssFeed = "";
  try {
    const { data, error } = await client.query({
      query: GET_ALL_POSTS,
    });

    rssFeed = generateRSSFeed(data.posts.edges.map((post) => post.node));
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }

  res.writeHead(200, { "Content-Type": "text/xml; charset=utf-8" });
  res.write(rssFeed);
  res.end();
  return { props: {} };
}
