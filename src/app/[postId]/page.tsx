import { getPost } from "@/utils/post";
import { notFound } from "next/navigation";
import { lazy } from "react";

const PostViewer = lazy(() => import("../../components/post/PostMDXViewer"));

async function Page({
  params
}: {
  params: Promise<{ postId: string | string[] }>;
}) {
  const { postId } = await params;
  const id = Array.isArray(postId) ? postId[0] : postId;

  const source = await getPost(id);

  if (!source) return notFound();

  const { title, date } = source.frontmatter;

  return (
    <article>
      <h2 className="text-4xl text-center mt-8 mb-4">{title}</h2>
      <p className="text-center mb-12">{date.toString()}</p>
      <PostViewer mdxSource={source} />
    </article>
  );
}

export default Page;
