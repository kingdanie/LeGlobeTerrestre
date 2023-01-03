import { NextSeo } from "next-seo";

const Seo = ({ seo, uri, postImage }) => {
  const {
    title,
    metaDesc,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphDescription,
    opengraphTitle,
    opengraphImage,
    opengraphSiteName,
  } = seo;


  // console.log(`SEO Detaiks ===>`, seo)

  const currentLocation = process.browser ? window.location.origin : null;
  const opengraphUrl =
    (process.env.NEXT_PUBLIC_APP_URL
      ? process.env.NEXT_PUBLIC_APP_URL
      : currentLocation) + uri;

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={opengraphUrl}
      // noindex={metaRobotsNoindex}
      // nofollow={metaRobotsNofollow}
      openGraph={{
        type: "website",
        locale: "en_US",
        url: opengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription,
        images: [
          {
            url: opengraphImage?.sourceUrl || postImage,
            width: 1280,
            height: 720,
          },
        ],
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
    />
  );
};

export default Seo;
