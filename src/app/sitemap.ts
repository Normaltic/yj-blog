import { MetadataRoute } from "next";

import { getPosts } from "@/utils/post";

const DEFAULT_SITEMAP: MetadataRoute.Sitemap = [
  {
    url: "https://blog.yunji.kim",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0
  },
  {
    url: "https://blog.yunji.kim/about",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8
  }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const postSiteMap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://blog.yunji.kim/${post.path}`,
    lastModified: new Date(post.data.date),
    changeFrequency: "daily",
    priority: 0.7
  }));

  return [...DEFAULT_SITEMAP, ...postSiteMap];
}
