import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "armor_fit_production_jwt_secret_key_minimum_32_characters_random_string";
export const AUTH_COOKIE_NAME = "armor_fit_admin_token";

export interface AdminTokenPayload {
  email: string;
  name: string;
  role: string;
}

export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(req?: NextRequest): Promise<AdminTokenPayload | null> {
  // Check authorization header first
  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const verified = verifyAdminToken(token);
      if (verified) return verified;
    }
  }

  // Check cookies
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (token) {
      return verifyAdminToken(token);
    }
  } catch {
    // Next.js static generation or missing context
  }

  return null;
}
