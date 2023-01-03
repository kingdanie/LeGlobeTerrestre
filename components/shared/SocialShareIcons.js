import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

export default function SocialShareIcons({ title, url }) {
  return (
    <div className="flex flex-row items-center relative">
      <FacebookShareButton
        // className="w-1/2"
        url={url || process?.browser?.window?.location?.origin}
        quote={title || "Media Site"}
      >
        <FacebookIcon />
      </FacebookShareButton>

      <TwitterShareButton
        // className="w-1/2"
        url={url || process?.browser?.window?.location?.origin}
        title={title || "Media Site"}
      >
        <TwitterIcon />
      </TwitterShareButton>
      <WhatsappShareButton
        // className="w-1/2"
        url={url || process?.browser?.window?.location?.origin}
        title={title || "Media Site"}
        separator=":: "
      >
        <WhatsappIcon />
      </WhatsappShareButton>
    </div>
  );
}
