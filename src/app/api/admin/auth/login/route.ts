import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/models/Admin";
import { signAdminToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { memoryStore } from "@/lib/memoryStore";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check MongoDB admin first
    const { isMock, client } = await connectToDatabase();
    let adminUser = null;

    if (!isMock && client) {
      try {
        const found = await Admin.findOne({ email: normalizedEmail }).select("+password");
        if (found) {
          const isMatch = await bcrypt.compare(password, found.password);
          if (isMatch) {
            adminUser = {
              email: found.email,
              name: found.name,
              role: found.role,
            };
            await Admin.findByIdAndUpdate(found._id, { lastLogin: new Date() });
          }
        }
      } catch (err) {
        console.warn("[Auth/Login] Mongo lookup failed, trying fallback:", err);
      }
    }

    // If not found in Mongo, verify with fallback store / environment variables
    if (!adminUser) {
      const memoryCheck = await memoryStore.verifyAdmin(normalizedEmail, password);
      if (memoryCheck.valid && memoryCheck.admin) {
        adminUser = memoryCheck.admin;
      }
    }

    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signAdminToken(adminUser);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      admin: adminUser,
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Auth/Login] Unexpected error:", error.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
