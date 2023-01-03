import dynamic from "next/dynamic";

import Head from "next/head";
import { useEffect, useState } from "react";
import BlogList from "../components/blog/BlogList";
import DomainList from "../components/blog/DomainList";
import PopularAndRecent from "../components/blog/PopularAndRecentSection";
import HeroSection from "../components/home/HeroSection";
import AccentHorizontalBar from "../components/shared/AccentHorizontalBar";

import VerticalAddSpot from "../components/shared/ads/VerticalAddSpot";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import client from "../lib/apollo/client";
import { GET_HOMEPAGE_DATA_QUERY } from "../lib/apollo/queries/get-home-page-content";
import VisibilitySensor from "react-visibility-sensor";
import LeftAccentedH2Text from "../components/shared/LeftAccentedH2Text";

const HorizontalAdSpot = dynamic(
  () => import("../components/shared/ads/HorizontalAdSpot"),
  {
    ssr: false,
  }
);

export default function Home({ data }) {
  const [isHeroVisible, setHeroVisibility] = useState(true);

  return (
    <>
      <Header
        fixedHeight={true}
        isAbsolute={true}
        menuData={data?.menus}
        showAdSpace={false}
      />
      <VisibilitySensor partialVisibility={true} onChange={(vis) => setHeroVisibility(vis)}>
        <HeroSection
          data={data?.menus}
          post={[...data?.latestPost?.nodes][0] || {}}
        />
      </VisibilitySensor>
      <div id="page-wrapper" className="w-full mx-auto p-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-3 overflow-hidden">
            <div className="my-3 px-3 w-full overflow-hidden md:w-3/4">
              <section className="mb-16">
                <BlogList
                  showCategory={false}
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
                        <section key={i}>
                          <div className="my-8">
                            <PopularAndRecent
                              posts={data?.categoryList[category] || []}
                              title={category}
                              categorySlug={category}
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


<div className="mb-8">
                <LeftAccentedH2Text
                  text="Country Specific Articles"
                  isCapitalize={true}
                />
              </div>

              <section className="mb-8">


                {data?.domainList ? (
                  <>
                    {Object.keys(
                      data?.domainList || {}
                    ).map((category, i) => {
                      console.log(
                        "domain",
                        category,
                        "==>",
                        data?.domainList?.[category]?.nodes
                      );
                      if (category != null) {
                        return (
                          data?.domainList?.[category]
                            ?.nodes.length > 0 && (
                            <section key={i}>
                              <div className="my-8">
                                <DomainList
                
                                  postList={{
                                    nodes:
                                      data?.domainList?.[
                                        category
                                      ]?.nodes.filter(
                                        (x, i) => x != null
                                      ) || [],
                                  }}
                                  name={category}
                                />
                              </div>
                              {/* <HorizontalAdSpot /> */}
                            </section>
                          )
                        );
                      }
                    })}
                  </>
                ) : (
                  <></>
                )}
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
      <Footer data={data?.menus} />
    </>
  );
}

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_HOMEPAGE_DATA_QUERY,
  });

  console.log(`======data===`, data)
  const {
    posts: latestPosts,
    attractions,
    eat,
    drink,
    tips,
    accomodations,
    toursAndEvents,
    japan,
    bali,
    dubai,
    qatar,
    malaysia,
    singapore,
    seychelles,
    saudiArabia,
    uk,
    header,
    headerMenus,
    footerMenus,
    footer,
    subDomains,
  } = data || {};

  const homePageData = {
    latestPost: latestPosts || null,
    categoryList: {
      attractions: attractions || null,
      accomodations: accomodations || null,
      drinks: drink || null,
      eat: eat || null,
      tips: tips || null,
      "Tours And Events": toursAndEvents || null,
    },
    domainList: {
      japan: japan || null,
      bali: bali || null,
      dubai: dubai || null,
      qatar: qatar || null,
      malaysia: malaysia || null,
      singapore: singapore || null,
      seychelles: seychelles || null,
      "saudi-arabia": saudiArabia || null,
      uk: uk || null,
    },
    menus: {
      header: header || null,
      headerMenus: headerMenus || null,
      footerMenus: footerMenus || null,
      footer: footer || null,
      subDomains: subDomains?.nodes || null,
    },
  };

  return {
    props: {
      data: homePageData || {},
    },
    revalidate: 5,
  };
}
