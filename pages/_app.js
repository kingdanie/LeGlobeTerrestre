import "../styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo/client";
import Router, { useRouter } from "next/router";
import PageSpinner from "../components/shared/PageSpinner";
import { useEffect } from "react";
import { useSideMenu, SideNavBarProvider } from "../lib/side-menu-hook";
import GoogleTagManager from "../components/GoogleTagManager";

import NProgress from "nprogress";
import { DefaultSeo } from "next-seo";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.isFallback) {
    return <PageSpinner />;
  }

  return (
    <>
      <ApolloProvider client={client}>
        <DefaultSeo
          defaultTitle={process.env.NEXT_PUBLIC_APP_SITE_TITLE || ""}
          description={process.env.NEXT_PUBLIC_APP_SITE_DESCRIPTION || ""}
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://LeGlobeTerrestreivoo.com/",
            site_name: "Le Globe Terrestre Ekspres",
          }}
        />
        <GoogleTagManager>
          <SideNavBarProvider>
            <Component {...pageProps} />
          </SideNavBarProvider>
        </GoogleTagManager>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
