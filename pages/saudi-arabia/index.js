import dynamic from "next/dynamic";

import Head from "next/head";
import { useEffect, useState } from "react";
import DBlogList from "../../components/blog/DBlogList";
import DomainList from "../../components/blog/DomainList";
import DPopularAndRecent from "../../components/blog/DPopularAndRecentSection";
import DHeroSection from "../../components/home/DHeroSection";
import AccentHorizontalBar from "../../components/shared/AccentHorizontalBar";

import VerticalAddSpot from "../../components/shared/ads/VerticalAddSpot";
import DFooter from "../../components/shared/DFooter";
import DHeader from "../../components/shared/DHeader";
import client from "../../lib/apollo/client";
import { GET_SAUDI_ARABIA_HOMEPAGE_DATA_QUERY } from "../../lib/apollo/queries/get-saudi-arabia-home-page-content";
import VisibilitySensor from "react-visibility-sensor";
import LeftAccentedH2Text from "../../components/shared/LeftAccentedH2Text";

const HorizontalAdSpot = dynamic(
  () => import("../../components/shared/ads/HorizontalAdSpot"),
  {
    ssr: false,
  }
);

export default function SaudiHome({ data }) {
  const [isHeroVisible, setHeroVisibility] = useState(true);

  return (
    <>


      <DHeader
        fixedHeight={true}
        isAbsolute={true}
        menuData={data?.menus}
        showAdSpace={false}
      />
      <VisibilitySensor partialVisibility={true} onChange={(vis) => setHeroVisibility(vis)}>
        <DHeroSection
          data={data?.menus}
          post={[...data?.latestPost?.nodes][0] || {}}
        />
      </VisibilitySensor>
      <div id="page-wrapper" className="w-full mx-auto p-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-3 overflow-hidden">
            <div className="my-3 px-3 w-full overflow-hidden md:w-3/4">
            <div className="mb-8">
                <LeftAccentedH2Text
                  text="Holivoo Saudi Arabia"
                  isCapitalize={true}
                />
            </div>
              <section className="mb-16">
                <DBlogList
                  name={data.domain}
                  postList={{
                    nodes:
                      [...data?.latestPost?.nodes].filter(
                        (x, i) => x != null && i != 0
                      ) || [],
                  }}
                />
              </section>
              <HorizontalAdSpot />

              {data?.categoryList ? (
                <>
                  {Object.keys(data?.categoryList || {}).map((category, i) => {
                    if (category != null) {
                      return (
                        data?.categoryList?.[category]?.nodes.length > 0 &&
                        <section key={i}>
                          <div className="my-8">
                            <DPopularAndRecent
                              name={data.domain}
                              posts={data?.categoryList[category] || []}
                              title={category}
                              categorySlug={`${category}-${data.domain}`}
                            />
                          </div>
                          <HorizontalAdSpot />
                        </section>
                      );
                    }
                  })}
                </>
              ) : (
                <></>
              )}




              <section className="mb-8">

              </section>
            </div>

            <div className="my-3 px-3 w-full md:w-1/4  relative">
              <div
                className={`w-full ${isHeroVisible ? "sm:relative" : "sm:fixed sm:top-0"}`}
                style={{ height: "calc(100vh - 200px)" }}
              >
                <AccentHorizontalBar w="w-16" />
                <div className="w-full">
                  <VerticalAddSpot />
                  {/* <VerticalAddSpot /> */}
                  {/* <VerticalAddSpot /> */}
                  {/* <HorizontalAdSpot/> */}
                </div>
                {/* <VerticalAddSpot />
                <VerticalAddSpot />
                <VerticalAddSpot /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DFooter data={data?.menus} />
    </>
  );
}

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_SAUDI_ARABIA_HOMEPAGE_DATA_QUERY,
  });

  const {
    posts: latestPosts,
    attractions,
    eat,
    drink,
    tips,
    accomodations,
    toursAndEvents,
    header,
    headerMenus,
    footerMenus,
    footer,
    subDomains,
  } = data || {};

  console.log(data)

  const homePageData = {
    domain: "saudi-arabia",
    latestPost: latestPosts || null,
    categoryList: {
      attractions: attractions || null,
      accomodations: accomodations || null,
      drinks: drink || null,
      eat: eat || null,
      tips: tips || null,
      'Tours And  Events': toursAndEvents || null,
    },
    menus: {
      header: header || null,
      headerMenus: headerMenus || null,
      footerMenus: footerMenus || null,
      footer: footer || null,
      subDomains: subDomains?.nodes || null,
      name: "saudi-arabia"
    },
  };


  return {
    props: {
      data: homePageData || {},
    },
    revalidate: 5,
  };
}
