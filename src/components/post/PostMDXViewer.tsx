import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import rehypeImagePath from "@/utils/rehypeImagePath";

import "./postMDXViewer.css";

export interface PostMDXViewerProps {
  mdxString: string;
}

function mergeClassNames(...args: string[]) {
  return args.join(" ");
}

const OPTIONS: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [
      [rehypeImagePath, { prefix: "/" }],
      [
        rehypePrettyCode,
        {
          theme: "dark-plus",
          keepBackground: false
        }
      ]
    ]
  }
};

function PostMDXViewer({ mdxString }: PostMDXViewerProps) {
  return (
    <div
      className={mergeClassNames(
        "prose dark:prose-invert",
        "max-w-full",
        "prose-figcaption:linear-transition-colors",
        "prose-pre:linear-transition-colors",
        "prose-h3:text-3xl prose-h3:border-b-1 prose-h3:pb-2 prose-h3:mt-16",
        "prose-h4:text-2xl prose-h4:mt-14",
        "prose-h5:text-xl prose-h5:mt-10 prose-h5:font-bold",
        "prose-blockquote:my-10 prose-blockquote:py-2 prose-blockquote:[&>p]:my-0 prose-blockquote:border-primary",
        "prose-img:my-10",
        "prose-li:marker:text-foreground [&_li>p]:mb-0",
        "[&_details]:my-10 [&_details]:px-4 [&_details]:py-2 [&_details]:border-l-4 [&_details]:border-primary [&_details_summary]:text-xl [&_details>*:last-child]:mb-0"
      )}
    >
      <MDXRemote source={mdxString} options={OPTIONS} />
    </div>
  );
}

export default PostMDXViewer;
