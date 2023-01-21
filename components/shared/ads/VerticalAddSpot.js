import React, { useEffect } from "react";

export default function VerticalAddSpot() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  // if (!process?.browser?.window) {
  //   return null;
  // }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" ,height: "calc(100vh - 200px)", }}
      data-ad-client="ca-pub-1992640305654571"
      data-full-width-responsive="true"
    />
  );

  // return (
  //   <div className="w-full h-32 flex bg-green-600 text-white justify-center items-center">

  //   </div>
  //   // <></>
  // );
}
