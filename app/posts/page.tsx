import NavLink from "@/components/nav-link";
import { getAllPosts } from "./data";
import { textDecorationsToString } from "@/utils/notion";

export default async function Index() {
  const posts = await getAllPosts();
  return (
    <div className="flex h-full flex-col my-4">
      <h2 className="text-xl font-medium">Archive</h2>
      <ul className="mt-4 max-w-2xl">
        {posts.map((post) => {
          const slug = textDecorationsToString(post.Slug);
          return (
            <NavLink
              key={slug}
              href={`/posts/${slug}`}
              className="block max-w-2xl"
            >
              <li className="flex gap-2 items-center">
                <div className="opacity-80 hover:opacity-100">{textDecorationsToString(post.Name)}</div>
                <div className="opacity-60 text-sm">{post.Date}</div>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}
