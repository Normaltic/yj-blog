import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";

interface PostFrontmatter {
  title: string;
  date: string;
  summary?: string;
}

export const POST_DIRECTORY_PATH = path.join(process.cwd(), "public/posts");
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
        path: postPath.replace(/.mdx?$/, "")
      };
    })
  );

  return posts;
}

export async function getPost(title: string) {
  const postFileName = POST_PATHS.find((str) => str.includes(title));
  if (!postFileName) return undefined;

  const postFilePath = path.join(POST_DIRECTORY_PATH, postFileName);
  const source = fs.readFileSync(postFilePath);

  const md = await serialize(source, {
    mdxOptions: {
      format: "md",
      remarkPlugins: [
        [
          remarkCodeHike,
          {
            components: { code: "Codeblock" },
            syntaxHighlighting: {
              theme: "github-dark"
            }
          }
        ]
      ],
      recmaPlugins: [
        [
          recmaCodeHike,
          {
            components: { code: "Codeblock" },
            syntaxHighlighting: {
              theme: "github-dark"
            }
          }
        ]
      ]
    },
    parseFrontmatter: true
  });

  return md;
}
