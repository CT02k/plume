"use client";

import Image from "next/image";

import { redirect } from "next/navigation";

interface PostProps {
  image: string;
  title: string;
  content: string;
  tags: string[];
  url: string;
  onDelete: () => void;
}

export default function Post({ image, title, content, tags, url, onDelete }: PostProps) {
  return (
    <div className="post-manage">
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
      <div className="actions w-full px-4 mt-5">
        <button className="button-primary w-full" onClick={() => { redirect(`/dashboard/edit/${url}`) }}>
            Edit
        </button>
        <button className="button-primary w-full" onClick={onDelete}>
            Delete
        </button>
      </div>
    </div>
  );
}
