import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}
