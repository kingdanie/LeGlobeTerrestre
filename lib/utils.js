import DOMPurify from "dompurify";

export const formatWPPostResponse = (posts) => {
  const postList = [];

  if (posts["nodes"]) {
    posts.nodes.map((post) => {
      const { categories, author, ...otherDetails } = post;

      const {
        avatar: { url },
        name: authorName,
        slug: authorSlug,
      } = author?.node || { avatar: {} };

      const postDetails = {
        ...otherDetails,
        author: {
          authorName,
          authorSlug,
        },
      };
    });
  }
};

export const sanitize = (content) => {
  return process.browser ? DOMPurify.sanitize(content) : content;
};

export const handlePlaceholderImageIfNeeded = (url) => {
  return url || "https://via.placeholder.com/650.webp?text=Holivoo.com";
};

export const removeDashFromTitles = (title) => {
  return title.replace('-', ' ');
}

export const truncateExcerpt = (content) => {
  if (content) {
    const excerpt = sanitize(content).substring(0, 180);
    return excerpt.replace(/(<([^>]+)>)/gi, "");
  }
  return "";
};

const cleanExcerpt = (content) => {
  if (content) {
    content = content.replace(" [&hellip;]", ".");
    content = content.replace(/\&nbsp;/gi, " ");
    return content;
  }
  return "";
};

export function generateRSSFeed(posts) {
  let latestPostDate = "";
  let rssItemsXml = "";

  posts.map((post) => {
    const postDate = Date.parse(post.date);

    const postHref = `${process.env.NEXT_PUBLIC_APP_URL}/${post.slug}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }

    rssItemsXml += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${postHref}</link>
        <pubDate>${post.date}</pubDate>
        <guid isPermaLink="false">${postHref}</guid>
        <description>
        <![CDATA[${cleanExcerpt(post.excerpt.replace(/(<([^>]+)>)/gi, ""))}]]>
        </description>
        <content:encoded>
          <![CDATA[${post.content}]]>
        </content:encoded>
    </item>`;
  });

  return `<?xml version="1.0" ?>
      <rss
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:atom="http://www.w3.org/2005/Atom"
        version="2.0"
      >
        <channel>
            <title><![CDATA[News articles from ${process.env.NEXT_PUBLIC_APP_SITE_TITLE}]]></title>
            <link>${process.env.NEXT_PUBLIC_APP_URL}</link>
            <description>
              <![CDATA[${process.env.NEXT_PUBLIC_APP_SITE_DESCRIPTION}]]>
            </description>
            <language>en</language>
            <lastBuildDate>${latestPostDate}</lastBuildDate>
            ${rssItemsXml}
        </channel>
      </rss>`;
}
