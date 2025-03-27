import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

interface PostFrontmatter {
  title: string;
  date: string;
  summary?: string;
}

export const POST_DIRECTORY_PATH = path.join(process.cwd(), "posts");
export const POST_PATHS = fs
  .readdirSync(POST_DIRECTORY_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export async function getPosts() {
  const posts = await Promise.all(
    POST_PATHS.map(async (postPath) => {
      const source = fs.readFileSync(path.join(POST_DIRECTORY_PATH, postPath));
      const md = await serialize(source, { parseFrontmatter: true });
      return {
        data: md.frontmatter as unknown as PostFrontmatter,
        path: postPath
      };
    })
  );

  return posts;
}
