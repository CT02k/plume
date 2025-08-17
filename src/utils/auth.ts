import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET

interface jwtContent {
  username: string;
  userId: string;
}

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined");
}

const encoder = new TextEncoder();

async function checkLogin(token: string) {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(SECRET_KEY));
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}


export { checkLogin }

export type { jwtContent }
