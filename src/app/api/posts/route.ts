
import prisma from "@/utils/prisma";

export async function GET(){
  const posts = await prisma.post.findMany().catch(() => {
    return new Response(JSON.stringify({error: true}), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  })

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}