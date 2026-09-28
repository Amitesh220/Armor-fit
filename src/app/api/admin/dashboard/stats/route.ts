import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
import { Feedback } from "@/models/Feedback";
import { memoryStore } from "@/lib/memoryStore";

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { isMock, client } = await connectToDatabase();

  if (!isMock && client) {
    try {
      const [
        totalEnquiries,
        newEnquiries,
        contactedEnquiries,
        convertedEnquiries,
        totalFeedback,
        newFeedback,
        recentEnquiries,
        recentFeedback,
        ratingsAgg,
      ] = await Promise.all([
        Enquiry.countDocuments(),
        Enquiry.countDocuments({ status: "NEW" }),
        Enquiry.countDocuments({ status: "CONTACTED" }),
        Enquiry.countDocuments({ status: "CONVERTED" }),
        Feedback.countDocuments(),
        Feedback.countDocuments({ status: "NEW" }),
        Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
        Feedback.find().sort({ createdAt: -1 }).limit(5).lean(),
        Feedback.aggregate([
          { $group: { _id: null, avgRating: { $avg: "$rating" } } },
        ]),
      ]);

      const avgRating = ratingsAgg.length > 0 && ratingsAgg[0].avgRating
        ? Number(ratingsAgg[0].avgRating.toFixed(1))
        : 5.0;

      return NextResponse.json({
        success: true,
        stats: {
          enquiries: {
            total: totalEnquiries,
            new: newEnquiries,
            contacted: contactedEnquiries,
            converted: convertedEnquiries,
          },
          feedback: {
            total: totalFeedback,
            new: newFeedback,
            averageRating: avgRating,
          },
          recentEnquiries,
          recentFeedback,
        },
      });
    } catch (err) {
      console.warn("[Admin/Stats] MongoDB query error, falling back to memory store:", err);
    }
  }

  // Fallback store
  const stats = memoryStore.getStats();
  const recentEnquiries = memoryStore.getEnquiries({ page: 1, limit: 5 }).enquiries;
  const recentFeedback = memoryStore.getFeedback({ page: 1, limit: 5 }).feedback;

  return NextResponse.json({
    success: true,
    stats: {
      ...stats,
      recentEnquiries,
      recentFeedback,
    },
  });
}
