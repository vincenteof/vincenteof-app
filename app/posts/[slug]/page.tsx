import { getDatabasePage } from "@/utils/notion";
import { getAllPosts } from "../data";

export default async function Index({
    params,
  }: {
    params: { slug: string };
  }) {
  const posts = await getAllPosts();
  const postId = posts.find((p) => p.Slug === params.slug)?.id;
  if (postId === undefined) {
    return <div>post not found</div>;
  }
  const { item: post, recordMap } = await getDatabasePage<any>(postId);
  return "";
}
