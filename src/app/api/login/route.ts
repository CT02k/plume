import prisma from "@/utils/prisma";

import jwt from "jsonwebtoken";

import { jwtContent } from "@/utils/auth";

import bcrypt from "bcrypt"

import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET")

  const body = await request.json();
  const { username, password } = body;

  const user = await prisma.admin.findUnique({
    where: { username }
  });

  if (user) {
    const verifyPassword = await bcrypt.compare(password, user?.password);

    console.log(verifyPassword);

    if (!verifyPassword) return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
    
    const payload: jwtContent = {
      username,
      userId: user.id
    }

    const token = jwt.sign(payload, JWT_SECRET)

    const cookie = await cookies();

    cookie.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    })

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}