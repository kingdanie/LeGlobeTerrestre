import React from "react";

import NextLink from "next/link";
import NextImage from "next/image";
import { handlePlaceholderImageIfNeeded } from "../../lib/utils";

export default function BlogSmallItem({ post, hideAuthor = false }) {
  return (
    <div className="w-full mb-4 md:mb-0 flex flex-col md:flex-row md:space-x-4">
      <div className="w-full">
        <div className="aspect-w-16 aspect-h-9">
          <NextImage
            layout="fill"
            objectFit="cover"
            src={handlePlaceholderImageIfNeeded(
              post?.featuredImage?.node?.mediaItemUrl
            )}
            alt={`Cover Image for ${post?.title}`}
          />
        </div>
      </div>
      <div className="w-full">
        <NextLink prefetch={false} href={post?.slug}>
          <a className="w-full">
            <h5 className="font-semibold line-clamp-2 text-xl md:text-base hover:text-accent-color">
              {post?.title}
            </h5>
          </a>
        </NextLink>
        {!hideAuthor && (
          <p className="text-sm text-gray-500">
            {post?.author?.node?.name || "Editorial Team"}
          </p>
        )}
      </div>
    </div>
  );
}
