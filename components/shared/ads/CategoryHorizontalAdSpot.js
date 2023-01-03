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
      data-ad-layout-key="-c9-2d+1s-2c+5a"
      data-ad-client="ca-pub-1992640305654571"
      data-ad-slot="4046308567"
    />
  );
}
