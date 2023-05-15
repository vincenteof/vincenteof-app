import { getDatabase } from "@/utils/notion";

const POSTS_DATABASE_ID = "7208456f26144a82a9a814c76f575a5c";

export function getAllPosts() {
  return getDatabase<any>(POSTS_DATABASE_ID);
}
