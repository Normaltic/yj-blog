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

  return <PostViewer mdxSource={source} />;
}

export default Page;
