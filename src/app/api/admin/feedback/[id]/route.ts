import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Feedback } from "@/models/Feedback";
import { memoryStore } from "@/lib/memoryStore";

const ALLOWED_STATUS = ["NEW", "REVIEWED", "RESOLVED"];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { isMock, client } = await connectToDatabase();

  if (!isMock && client) {
    try {
      const feedback = await Feedback.findById(id).lean();
      if (feedback) {
        return NextResponse.json({ success: true, feedback });
      }
    } catch {
      // Fallback
    }
  }

  const found = memoryStore.getFeedback().feedback.find((f) => f._id === id);
  if (found) {
    return NextResponse.json({ success: true, feedback: found });
  }

  return NextResponse.json({ success: false, message: "Feedback not found" }, { status: 404 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};

  if (body.status !== undefined) {
    if (!ALLOWED_STATUS.includes(body.status)) {
      return NextResponse.json(
        { success: false, message: `Status must be one of: ${ALLOWED_STATUS.join(", ")}` },
        { status: 400 }
      );
    }
    updates.status = body.status;
  }

  if (body.adminNotes !== undefined) {
    updates.adminNotes = String(body.adminNotes);
  }

  const { isMock, client } = await connectToDatabase();

  if (!isMock && client) {
    try {
      const updated = await Feedback.findByIdAndUpdate(id, updates, { new: true }).lean();
      if (updated) {
        return NextResponse.json({ success: true, feedback: updated });
      }
    } catch {
      // Fallback
    }
  }

  const updatedMemory = memoryStore.updateFeedback(id, updates as Parameters<typeof memoryStore.updateFeedback>[1]);
  if (updatedMemory) {
    return NextResponse.json({ success: true, feedback: updatedMemory });
  }

  return NextResponse.json({ success: false, message: "Feedback not found" }, { status: 404 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { isMock, client } = await connectToDatabase();

  if (!isMock && client) {
    try {
      const deleted = await Feedback.findByIdAndDelete(id);
      if (deleted) {
        return NextResponse.json({ success: true, message: "Feedback deleted successfully" });
      }
    } catch {
      // Fallback
    }
  }

  const deletedMemory = memoryStore.deleteFeedback(id);
  if (deletedMemory) {
    return NextResponse.json({ success: true, message: "Feedback deleted successfully" });
  }

  return NextResponse.json({ success: false, message: "Feedback not found" }, { status: 404 });
}
