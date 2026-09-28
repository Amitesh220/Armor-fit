import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
import { memoryStore } from "@/lib/memoryStore";

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));
  const status = searchParams.get("status") || "ALL";
  const search = searchParams.get("search") || "";

  const { isMock, client } = await connectToDatabase();

  if (!isMock && client) {
    try {
      const filter: Record<string, unknown> = {};
      if (status && status !== "ALL") {
        filter.status = status;
      }
      if (search) {
        filter.$or = [
          { fullName: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { fitnessGoal: { $regex: search, $options: "i" } },
        ];
      }

      const total = await Enquiry.countDocuments(filter);
      const enquiries = await Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return NextResponse.json({
        success: true,
        enquiries,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1,
      });
    } catch (err) {
      console.warn("[Admin/Enquiries] Mongo query error, falling back to memory store:", err);
    }
  }

  // Fallback store
  const result = memoryStore.getEnquiries({ status, search, page, limit });
  return NextResponse.json({
    success: true,
    ...result,
  });
}
