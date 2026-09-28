import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
import { memoryStore } from "@/lib/memoryStore";

const ALLOWED_STATUS = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"];

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
      const enquiry = await Enquiry.findById(id).lean();
      if (enquiry) {
        return NextResponse.json({ success: true, enquiry });
      }
    } catch {
      // Fallback
    }
  }

  const found = memoryStore.getEnquiries().enquiries.find((e) => e._id === id);
  if (found) {
    return NextResponse.json({ success: true, enquiry: found });
  }

  return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
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

  if (body.notes !== undefined) {
    updates.notes = String(body.notes);
  }

  const { isMock, client } = await connectToDatabase();

  if (!isMock && client) {
    try {
      const updated = await Enquiry.findByIdAndUpdate(id, updates, { new: true }).lean();
      if (updated) {
        return NextResponse.json({ success: true, enquiry: updated });
      }
    } catch {
      // Fallback
    }
  }

  const updatedMemory = memoryStore.updateEnquiry(id, updates as Parameters<typeof memoryStore.updateEnquiry>[1]);
  if (updatedMemory) {
    return NextResponse.json({ success: true, enquiry: updatedMemory });
  }

  return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
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
      const deleted = await Enquiry.findByIdAndDelete(id);
      if (deleted) {
        return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
      }
    } catch {
      // Fallback
    }
  }

  const deletedMemory = memoryStore.deleteEnquiry(id);
  if (deletedMemory) {
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
  }

  return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
}
