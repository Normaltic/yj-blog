import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import remarkGfm from "remark-gfm";

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
      const md = await serialize<Record<string, unknown>, PostFrontmatter>(
        source,
        {
          parseFrontmatter: true
        }
      );
      return {
        data: md.frontmatter,
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

  const md = await serialize<Record<string, unknown>, PostFrontmatter>(source, {
    mdxOptions: {
      format: "mdx",
      remarkPlugins: [
        [
          remarkCodeHike,
          {
            components: { code: "Codeblock" },
            syntaxHighlighting: {
              theme: "github-dark"
            }
          }
        ],
        [remarkGfm]
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
