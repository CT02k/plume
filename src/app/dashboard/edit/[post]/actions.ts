"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSubmit(formData: FormData) {
  const image = formData.get("image") as string;
  const title = formData.get("title") as string;
  const contentPreview = formData.get("contentPreview") as string;
  const tagsRaw = formData.get("tags") as string;
  const url = formData.get("url") as string;
  const file = formData.get("file") as File | null;

  const existingPost = await prisma.post.findUnique({
    where: { url },
  });

  let content = existingPost?.content ?? "";

  if (file && file.type === "text/markdown") {
    const contentBuffer = await file.arrayBuffer();
    content = Buffer.from(contentBuffer).toString("utf-8");
  }

  const tags = tagsRaw.split(",").map(tag => tag.trim());

  await prisma.post.upsert({
    where: { url },
    update: { image, title, contentPreview, content, tags },
    create: { image, title, contentPreview, content, tags, url },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
