import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Feedback } from "@/models/Feedback";
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
  const type = searchParams.get("type") || "ALL";
  const rating = parseInt(searchParams.get("rating") || "0", 10);
  const search = searchParams.get("search") || "";

  const { isMock, client } = await connectToDatabase();

  if (!isMock && client) {
    try {
      const filter: Record<string, unknown> = {};
      if (status && status !== "ALL") {
        filter.status = status;
      }
      if (type && type !== "ALL") {
        filter.feedbackType = type;
      }
      if (rating > 0) {
        filter.rating = rating;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { memberIdentifier: { $regex: search, $options: "i" } },
          { feedback: { $regex: search, $options: "i" } },
          { contactDetails: { $regex: search, $options: "i" } },
        ];
      }

      const total = await Feedback.countDocuments(filter);
      const feedback = await Feedback.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return NextResponse.json({
        success: true,
        feedback,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1,
      });
    } catch (err) {
      console.warn("[Admin/Feedback] Mongo query error, falling back to memory store:", err);
    }
  }

  // Fallback store
  const result = memoryStore.getFeedback({ status, type, rating, search, page, limit });
  return NextResponse.json({
    success: true,
    ...result,
  });
}
