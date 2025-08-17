"use client";

import { useEffect, useState } from "react";

import Post from "@/components/Post";
import Header from "@/components/Header";

import Config from "@/components/Config";
import { alreadyHaveAdmin } from "@/utils/config";

import { Loader2 } from "lucide-react";

import { Post as PostType } from "@/generated/prisma";


export default function Home() {
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<PostType[]>([])
  const [postsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
  async function loadPosts() {
    try {
      setPostsLoading(true);
      const res = await fetch("/api/posts"); 
      const data = await res.json();
      setPosts(data);       
    } catch (err) {
      console.error(err);
      setPosts([]);            
    } finally {
      setPostsLoading(false);
    }
  }

  loadPosts();
}, []);

  useEffect(() => {
    alreadyHaveAdmin().then((response) => setHasAdmin(response));
  }, []);

  if (hasAdmin === null) return <div className="flex h-screen items-center justify-center text-plume8 animate-spin"><Loader2 size={100}/></div>;

  if (!hasAdmin) return <Config />;
  return (
    <div className="">
      <Header/>
      <div className="posts flex-1">
    {postsLoading ? (
      <Loader2 size={75} className="text-plume8 animate-spin" />
    ) : posts.length > 0 ? (
      posts.map((p) => (
        <Post
          key={p.id}
          image={p.image}
          title={p.title}
          content={p.contentPreview}
          tags={p.tags}
          url={p.url}
        />
      ))
    ) : (
      <p className="text-xl text-plume4">No posts found...</p>
    )}
      </div>
    </div>
  );
}
