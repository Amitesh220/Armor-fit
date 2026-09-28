import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";
import { memoryStore } from "@/lib/memoryStore";

const ALLOWED_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Strength",
  "General Fitness",
  "CrossFit / Functional Training",
  "Personal Training",
  "Other",
];

const ALLOWED_TRAINING = ["Gym", "CrossFit", "Personal Training", "Not Sure Yet"];
const ALLOWED_CONTACT = ["Phone", "WhatsApp", "Email"];

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
      fullName,
      phone,
      email,
      age,
      fitnessGoal,
      preferredTraining,
      preferredContactMethod,
      message,
    } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Full name is required (minimum 2 characters).";
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      errors.phone = "Valid phone number is required (minimum 8 digits).";
    }

    if (!fitnessGoal || !ALLOWED_GOALS.includes(fitnessGoal)) {
      errors.fitnessGoal = `Please select a valid fitness goal: ${ALLOWED_GOALS.join(", ")}`;
    }

    if (!preferredTraining || !ALLOWED_TRAINING.includes(preferredTraining)) {
      errors.preferredTraining = `Please select a valid training format: ${ALLOWED_TRAINING.join(", ")}`;
    }

    const contactMethod = ALLOWED_CONTACT.includes(preferredContactMethod)
      ? preferredContactMethod
      : "WhatsApp";

    let parsedAge: number | undefined;
    if (age !== undefined && age !== null && age !== "") {
      const numAge = Number(age);
      if (isNaN(numAge) || numAge < 12 || numAge > 99) {
        errors.age = "Age must be between 12 and 99.";
      } else {
        parsedAge = numAge;
      }
    }

    if (email && typeof email === "string" && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 422 }
      );
    }

    const enquiryData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email && typeof email === "string" ? email.trim().toLowerCase() : undefined,
      age: parsedAge,
      fitnessGoal,
      preferredTraining,
      preferredContactMethod: contactMethod as "Phone" | "WhatsApp" | "Email",
      message: message && typeof message === "string" ? message.trim() : undefined,
      status: "NEW" as const,
    };

    // Try MongoDB first
    const { isMock, client } = await connectToDatabase();

    if (!isMock && client) {
      try {
        const created = await Enquiry.create(enquiryData);
        return NextResponse.json(
          {
            success: true,
            message: "Enquiry submitted successfully. The Armor Fit team will contact you shortly.",
            id: created._id,
          },
          { status: 201 }
        );
      } catch (dbErr) {
        console.warn("[API/Enquiry] Mongo save failed, falling back to memoryStore:", dbErr);
      }
    }

    // Fallback store
    const createdMemory = memoryStore.createEnquiry(enquiryData);
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully. The Armor Fit team will contact you shortly.",
        id: createdMemory._id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[API/Enquiry] Server error:", error.message);
    return NextResponse.json(
      { success: false, message: "Unable to process enquiry at this moment. Please try again later." },
      { status: 500 }
    );
  }
}
