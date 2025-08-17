import prisma from "@/utils/prisma";

import Header from "@/components/Header";

import { notFound } from "next/navigation";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Image from "next/image";

export default async function Post({
  params,
}: {
  params: Promise<{ post: string }>
}){
  const { post: post_url } = await params;

  const post = await prisma.post.findUnique({
    where: {
      url: post_url
    }
  })

  if (!post) notFound()

  return (
    <div className="flex flex-col items-center">
        <Header/>
        <div className="post-card">
            <Image src={post.image} alt={post.title} height={1920} width={1080}/>
            <h1>{post.title}</h1>
            <p>{post.contentPreview}</p>
            <div className="tags">
                {
                    post.tags.map((tag) => (
                        <span className="tag" key={tag}>
                            {tag}
                        </span>
                    ))
                }
            </div>
        </div>
        <div className="text-box flex flex-col text-start text-plume4 max-w-[40rem] my-10">
            <Markdown remarkPlugins={[remarkGfm]}>
            {post.content}
            </Markdown>
        </div>
    </div>
  )
}