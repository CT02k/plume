"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

interface PostProps {
  image: string;
  title: string;
  content: string;
  tags: string[];
  url: string;
}

export default function Post({ image, title, content, tags, url }: PostProps) {
  const router = useRouter();

  return (
    <div className="post" onClick={() => { router.push(`/posts/${url}`)}}>
      <Image src={image} alt={title} width={1920} height={1080} />
      <h2>{title}</h2>
      <p>{content}</p>
      <div className="tags">
        {
          tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))
        }
      </div>
    </div>
  );
}
