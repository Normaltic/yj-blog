import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface PostFrontmatter {
  title: string;
  date: string;
  summary?: string;
  [key: string]: unknown;
}

export const POST_DIRECTORY_PATH = path.join(process.cwd(), "public/posts");
export const POST_PATHS = fs
  .readdirSync(POST_DIRECTORY_PATH)
  .filter((path) =>
    (process.env.NODE_ENV === "production"
      ? /(?<!\.draft)\.mdx?$/
      : /\.mdx?$/
    ).test(path)
  );

export async function getPosts() {
  const posts = await Promise.all(
    POST_PATHS.map(async (postPath) => {
      const source = fs.readFileSync(path.join(POST_DIRECTORY_PATH, postPath));
      const { data: frontmatter } = matter(source);
      return {
        data: frontmatter as PostFrontmatter,
        path: postPath.replace(/.mdx?$/, "")
      };
    })
  );

  const sort = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return sort;
}

export async function getPost(title: string) {
  const postFileName = POST_PATHS.find((str) =>
    new RegExp(`^${title}.mdx?$`).test(str)
  );
  if (!postFileName) return undefined;

  const postFilePath = path.join(POST_DIRECTORY_PATH, postFileName);
  const source = fs.readFileSync(postFilePath);

  const { content, data: frontmatter } = matter(source);

  return { content, frontmatter: frontmatter as PostFrontmatter };
}
