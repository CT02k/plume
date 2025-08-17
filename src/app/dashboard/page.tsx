"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Post from "./components/Post";


interface PostType {
  id: string;
  image: string;
  title: string;
  contentPreview: string;
  tags: string[];
  url: string;
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/posts/${id}/delete`, {
      method: "DELETE",
    });

    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="posts flex flex-wrap gap-4">
        <button className="button-primary w-full" onClick={() => { router.push(`/dashboard/edit/unnamed-post`) }}>Create new</button>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              image={post.image}
              title={post.title}
              content={post.contentPreview}
              tags={post.tags}
              url={post.url}
              onDelete={() => handleDelete(post.id)}
            />
          ))
        ) : (
          "Nothing here... 🦜"
        )}
      </div>
    </div>
  );
}
