import { Metadata } from "next";
import { lazy } from "react";

import { formatDate } from "@/utils/date";
import { getPost, getPosts } from "@/utils/post";
import NotFound from "../not-found";

const PostViewer = lazy(() => import("../../components/post/PostMDXViewer"));

export async function generateStaticParams() {
  const posts = await getPosts();

  const postParams = posts.map(({ path }) => ({ postId: path }));

  return postParams;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ postId: string | string[] }>;
}): Promise<Metadata | undefined> {
  const { postId } = await params;
  const id = Array.isArray(postId) ? postId[0] : postId;

  const source = await getPost(id);

  if (!source) return undefined;
  const { title, summary } = source.frontmatter;

  return {
    title: title,
    description: summary
  };
}

async function Page({
  params
}: {
  params: Promise<{ postId: string | string[] }>;
}) {
  const { postId } = await params;
  const id = Array.isArray(postId) ? postId[0] : postId;

  const source = await getPost(id);

  /**
   * @TODO Fix to using notFound function.
   * It is rendered NotFound component without theme.
   */
  // if (!source) notFound();
  if (!source) {
    return <NotFound />;
  }

  const { title, date } = source.frontmatter;

  return (
    <article>
      <h2 className="text-4xl text-center mt-8 mb-4">{title}</h2>
      <p className="text-center mb-12">{formatDate(new Date(date))}</p>
      <PostViewer mdxSource={source} />
    </article>
  );
}

export default Page;
