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
    <div className="prose dark:prose-invert [&>*]:linear-transition-colors prose-code:linear-transition-colors prose-strong:linear-transition-colors prose-a:linear-transition-colors prose-li:marker:linear-transition-colors max-w-full prose-h3:text-3xl prose-pre:my-10 prose-blockquote:my-10 prose-blockquote:py-2 prose-blockquote:[&>p]:my-0 prose-img:my-10 prose-blockquote:border-primary prose-li:marker:text-foreground">
      <MDXRemote {...mdxSource} components={COMPONENTS} />
    </div>
  );
}

export default PostMDXViewer;
