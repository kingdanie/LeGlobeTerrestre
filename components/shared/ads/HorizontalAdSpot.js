import React, { useEffect } from "react";
// import AdSense from "react-adsense";

export default function HorizontalAdSpot() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  // if (!process?.browser?.window) {
  //   return null;
  // }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1992640305654571"
      data-ad-slot="8501570655"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );

  // return (
  //   <div className="w-full h-32 flex bg-green-600 text-white justify-center items-center">

  //   </div>
  //   // <></>
  // );
}
