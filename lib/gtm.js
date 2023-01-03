export const GTM_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || "GTM-K5DKM59";

export const GADs_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS || "ca-pub-3761208271717821";

export const pageview = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
