"use client";
import {
  MDXRemote,
  MDXRemoteProps,
  MDXRemoteSerializeResult
} from "next-mdx-remote";

import Codeblock from "./Codeblock";

export interface PostMDXViewerProps {
  mdxSource: MDXRemoteSerializeResult;
}

const COMPONENTS: Exclude<MDXRemoteProps["components"], undefined> = {
  Codeblock
};

function PostMDXViewer({ mdxSource }: PostMDXViewerProps) {
  return (
    <div className="prose dark:prose-invert max-w-full prose-h3:text-3xl prose-pre:my-10 prose-blockquote:my-10 prose-blockquote:py-2 prose-blockquote:[&>p]:my-0 prose-img:my-10 prose-blockquote:border-primary">
      <MDXRemote {...mdxSource} components={COMPONENTS} />
    </div>
  );
}

export default PostMDXViewer;
