import React, { useEffect } from "react";
// import AdSense from "react-adsense";

export default function CategoryHorizontalAdSpot() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-client="ca-pub-1992640305654571"
    />
  );
}
