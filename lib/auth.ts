import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email?: string;
    };
  } catch {
    return null;
  }
}
