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
    <div className="prose dark:prose-invert max-w-full w-full">
      <MDXRemote {...mdxSource} components={COMPONENTS} />
    </div>
  );
}

export default PostMDXViewer;
