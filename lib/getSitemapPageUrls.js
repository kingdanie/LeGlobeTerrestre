import axios from "axios";
import { sitemapPerPage, wordpressUrl } from "../utils/variables";

export default async function getSitemapPageUrls({ type, page }) {
  if (type === "category" || type === "tag") {
    const res = await axios.get(
      `https://api.leglobeterrestre.com/wp-json/sitemap/v1/taxonomy?pageNo=${page}&taxonomyType=${type}&perPage=${sitemapPerPage}`
    );
    return (await res?.data) ?? [];
  }
  if (type === "user") {
    const res = await axios.get(
      `https://api.leglobeterrestre.com/wp-json/sitemap/v1/author?pageNo=${page}&perPage=${sitemapPerPage}`
    );
    return (await res?.data) ?? [];
  }
  if (type === "countries") {
    const res = await axios.get(
      `https://api.leglobeterrestre.com/wp-json/sitemap/v1/posts?pageNo=${page}&postType=countries&perPage=${sitemapPerPage}`
    );
    const countriesData =  removeCountryPrefix(res?.data)
    return (countriesData) ?? [];
  }
  const res = await axios.get(
    `https://api.leglobeterrestre.com/wp-json/sitemap/v1/posts?pageNo=${page}&postType=${type}&perPage=${sitemapPerPage}`
  );
  return (await res?.data) ?? [];
}


function removeCountryPrefix(input) {
  let output = [];

  for (let i = 0; i < input.length; i++) {
    let urlWithoutCountry = input[i].url.replace(/^\/country\//, "/");
    output.push({"url": urlWithoutCountry, "post_modified_date": input[i].post_modified_date});
  }

  return output;
}
