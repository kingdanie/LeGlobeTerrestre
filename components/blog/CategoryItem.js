import React from "react";
import {
  handlePlaceholderImageIfNeeded,
  truncateExcerpt,
} from "../../lib/utils";
import NextLink from "next/link";
import NextImage from "next/image";
export default function CategoryItem({ post = {}, key }) {
  return (
    <div
      key={key}
      className="flex flex-wrap my-4 md:my-0 md:-mx-3 overflow-hidden"
    >
      <div className="my-1 md:my-3 px-3 w-full overflow-hidden xl:w-1/3">
        <NextLink prefetch={false} href={`/${post?.slug || "#"}`}>
          <a className="w-full">
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
          </a>
        </NextLink>
      </div>

      <div className=" my-1 md:my-3 px-3 w-full overflow-hidden xl:w-1/3">
        <div>
          <NextLink prefetch={false} href={`/${post?.slug || "#"}`}>
            <a className="w-full">
              <h5 className="max-h-16 text-xl font-bold transition duration-300 group-hover:text-primary-500 line-clamp-2 hover:text-accent-color">
                {post?.title}
              </h5>
            </a>
          </NextLink>

          <p className="text-sm text-gray-500">
            {post?.author?.node?.name || "Editorial Team"}
          </p>
        </div>
      </div>

      <div className="my-1 md:my-3 px-3 w-full overflow-hidden xl:w-1/3">
        <div
          className="mt-2 line-clamp-3  text-secondary-100 leading-loose text-sm"
          dangerouslySetInnerHTML={{
            __html: truncateExcerpt(post?.excerpt),
          }}
        ></div>
      </div>
    </div>
  );
}
