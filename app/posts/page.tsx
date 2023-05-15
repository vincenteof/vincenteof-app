import NavLink from "@/components/nav-link";
import { getAllPosts } from "./data";

export default async function Index() {
  const posts = await getAllPosts()
  return (
    <div className="flex h-full flex-col my-4">
      <h2 className="text-xl font-medium">Archive</h2>
      <ul className="mt-4 max-w-2xl">
        {posts.map((post) => (
          <NavLink
            href={`/posts/${post.Slug}`}
            key={post.Slug}
            className="block opacity-60 hover:opacity-100 max-w-2xl"
          >
            <li>
              <div>{post.Name}</div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
