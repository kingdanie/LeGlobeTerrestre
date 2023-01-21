export const GTM_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || "G-KPZP39JE80";

export const GADs_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS || "ca-pub-1992640305654571";

export const pageview = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
