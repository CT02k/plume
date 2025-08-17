"use server";

import prisma from "./prisma";
import bcrypt from "bcrypt";

const alreadyHaveAdmin = async () => {
  try {
    const admin = await prisma.admin.findFirst();
    return !!admin;
  } catch (err) {
    console.error('Error checking for existing admin:', err);
    return false; // ou `throw err` se preferir propagar o erro
  }
};

async function createAdmin(username: string, password: string) {
  const existingAdmin = await prisma.admin.findUnique({
    where: { username },
  });

  if (existingAdmin) {
    throw new Error("Admin user already exists");
  }

  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const hashed = await bcrypt.hash(password, 10);
  
  const admin = await prisma.admin.create({
    data: { username, password: hashed },
  });
  return admin;
}

function checkEnv() {
  const errors: string[] = [];
  if (!process.env.JWT_SECRET) errors.push("JWT_SECRET is not defined.");
  if (!process.env.DATABASE_URL) errors.push("DATABASE_URL is not defined.");
  return errors;
}

export { alreadyHaveAdmin, createAdmin, checkEnv };