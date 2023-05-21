import { getDatabasePage, textDecorationsToString } from "@/utils/notion";
import { NotionBlock } from "@/components/notion";
import { getAllPosts } from "../data";

export default async function Index({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts();
  const postId = posts.find((p) => p.Slug[0][0] === params.slug)?.id;
  if (postId === undefined) {
    return <div>post not found</div>;
  }
  const { item: post, recordMap } = await getDatabasePage<any>(postId);
  return (
    <div className="w-full my-2">
      <article className="prose">
        <h1>{textDecorationsToString(post.Name)}</h1>
        <NotionBlock blockId={postId} recordMap={recordMap} />
      </article>
    </div>
  );
}
