// app/api/posts/upsert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file') as File | null;
  const image = formData.get('image') as string;
  const title = formData.get('title') as string;
  const contentPreview = formData.get('contentPreview') as string;
  const tagsRaw = formData.get('tags') as string;
  const url = formData.get('url') as string;

  if (!file || file.type !== 'text/markdown') {
    return NextResponse.json({ error: 'Arquivo .md obrigatório.' }, { status: 400 });
  }

  const contentBuffer = await file.arrayBuffer();
  const content = Buffer.from(contentBuffer).toString('utf-8');

  const tags = tagsRaw.split(',').map(tag => tag.trim());

  console.log(content)

  const post = await prisma.post.upsert({
    where: { url },
    update: {
      image,
      title,
      content,
      contentPreview,
      tags,
    },
    create: {
      image,
      title,
      content,
      contentPreview,
      tags,
      url,
    },
  });

  return NextResponse.json({ success: true, post });
}
