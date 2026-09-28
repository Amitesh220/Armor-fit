import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Feedback } from "@/models/Feedback";
import { memoryStore } from "@/lib/memoryStore";

const ALLOWED_FEEDBACK_TYPES = [
  "Training",
  "Equipment",
  "Cleanliness",
  "Staff",
  "Personal Training",
  "Classes",
  "Environment",
  "Membership Experience",
  "Other",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid payload provided." },
        { status: 400 }
      );
    }

    const {
      name,
      memberIdentifier,
      feedbackType,
      rating,
      feedback,
      contactPermission,
      contactDetails,
    } = body;

    const errors: Record<string, string> = {};

    if (!feedbackType || !ALLOWED_FEEDBACK_TYPES.includes(feedbackType)) {
      errors.feedbackType = `Please select a valid sector: ${ALLOWED_FEEDBACK_TYPES.join(", ")}`;
    }

    const numRating = Number(rating);
    if (!rating || isNaN(numRating) || numRating < 1 || numRating > 5) {
      errors.rating = "Rating must be an integer between 1 and 5.";
    }

    if (!feedback || typeof feedback !== "string" || feedback.trim().length < 5) {
      errors.feedback = "Feedback details must be at least 5 characters.";
    }

    const hasContactPermission = Boolean(contactPermission);
    if (hasContactPermission && (!contactDetails || typeof contactDetails !== "string" || contactDetails.trim() === "")) {
      errors.contactDetails = "Please provide contact details so coaching staff can reach out.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 422 }
      );
    }

    const feedbackData = {
      name: name && typeof name === "string" && name.trim() !== "" ? name.trim() : "Anonymous Member",
      memberIdentifier: memberIdentifier && typeof memberIdentifier === "string" ? memberIdentifier.trim() : undefined,
      feedbackType,
      rating: Math.round(numRating),
      feedback: feedback.trim(),
      contactPermission: hasContactPermission,
      contactDetails: hasContactPermission && contactDetails ? contactDetails.trim() : undefined,
      status: "NEW" as const,
    };

    const { isMock, client } = await connectToDatabase();

    if (!isMock && client) {
      try {
        const created = await Feedback.create(feedbackData);
        return NextResponse.json(
          {
            success: true,
            message: "Thank you for the feedback. Your feedback has been received and will be reviewed by the Armor Fit team.",
            id: created._id,
          },
          { status: 201 }
        );
      } catch (dbErr) {
        console.warn("[API/Feedback] Mongo save failed, falling back to memoryStore:", dbErr);
      }
    }

    const createdMemory = memoryStore.createFeedback(feedbackData);
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for the feedback. Your feedback has been received and will be reviewed by the Armor Fit team.",
        id: createdMemory._id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[API/Feedback] Server error:", error.message);
    return NextResponse.json(
      { success: false, message: "Unable to submit feedback at this moment. Please try again later." },
      { status: 500 }
    );
  }
}
